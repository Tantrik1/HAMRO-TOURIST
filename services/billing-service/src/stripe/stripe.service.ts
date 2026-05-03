import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  readonly priceMap: Record<string, string>;

  constructor(private config: ConfigService) {
    this.stripe = new Stripe(this.config.getOrThrow('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-02-24.acacia',
    });

    this.priceMap = {
      pro: this.config.getOrThrow('STRIPE_PRO_PRICE_ID'),
      business: this.config.getOrThrow('STRIPE_BUSINESS_PRICE_ID'),
      enterprise: this.config.getOrThrow('STRIPE_ENTERPRISE_PRICE_ID'),
    };
  }

  async createCustomer(email: string, name: string, tenantSlug: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({
      email,
      name,
      metadata: { tenantSlug },
    });
  }

  async createCheckoutSession(
    customerId: string,
    priceId: string,
    tenantSlug: string,
  ): Promise<Stripe.Checkout.Session> {
    const frontendUrl = this.config.get('FRONTEND_URL', 'http://localhost:3000');
    return this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${frontendUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/billing/cancel`,
      metadata: { tenantSlug },
    });
  }

  async createPortalSession(customerId: string): Promise<Stripe.BillingPortal.Session> {
    const frontendUrl = this.config.get('FRONTEND_URL', 'http://localhost:3000');
    return this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${frontendUrl}/settings/billing`,
    });
  }

  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }

  async resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
  }

  async changeSubscriptionPlan(subscriptionId: string, newPriceId: string): Promise<Stripe.Subscription> {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    return this.stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId,
      }],
      proration_behavior: 'create_prorations',
    });
  }

  constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
    const secret = this.config.getOrThrow('STRIPE_WEBHOOK_SECRET');
    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }

  getPlanFromPriceId(priceId: string): string | null {
    for (const [plan, pid] of Object.entries(this.priceMap)) {
      if (pid === priceId) return plan;
    }
    return null;
  }
}
