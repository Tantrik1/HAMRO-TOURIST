import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityEntity } from '../../entities/activity.entity';
import { CreateActivityDto, UpdateActivityDto } from '../../dto/activity.dto';
import { PolymorphicRelationsService } from '../../common/polymorphic-relations.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivityEntity) private readonly repo: Repository<ActivityEntity>,
    private readonly relations: PolymorphicRelationsService,
  ) {}

  async create(dto: CreateActivityDto): Promise<ActivityEntity> {
    const { faqs, groupDiscounts, ...rest } = dto;
    const saved = await this.repo.save(this.repo.create(rest));
    await this.relations.saveFaqs('activity', saved.id, faqs);
    await this.relations.saveGroupDiscounts('activity', saved.id, groupDiscounts);
    return this.findOne(saved.id);
  }

  async findAll(regionId?: string, page: number = 1, limit: number = 20): Promise<{ data: ActivityEntity[]; total: number }> {
    // ✅ Bounds checking for pagination
    page = Math.max(1, page);
    limit = Math.min(Math.max(1, limit), 100);

    const where: any = {};
    if (regionId) where.regionId = regionId;

    const [data, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      relations: ['region'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findPublished(regionId?: string, page: number = 1, limit: number = 20): Promise<{ data: ActivityEntity[]; total: number }> {
    // ✅ Bounds checking for pagination
    page = Math.max(1, page);
    limit = Math.min(Math.max(1, limit), 100);

    const where: any = { status: 'published' };
    if (regionId) where.regionId = regionId;

    const [data, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<ActivityEntity> {
    const act = await this.repo.findOne({ where: { id }, relations: ['region'] });
    if (!act) throw new NotFoundException(`Activity ${id} not found`);
    act.faqs = await this.relations.loadFaqs('activity', act.id);
    act.groupDiscounts = await this.relations.loadGroupDiscounts('activity', act.id);
    return act;
  }

  async findBySlug(slug: string): Promise<ActivityEntity> {
    const act = await this.repo.findOne({ where: { slug }, relations: ['region'] });
    if (!act) throw new NotFoundException(`Activity "${slug}" not found`);
    act.faqs = await this.relations.loadFaqs('activity', act.id);
    act.groupDiscounts = await this.relations.loadGroupDiscounts('activity', act.id);
    return act;
  }

  async update(id: string, dto: UpdateActivityDto): Promise<ActivityEntity> {
    const act = await this.findOne(id);
    const { faqs, groupDiscounts, ...rest } = dto;
    Object.assign(act, rest);
    await this.repo.save(act);
    await this.relations.saveFaqs('activity', id, faqs);
    await this.relations.saveGroupDiscounts('activity', id, groupDiscounts);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.relations.deleteAllForEntity('activity', id);
    await this.repo.softDelete(id);
  }
}
