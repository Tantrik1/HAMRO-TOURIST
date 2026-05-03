import {
  Injectable, ForbiddenException, NotFoundException, ConflictException, Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RegionEntity } from '../../entities/region.entity';
import { TourEntity } from '../../entities/tour.entity';
import { CreateRegionDto, UpdateRegionDto } from '../../dto/region.dto';

@Injectable()
export class RegionsService {
  private readonly logger = new Logger(RegionsService.name);

  constructor(
    @InjectRepository(RegionEntity)
    private readonly repo: Repository<RegionEntity>,
    @InjectRepository(TourEntity)
    private readonly tourRepo: Repository<TourEntity>,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateRegionDto, tenantSlug: string): Promise<RegionEntity> {
    const existing = await this.repo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException(`Region slug "${dto.slug}" already exists`);

    await this.enforcePlanLimit(dto.countryId, tenantSlug);

    const region = this.repo.create(dto);
    return this.repo.save(region);
  }

  async findAll(page: number = 1, limit: number = 20): Promise<{ data: RegionEntity[]; total: number }> {
    // ✅ Bounds checking for pagination
    page = Math.max(1, page);
    limit = Math.min(Math.max(1, limit), 100);

    const [data, total] = await this.repo.findAndCount({
      order: { name: 'ASC' },
      relations: ['country'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findByCountry(countryId: string, page: number = 1, limit: number = 20): Promise<{ data: RegionEntity[]; total: number }> {
    // ✅ Bounds checking for pagination
    page = Math.max(1, page);
    limit = Math.min(Math.max(1, limit), 100);

    const [data, total] = await this.repo.findAndCount({
      where: { countryId },
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<RegionEntity> {
    // ✅ FIXED: Don't load all relations - only load country
    const region = await this.repo.findOne({
      where: { id },
      relations: ['country'],  // Removed tours, treks, activities
    });
    if (!region) throw new NotFoundException(`Region ${id} not found`);
    return region;
  }

  // ✅ NEW: Separate method to get region with paginated tours
  async findOneWithTours(id: string, page: number = 1, limit: number = 20): Promise<{ region: RegionEntity; tours: TourEntity[]; total: number }> {
    const region = await this.findOne(id);

    // ✅ FIXED: Load tours separately with pagination - prevents N+1 query
    const [tours, total] = await this.tourRepo.findAndCount({
      where: { regionId: id, status: 'published' },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { region, tours, total };
  }

  async findBySlug(slug: string): Promise<RegionEntity> {
    // ✅ FIXED: Don't load all relations - only load country
    const region = await this.repo.findOne({
      where: { slug },
      relations: ['country'],  // Removed tours, treks, activities
    });
    if (!region) throw new NotFoundException(`Region "${slug}" not found`);
    return region;
  }

  async update(id: string, dto: UpdateRegionDto): Promise<RegionEntity> {
    const region = await this.findOne(id);
    Object.assign(region, dto);
    return this.repo.save(region);
  }

  async remove(id: string): Promise<void> {
    const region = await this.findOne(id);
    await this.repo.remove(region);
  }

  private async enforcePlanLimit(countryId: string, tenantSlug: string): Promise<void> {
    const currentCount = await this.repo.count({ where: { countryId } });
    const tenantServiceUrl = `http://localhost:${this.config.get('TENANT_SERVICE_PORT', 4002)}`;

    try {
      const resp = await firstValueFrom(
        this.httpService.get(`${tenantServiceUrl}/tenants/${tenantSlug}/limits`),
      );
      const limits = resp.data?.data;
      if (limits && currentCount >= limits.maxRegionsPerCountry) {
        throw new ForbiddenException({
          code: 'PLAN_LIMIT_EXCEEDED',
          message: `Your plan allows ${limits.maxRegionsPerCountry} regions per country. Upgrade to add more.`,
          upgradeUrl: 'https://hamrotourist.com/pricing',
        });
      }
    } catch (err: any) {
      if (err instanceof ForbiddenException) throw err;
      this.logger.warn(`Could not fetch plan limits: ${err.message}`);
    }
  }
}
