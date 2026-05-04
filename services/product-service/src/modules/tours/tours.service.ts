import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourEntity } from '../../entities/tour.entity';
import { TourActivityEntity } from '../../entities/tour-activity.entity';
import { CreateTourDto, UpdateTourDto } from '../../dto/tour.dto';
import { LinkActivityDto } from '../../dto/activity-link.dto';
import { PolymorphicRelationsService } from '../../common/polymorphic-relations.service';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(TourEntity) private readonly repo: Repository<TourEntity>,
    @InjectRepository(TourActivityEntity) private readonly linkRepo: Repository<TourActivityEntity>,
    private readonly relations: PolymorphicRelationsService,
  ) {}

  async create(dto: CreateTourDto): Promise<TourEntity> {
    const { faqs, groupDiscounts, ...rest } = dto;
    const saved = await this.repo.save(this.repo.create(rest));
    await this.relations.saveFaqs('tour', saved.id, faqs);
    await this.relations.saveGroupDiscounts('tour', saved.id, groupDiscounts);
    return this.findOne(saved.id);
  }

  async findAll(regionId?: string, page: number = 1, limit: number = 20): Promise<{ data: TourEntity[]; total: number }> {
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

  async findPublished(regionId?: string, page: number = 1, limit: number = 20): Promise<{ data: TourEntity[]; total: number }> {
    // ✅ Bounds checking for pagination
    page = Math.max(1, page);
    limit = Math.min(Math.max(1, limit), 100);

    const where: any = { status: 'published' };
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

  async findOne(id: string): Promise<TourEntity> {
    const tour = await this.repo.findOne({
      where: { id }, relations: ['region', 'tourActivities', 'tourActivities.activity'],
    });
    if (!tour) throw new NotFoundException(`Tour ${id} not found`);
    tour.faqs = await this.relations.loadFaqs('tour', tour.id);
    tour.groupDiscounts = await this.relations.loadGroupDiscounts('tour', tour.id);
    return tour;
  }

  async findBySlug(slug: string): Promise<TourEntity> {
    const tour = await this.repo.findOne({
      where: { slug }, relations: ['region', 'tourActivities', 'tourActivities.activity'],
    });
    if (!tour) throw new NotFoundException(`Tour "${slug}" not found`);
    tour.faqs = await this.relations.loadFaqs('tour', tour.id);
    tour.groupDiscounts = await this.relations.loadGroupDiscounts('tour', tour.id);
    return tour;
  }

  async update(id: string, dto: UpdateTourDto): Promise<TourEntity> {
    const tour = await this.findOne(id);
    const { faqs, groupDiscounts, ...rest } = dto;
    Object.assign(tour, rest);
    await this.repo.save(tour);
    await this.relations.saveFaqs('tour', id, faqs);
    await this.relations.saveGroupDiscounts('tour', id, groupDiscounts);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.relations.deleteAllForEntity('tour', id);
    await this.repo.softDelete(id);
  }

  async linkActivity(tourId: string, dto: LinkActivityDto): Promise<TourActivityEntity> {
    await this.findOne(tourId);
    return this.linkRepo.save(this.linkRepo.create({
      tourId, activityId: dto.activityId,
      inclusionType: dto.inclusionType, extraPrice: dto.extraPrice || 0,
    }));
  }

  async unlinkActivity(tourId: string, activityId: string): Promise<void> {
    await this.linkRepo.delete({ tourId, activityId });
  }
}
