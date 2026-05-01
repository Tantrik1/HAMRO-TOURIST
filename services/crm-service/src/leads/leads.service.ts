import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead, LeadStatus } from '../entities/lead.entity';
import { CreateLeadDto, UpdateLeadDto, UpdateLeadStatusDto } from '../dto/lead.dto';

@Injectable()
export class LeadsService {
  constructor(@InjectRepository(Lead) private repo: Repository<Lead>) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(status?: string, contactId?: string, page = 1, limit = 20) {
    const qb = this.repo.createQueryBuilder('lead')
      .leftJoinAndSelect('lead.contact', 'contact')
      .orderBy('lead.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (status) qb.andWhere('lead.status = :status', { status });
    if (contactId) qb.andWhere('lead.contactId = :contactId', { contactId });

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.repo.findOne({ where: { id }, relations: ['contact'] });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async update(id: string, dto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.findOne(id);
    Object.assign(lead, dto);
    return this.repo.save(lead);
  }

  async updateStatus(id: string, dto: UpdateLeadStatusDto): Promise<Lead> {
    const lead = await this.findOne(id);

    if (dto.status === LeadStatus.LOST && !dto.lostReason) {
      throw new BadRequestException('lostReason is required when marking as lost');
    }

    lead.status = dto.status;
    if (dto.status === LeadStatus.WON) lead.wonAt = new Date();
    if (dto.status === LeadStatus.LOST) {
      lead.lostAt = new Date();
      lead.lostReason = dto.lostReason || null;
    }

    return this.repo.save(lead);
  }

  async remove(id: string): Promise<void> {
    const lead = await this.findOne(id);
    await this.repo.softRemove(lead);
  }

  async getPipelineSummary() {
    const results = await this.repo
      .createQueryBuilder('lead')
      .select('lead.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(lead.value), 0)', 'totalValue')
      .groupBy('lead.status')
      .getRawMany();

    const counts: Record<string, number> = {};
    const values: Record<string, number> = {};
    for (const r of results) {
      counts[r.status] = Number(r.count);
      values[r.status] = Number(r.totalValue);
    }
    return { counts, values };
  }
}
