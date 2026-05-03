import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Subscription, SubscriptionStatus } from '../entities/subscription.entity';
import { StripeService } from '../stripe/stripe.service';
import type Stripe from 'stripe';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private readonly tenantServiceUrl: string;
  private readonly notificationServiceUrl: string;

  constructor(
    @InjectRepository(Subscription) private subRepo: Repository<Subscription>,
    private readonly stripeService: StripeService,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.tenantServiceUrl = this.config.get('TENANT_SERVICE_URL', 'http://localhost:4002');
    this.notificationServiceUrl = this.config.get('NOTIFICATION_SERVICE_URL', 'http://localhost:4008');
  }

  async createCheckoutSession(tenantSlug: string, plan: string, email: string, companyName: string) {
    const priceId = this.stripeService.priceMap[plan];
    if (!priceId) throw new BadRequestException(`Invalid plan: ${plan}`);

    let sub = await this.subRepo.findOne({ where: { tenantSlug } });

    let customerId: string;
    if (sub) {
      customerId = sub.stripeCustomerId;
    } else {
      const customer = await this.stripeService.createCustomer(email, companyName, tenantSlug);
      customerId = customer.id;
    }

    const session = await this.stripeService.createCheckoutSession(customerId, priceId, tenantSlug);
    return { sessionId: session.id, url: session.url };
  }

  async createPortalSession(tenantSlug: string) {
    const sub = await this.subRepo.findOne({ where: { tenantSlug } });
    if (!sub) throw new NotFoundException('No subscription found');

    const session = await this.stripeService.createPortalSession(sub.stripeCustomerId);
    return { url: session.url };
  }

  async changePlan(tenantSlug: string, newPlan: string) {
    const sub = await this.subRepo.findOne({ where: { tenantSlug } });
    if (!sub) throw new NotFoundException('No subscription found');

    const priceId = this.stripeService.priceMap[newPlan];
    if (!priceId) throw new BadRequestException(`Invalid plan: ${newPlan}`);

    await this.stripeService.changeSubscriptionPlan(sub.stripeSubscriptionId, priceId);
    return { message: `Plan change to ${newPlan} initiated` };
  }

  async cancelSubscription(tenantSlug: string) {
    const sub = await this.subRepo.findOne({ where: { tenantSlug } });
    if (!sub) throw new NotFoundException('No subscription found');

    await this.stripeService.cancelSubscription(sub.stripeSubscriptionId);
    sub.cancelAtPeriodEnd = true;
    await this.subRepo.save(sub);
    return { message: 'Subscription will cancel at end of billing period' };
  }

  async resumeSubscription(tenantSlug: string) {
    const sub = await this.subRepo.findOne({ where: { tenantSlug } });
    if (!sub) throw new NotFoundException('No subscription found');

    await this.stripeService.resumeSubscription(sub.stripeSubscriptionId);
    sub.cancelAtPeriodEnd = false;
    await this.subRepo.save(sub);
    return { message: 'Subscription resumed' };
  }

  async getSubscription(tenantSlug: string) {
    const sub = await this.subRepo.findOne({ where: { tenantSlug } });
    if (!sub) return null;
    return sub;
  }

  // --- Webhook handlers ---

  async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const tenantSlug = session.metadata?.tenantSlug;
    if (!tenantSlug || !session.subscription || !session.customer) return;

    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription : session.subscription.id;
    const customerId = typeof session.customer === 'string'
      ? session.customer : session.customer.id;

    // Stripe subscription details will be filled by subscription.updated event
    let sub = await this.subRepo.findOne({ where: { tenantSlug } });
    if (!sub) {
      sub = this.subRepo.create({
        tenantSlug,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        stripePriceId: '',
        plan: 'pro',
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(),
      });
    } else {
      sub.stripeSubscriptionId = subscriptionId;
      sub.stripeCustomerId = customerId;
    }
    await this.subRepo.save(sub);
  }

  async handleSubscriptionUpdated(stripeSub: Stripe.Subscription) {
    const sub = await this.subRepo.findOne({
      where: { stripeSubscriptionId: stripeSub.id },
    });
    if (!sub) {
      this.logger.warn(`Subscription ${stripeSub.id} not found in DB`);
      return;
    }

    const priceId = stripeSub.items.data[0]?.price?.id || '';
    const plan = this.stripeService.getPlanFromPriceId(priceId) || sub.plan;

    sub.stripePriceId = priceId;
    sub.plan = plan;
    sub.status = stripeSub.status as SubscriptionStatus;
    sub.currentPeriodStart = new Date(stripeSub.current_period_start * 1000);
    sub.currentPeriodEnd = new Date(stripeSub.current_period_end * 1000);
    sub.cancelAtPeriodEnd = stripeSub.cancel_at_period_end;
    sub.canceledAt = stripeSub.canceled_at ? new Date(stripeSub.canceled_at * 1000) : null;

    await this.subRepo.save(sub);

    // Sync plan to tenant service
    await this.syncPlanToTenant(sub.tenantSlug, plan);

    this.logger.log(`Subscription ${stripeSub.id} updated: plan=${plan}, status=${sub.status}`);
  }

  async handleSubscriptionDeleted(stripeSub: Stripe.Subscription) {
    const sub = await this.subRepo.findOne({
      where: { stripeSubscriptionId: stripeSub.id },
    });
    if (!sub) return;

    sub.status = SubscriptionStatus.CANCELED;
    sub.canceledAt = new Date();
    await this.subRepo.save(sub);

    // Downgrade to free plan
    await this.syncPlanToTenant(sub.tenantSlug, 'free');
    this.logger.log(`Subscription ${stripeSub.id} canceled, downgraded to free`);
  }

  async handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    const subscriptionId = typeof invoice.subscription === 'string'
      ? invoice.subscription : invoice.subscription?.id;
    if (!subscriptionId) return;

    const sub = await this.subRepo.findOne({
      where: { stripeSubscriptionId: subscriptionId },
    });
    if (!sub) return;

    sub.status = SubscriptionStatus.PAST_DUE;
    await this.subRepo.save(sub);
    this.logger.warn(`Payment failed for subscription ${subscriptionId}`);
  }

  private async syncPlanToTenant(tenantSlug: string, plan: string) {
    try {
      // tenant-service has no '/api' global prefix — call its route directly.
      await firstValueFrom(
        this.httpService.patch(
          `${this.tenantServiceUrl}/tenants/${tenantSlug}/plan`,
          { plan },
          { headers: { 'content-type': 'application/json' } },
        ),
      );
    } catch (err: any) {
      this.logger.error(`Failed to sync plan for ${tenantSlug}: ${err.message}`);
    }
  }
}
