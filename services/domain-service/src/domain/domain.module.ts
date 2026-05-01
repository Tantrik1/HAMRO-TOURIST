import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { CustomDomain } from '../entities/custom-domain.entity';
import { CloudflareService } from '../cloudflare/cloudflare.service';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { DnsVerificationProcessor } from './dns-verification.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomDomain]),
    BullModule.registerQueue({ name: 'dns-verification' }),
  ],
  providers: [CloudflareService, DomainService, DnsVerificationProcessor],
  controllers: [DomainController],
})
export class DomainModule {}
