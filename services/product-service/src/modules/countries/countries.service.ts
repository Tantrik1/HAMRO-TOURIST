import {
  Injectable, ForbiddenException, NotFoundException, ConflictException, Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CountryEntity } from '../../entities/country.entity';
import { CreateCountryDto, UpdateCountryDto } from '../../dto/country.dto';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    @InjectRepository(CountryEntity)
    private readonly repo: Repository<CountryEntity>,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Creates a country. Enforces plan limits before insertion.
   * @throws ForbiddenException if tenant has reached country limit
   */
  async create(dto: CreateCountryDto, tenantSlug: string): Promise<CountryEntity> {
    const existing = await this.repo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException(`Country slug "${dto.slug}" already exists`);

    await this.enforcePlanLimit(tenantSlug);

    const country = this.repo.create(dto);
    return this.repo.save(country);
  }

  async findAll(): Promise<CountryEntity[]> {
    return this.repo.find({ order: { name: 'ASC' }, relations: ['regions'] });
  }

  async findOne(id: string): Promise<CountryEntity> {
    const country = await this.repo.findOne({ where: { id }, relations: ['regions'] });
    if (!country) throw new NotFoundException(`Country ${id} not found`);
    return country;
  }

  async findBySlug(slug: string): Promise<CountryEntity> {
    const country = await this.repo.findOne({ where: { slug }, relations: ['regions'] });
    if (!country) throw new NotFoundException(`Country "${slug}" not found`);
    return country;
  }

  async update(id: string, dto: UpdateCountryDto): Promise<CountryEntity> {
    const country = await this.findOne(id);
    Object.assign(country, dto);
    return this.repo.save(country);
  }

  async remove(id: string): Promise<void> {
    const country = await this.findOne(id);
    await this.repo.remove(country);
  }

  private async enforcePlanLimit(tenantSlug: string): Promise<void> {
    const currentCount = await this.repo.count();
    const tenantServiceUrl = this.config.get<string>(
      'TENANT_SERVICE_URL',
      `http://localhost:${this.config.get('TENANT_SERVICE_PORT', 4002)}`,
    );

    try {
      const resp = await firstValueFrom(
        this.httpService.get(`${tenantServiceUrl}/tenants/${tenantSlug}/limits`),
      );
      const limits = resp.data?.data;
      if (limits && currentCount >= limits.maxCountries) {
        throw new ForbiddenException({
          code: 'PLAN_LIMIT_EXCEEDED',
          message: `Your plan allows ${limits.maxCountries} countries. Upgrade to add more.`,
          upgradeUrl: 'https://hamrotourist.com/pricing',
        });
      }
    } catch (err: any) {
      if (err instanceof ForbiddenException) throw err;
      this.logger.warn(`Could not fetch plan limits: ${err.message}`);
    }
  }
}
