import {
  Injectable, ForbiddenException, NotFoundException, ConflictException, Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RegionEntity } from '../../entities/region.entity';
import { CreateRegionDto, UpdateRegionDto } from '../../dto/region.dto';

@Injectable()
export class RegionsService {
  private readonly logger = new Logger(RegionsService.name);

  constructor(
    @InjectRepository(RegionEntity)
    private readonly repo: Repository<RegionEntity>,
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

  async findAll(): Promise<RegionEntity[]> {
    return this.repo.find({ order: { name: 'ASC' }, relations: ['country'] });
  }

  async findByCountry(countryId: string): Promise<RegionEntity[]> {
    return this.repo.find({ where: { countryId }, order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<RegionEntity> {
    const region = await this.repo.findOne({
      where: { id },
      relations: ['country', 'tours', 'treks', 'activities'],
    });
    if (!region) throw new NotFoundException(`Region ${id} not found`);
    return region;
  }

  async findBySlug(slug: string): Promise<RegionEntity> {
    const region = await this.repo.findOne({
      where: { slug },
      relations: ['country', 'tours', 'treks', 'activities'],
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
