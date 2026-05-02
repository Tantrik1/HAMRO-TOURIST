import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DomainService } from './domain.service';
import { VerificationStatus } from '../entities/custom-domain.entity';

@Processor('dns-verification')
export class DnsVerificationProcessor extends WorkerHost {
  private readonly logger = new Logger(DnsVerificationProcessor.name);

  constructor(private domainService: DomainService) {
    super();
  }

  async process(job: Job<{ domainId: string; attempt: number }>): Promise<void> {
    const { domainId, attempt } = job.data;
    this.logger.log(`Checking DNS for domain ${domainId}, attempt ${attempt}`);

    const domain = await this.domainService.checkVerification(domainId);

    if (domain.verificationStatus === VerificationStatus.ACTIVE) {
      this.logger.log(`Domain ${domain.domain} is now active!`);
      return;
    }

    if (domain.verificationStatus === VerificationStatus.FAILED) {
      this.logger.warn(`Domain ${domain.domain} verification failed`);
      return;
    }

    // Re-queue with backoff if still verifying (max 20 attempts)
    if (attempt < 20) {
      const delay = Math.min(30_000 * Math.pow(1.5, attempt), 600_000); // max 10 min
      await (job as any).queue.add('check', { domainId, attempt: attempt + 1 }, { delay });
    } else {
      this.logger.warn(`Domain ${domain.domain} max attempts reached`);
    }
  }
}
