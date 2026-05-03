import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUES } from '@hamrotourist/shared-types';
import { SendEmailDto } from './send-email.dto';

function ok<T>(data: T) {
  return { success: true, data };
}

@Controller('notifications/email')
export class EmailController {
  constructor(@InjectQueue(QUEUES.EMAIL) private emailQueue: Queue) {}

  @Post('send')
  @HttpCode(202)
  async sendEmail(@Body() dto: SendEmailDto) {
    const job = await this.emailQueue.add(dto.type, {
      type: dto.type,
      to: dto.to,
      payload: dto.payload,
    });
    return ok({ jobId: job.id });
  }
}
