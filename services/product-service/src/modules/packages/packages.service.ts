import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PackageEntity } from '../../entities/package.entity';
import { RegionEntity } from '../../entities/region.entity';
import { CreatePackageDto, UpdatePackageDto } from '../../dto/package.dto';
import { PolymorphicRelationsService } from '../../common/polymorphic-relations.service';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity) private readonly repo: Repository<PackageEntity>,
    @InjectRepository(RegionEntity) private readonly regionRepo: Repository<RegionEntity>,
    private readonly relations: PolymorphicRelationsService,
  ) {}

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    const { regionIds, destinations, faqs, groupDiscounts, ...rest } = dto;
    const pkg = this.repo.create(rest);
    if (regionIds?.length) {
      pkg.regions = await this.regionRepo.find({ where: { id: In(regionIds) } });
    }
    const saved = await this.repo.save(pkg);
    await this.relations.saveFaqs('package', saved.id, faqs);
    await this.relations.saveGroupDiscounts('package', saved.id, groupDiscounts);
    return this.findOne(saved.id);
  }

  async findAll(page: number = 1, limit: number = 20): Promise<{ data: PackageEntity[]; total: number }> {
    // ✅ Bounds checking for pagination
    page = Math.max(1, page);
    limit = Math.min(Math.max(1, limit), 100);

    const [data, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      relations: ['regions'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findPublished(page: number = 1, limit: number = 20): Promise<{ data: PackageEntity[]; total: number }> {
    // ✅ Bounds checking for pagination
    page = Math.max(1, page);
    limit = Math.min(Math.max(1, limit), 100);

    const [data, total] = await this.repo.findAndCount({
      where: { status: 'published' },
      relations: ['regions'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<PackageEntity> {
    const pkg = await this.repo.findOne({ where: { id }, relations: ['regions'] });
    if (!pkg) throw new NotFoundException(`Package ${id} not found`);
    pkg.faqs = await this.relations.loadFaqs('package', pkg.id);
    pkg.groupDiscounts = await this.relations.loadGroupDiscounts('package', pkg.id);
    return pkg;
  }

  async findBySlug(slug: string): Promise<PackageEntity> {
    const pkg = await this.repo.findOne({ where: { slug }, relations: ['regions'] });
    if (!pkg) throw new NotFoundException(`Package "${slug}" not found`);
    pkg.faqs = await this.relations.loadFaqs('package', pkg.id);
    pkg.groupDiscounts = await this.relations.loadGroupDiscounts('package', pkg.id);
    return pkg;
  }

  async update(id: string, dto: UpdatePackageDto): Promise<PackageEntity> {
    const pkg = await this.findOne(id);
    const { regionIds, faqs, groupDiscounts, ...rest } = dto;
    Object.assign(pkg, rest);
    if (regionIds) {
      pkg.regions = await this.regionRepo.find({ where: { id: In(regionIds) } });
    }
    await this.repo.save(pkg);
    await this.relations.saveFaqs('package', id, faqs);
    await this.relations.saveGroupDiscounts('package', id, groupDiscounts);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.relations.deleteAllForEntity('package', id);
    await this.repo.softDelete(id);
  }
}
