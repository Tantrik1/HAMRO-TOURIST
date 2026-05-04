import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrekEntity } from '../../entities/trek.entity';
import { TrekActivityEntity } from '../../entities/trek-activity.entity';
import { CreateTrekDto, UpdateTrekDto } from '../../dto/trek.dto';
import { LinkActivityDto } from '../../dto/activity-link.dto';
import { PolymorphicRelationsService } from '../../common/polymorphic-relations.service';

@Injectable()
export class TreksService {
  constructor(
    @InjectRepository(TrekEntity) private readonly repo: Repository<TrekEntity>,
    @InjectRepository(TrekActivityEntity) private readonly linkRepo: Repository<TrekActivityEntity>,
    private readonly relations: PolymorphicRelationsService,
  ) {}

  async create(dto: CreateTrekDto): Promise<TrekEntity> {
    const { faqs, groupDiscounts, ...rest } = dto;
    const saved = await this.repo.save(this.repo.create(rest));
    await this.relations.saveFaqs('trek', saved.id, faqs);
    await this.relations.saveGroupDiscounts('trek', saved.id, groupDiscounts);
    return this.findOne(saved.id);
  }

  async findAll(regionId?: string): Promise<TrekEntity[]> {
    const where: any = {};
    if (regionId) where.regionId = regionId;
    return this.repo.find({ where, order: { createdAt: 'DESC' }, relations: ['region'] });
  }

  async findPublished(regionId?: string): Promise<TrekEntity[]> {
    const where: any = { status: 'published' };
    if (regionId) where.regionId = regionId;
    return this.repo.find({ where, order: { createdAt: 'DESC' }, relations: ['region'] });
  }

  async findOne(id: string): Promise<TrekEntity> {
    const trek = await this.repo.findOne({
      where: { id }, relations: ['region', 'trekActivities', 'trekActivities.activity'],
    });
    if (!trek) throw new NotFoundException(`Trek ${id} not found`);
    trek.faqs = await this.relations.loadFaqs('trek', trek.id);
    trek.groupDiscounts = await this.relations.loadGroupDiscounts('trek', trek.id);
    return trek;
  }

  async findBySlug(slug: string): Promise<TrekEntity> {
    const trek = await this.repo.findOne({
      where: { slug }, relations: ['region', 'trekActivities', 'trekActivities.activity'],
    });
    if (!trek) throw new NotFoundException(`Trek "${slug}" not found`);
    trek.faqs = await this.relations.loadFaqs('trek', trek.id);
    trek.groupDiscounts = await this.relations.loadGroupDiscounts('trek', trek.id);
    return trek;
  }

  async update(id: string, dto: UpdateTrekDto): Promise<TrekEntity> {
    const trek = await this.findOne(id);
    const { faqs, groupDiscounts, ...rest } = dto;
    Object.assign(trek, rest);
    await this.repo.save(trek);
    await this.relations.saveFaqs('trek', id, faqs);
    await this.relations.saveGroupDiscounts('trek', id, groupDiscounts);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.relations.deleteAllForEntity('trek', id);
    await this.repo.softDelete(id);
  }

  async linkActivity(trekId: string, dto: LinkActivityDto): Promise<TrekActivityEntity> {
    await this.findOne(trekId);
    return this.linkRepo.save(this.linkRepo.create({
      trekId, activityId: dto.activityId,
      inclusionType: dto.inclusionType, extraPrice: dto.extraPrice || 0,
    }));
  }

  async unlinkActivity(trekId: string, activityId: string): Promise<void> {
    await this.linkRepo.delete({ trekId, activityId });
  }
}
