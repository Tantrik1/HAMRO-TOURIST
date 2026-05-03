import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUES } from '@hamrotourist/shared-types';
import { EmailService } from './email.service';
import type { EmailJobData } from './email-job.interface';

@Processor(QUEUES.EMAIL)
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job<EmailJobData>): Promise<void> {
    const { type, to, payload } = job.data;
    this.logger.log(`Processing ${type} email job ${job.id} for ${to}`);
    await this.emailService.send(type, to, payload);
  }
}
