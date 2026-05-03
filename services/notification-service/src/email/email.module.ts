import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from '@hamrotourist/shared-types';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { EmailController } from './email.controller';

@Module({
  imports: [
    BullModule.registerQueue({ name: QUEUES.EMAIL }),
  ],
  providers: [EmailService, EmailProcessor],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
