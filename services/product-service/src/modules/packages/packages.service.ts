import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PackageEntity } from '../../entities/package.entity';
import { RegionEntity } from '../../entities/region.entity';
import { CreatePackageDto, UpdatePackageDto } from '../../dto/package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity) private readonly repo: Repository<PackageEntity>,
    @InjectRepository(RegionEntity) private readonly regionRepo: Repository<RegionEntity>,
  ) {}

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    const pkg = this.repo.create({
      title: dto.title, slug: dto.slug,
      description: dto.description, coverImageUrl: dto.coverImageUrl,
    });
    if (dto.regionIds?.length) {
      pkg.regions = await this.regionRepo.find({ where: { id: In(dto.regionIds) } });
    }
    return this.repo.save(pkg);
  }

  async findAll(): Promise<PackageEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' }, relations: ['regions'] });
  }

  async findPublished(): Promise<PackageEntity[]> {
    return this.repo.find({ where: { status: 'published' }, relations: ['regions'] });
  }

  async findOne(id: string): Promise<PackageEntity> {
    const pkg = await this.repo.findOne({ where: { id }, relations: ['regions'] });
    if (!pkg) throw new NotFoundException(`Package ${id} not found`);
    return pkg;
  }

  async findBySlug(slug: string): Promise<PackageEntity> {
    const pkg = await this.repo.findOne({ where: { slug }, relations: ['regions'] });
    if (!pkg) throw new NotFoundException(`Package "${slug}" not found`);
    return pkg;
  }

  async update(id: string, dto: UpdatePackageDto): Promise<PackageEntity> {
    const pkg = await this.findOne(id);
    if (dto.title !== undefined) pkg.title = dto.title;
    if (dto.description !== undefined) pkg.description = dto.description;
    if (dto.coverImageUrl !== undefined) pkg.coverImageUrl = dto.coverImageUrl;
    if (dto.status !== undefined) pkg.status = dto.status;
    if (dto.regionIds) {
      pkg.regions = await this.regionRepo.find({ where: { id: In(dto.regionIds) } });
    }
    return this.repo.save(pkg);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
