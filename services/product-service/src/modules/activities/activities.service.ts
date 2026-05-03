import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityEntity } from '../../entities/activity.entity';
import { CreateActivityDto, UpdateActivityDto } from '../../dto/activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivityEntity) private readonly repo: Repository<ActivityEntity>,
  ) {}

  async create(dto: CreateActivityDto): Promise<ActivityEntity> {
    return this.repo.save(this.repo.create(dto));
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
    return act;
  }

  async findBySlug(slug: string): Promise<ActivityEntity> {
    const act = await this.repo.findOne({ where: { slug }, relations: ['region'] });
    if (!act) throw new NotFoundException(`Activity "${slug}" not found`);
    return act;
  }

  async update(id: string, dto: UpdateActivityDto): Promise<ActivityEntity> {
    const act = await this.findOne(id);
    Object.assign(act, dto);
    return this.repo.save(act);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
