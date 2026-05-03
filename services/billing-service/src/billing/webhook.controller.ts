import { Controller, Post, Req, Headers, HttpCode, Logger, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from '../stripe/stripe.service';
import { BillingService } from './billing.service';
import type Stripe from 'stripe';

@Controller('billing/webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly billingService: BillingService,
  ) {}

  @Post()
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event;
    try {
      event = this.stripeService.constructWebhookEvent(req.body as Buffer, signature);
    } catch (err: any) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new BadRequestException('Invalid webhook signature');
    }

    this.logger.log(`Webhook received: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        await this.billingService.handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case 'customer.subscription.updated':
        await this.billingService.handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case 'customer.subscription.deleted':
        await this.billingService.handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      case 'invoice.payment_failed':
        await this.billingService.handleInvoicePaymentFailed(
          event.data.object as Stripe.Invoice,
        );
        break;
      default:
        this.logger.debug(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  }
}
