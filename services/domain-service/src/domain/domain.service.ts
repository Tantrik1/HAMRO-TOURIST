import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CustomDomain, VerificationStatus } from '../entities/custom-domain.entity';
import { CloudflareService } from '../cloudflare/cloudflare.service';
import { CreateDomainDto } from '../dto/create-domain.dto';

@Injectable()
export class DomainService {
  private readonly logger = new Logger(DomainService.name);

  constructor(
    @InjectRepository(CustomDomain) private domainRepo: Repository<CustomDomain>,
    @InjectQueue('dns-verification') private dnsQueue: Queue,
    private cf: CloudflareService,
  ) {}

  async submitDomain(dto: CreateDomainDto): Promise<CustomDomain> {
    const existing = await this.domainRepo.findOne({ where: { domain: dto.domain } });
    if (existing) throw new ConflictException('Domain already registered');

    const domain = this.domainRepo.create({
      tenantSlug: dto.tenantSlug,
      domain: dto.domain,
      verificationStatus: VerificationStatus.PENDING,
    });

    const cfResult = await this.cf.createCustomHostname(dto.domain);
    if (cfResult) {
      domain.cloudflareHostnameId = cfResult.id;
      domain.verificationStatus = VerificationStatus.VERIFYING;
      domain.cnameTarget = cfResult.ownership_verification?.value || `${dto.domain}.cdn.cloudflare.net`;
      domain.sslStatus = cfResult.ssl?.status || 'pending';
    }

    const saved = await this.domainRepo.save(domain);

    // Queue verification check
    await this.dnsQueue.add('check', { domainId: saved.id, attempt: 0 }, { delay: 30_000 });
    return saved;
  }

  async checkVerification(domainId: string): Promise<CustomDomain> {
    const domain = await this.domainRepo.findOne({ where: { id: domainId } });
    if (!domain) throw new NotFoundException('Domain not found');
    if (!domain.cloudflareHostnameId) return domain;

    const cfStatus = await this.cf.getCustomHostname(domain.cloudflareHostnameId);
    domain.lastCheckedAt = new Date();

    if (cfStatus) {
      domain.sslStatus = cfStatus.ssl?.status || null;
      if (cfStatus.ssl?.status === 'active' && cfStatus.status === 'active') {
        domain.verificationStatus = VerificationStatus.ACTIVE;
      } else if (cfStatus.status === 'pending' || cfStatus.ssl?.status === 'pending_validation') {
        domain.verificationStatus = VerificationStatus.VERIFYING;
      }
    } else {
      domain.verificationStatus = VerificationStatus.FAILED;
      domain.failureReason = 'Could not retrieve status from Cloudflare';
    }

    return this.domainRepo.save(domain);
  }

  async getDomain(id: string): Promise<CustomDomain> {
    const domain = await this.domainRepo.findOne({ where: { id } });
    if (!domain) throw new NotFoundException('Domain not found');
    return domain;
  }

  async getDomainsByTenant(tenantSlug: string): Promise<CustomDomain[]> {
    return this.domainRepo.find({ where: { tenantSlug }, order: { createdAt: 'DESC' } });
  }

  async deleteDomain(id: string): Promise<void> {
    const domain = await this.getDomain(id);
    if (domain.cloudflareHostnameId) {
      await this.cf.deleteCustomHostname(domain.cloudflareHostnameId);
    }
    await this.domainRepo.remove(domain);
  }
}
