import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourEntity } from '../../entities/tour.entity';
import { TourActivityEntity } from '../../entities/tour-activity.entity';
import { CreateTourDto, UpdateTourDto } from '../../dto/tour.dto';
import { LinkActivityDto } from '../../dto/activity-link.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(TourEntity) private readonly repo: Repository<TourEntity>,
    @InjectRepository(TourActivityEntity) private readonly linkRepo: Repository<TourActivityEntity>,
  ) {}

  async create(dto: CreateTourDto): Promise<TourEntity> {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(regionId?: string): Promise<TourEntity[]> {
    const where: any = {};
    if (regionId) where.regionId = regionId;
    return this.repo.find({ where, order: { createdAt: 'DESC' }, relations: ['region'] });
  }

  async findPublished(regionId?: string): Promise<TourEntity[]> {
    const where: any = { status: 'published' };
    if (regionId) where.regionId = regionId;
    return this.repo.find({ where, order: { createdAt: 'DESC' }, relations: ['region'] });
  }

  async findOne(id: string): Promise<TourEntity> {
    const tour = await this.repo.findOne({
      where: { id }, relations: ['region', 'tourActivities', 'tourActivities.activity'],
    });
    if (!tour) throw new NotFoundException(`Tour ${id} not found`);
    return tour;
  }

  async findBySlug(slug: string): Promise<TourEntity> {
    const tour = await this.repo.findOne({
      where: { slug }, relations: ['region', 'tourActivities', 'tourActivities.activity'],
    });
    if (!tour) throw new NotFoundException(`Tour "${slug}" not found`);
    return tour;
  }

  async update(id: string, dto: UpdateTourDto): Promise<TourEntity> {
    const tour = await this.findOne(id);
    Object.assign(tour, dto);
    return this.repo.save(tour);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
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
