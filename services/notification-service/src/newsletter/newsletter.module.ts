import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from '@hamrotourist/shared-types';
import { NewsletterSubscriber } from './newsletter-subscriber.entity';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsletterSubscriber]),
    BullModule.registerQueue({ name: QUEUES.EMAIL }),
  ],
  providers: [NewsletterService],
  controllers: [NewsletterController],
  exports: [NewsletterService],
})
export class NewsletterModule {}
