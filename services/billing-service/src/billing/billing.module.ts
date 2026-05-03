import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Subscription } from '../entities/subscription.entity';
import { StripeModule } from '../stripe/stripe.module';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    StripeModule,
    HttpModule,
  ],
  providers: [BillingService],
  controllers: [BillingController, WebhookController],
  exports: [BillingService],
})
export class BillingModule {}
