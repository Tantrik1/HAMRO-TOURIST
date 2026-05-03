import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors,
  ParseIntPipe, DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import { CreatePackageDto, UpdatePackageDto } from '../../dto/package.dto';
import { TenantContextInterceptor } from '../../interceptors/tenant-context.interceptor';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Packages')
@ApiHeader({ name: 'x-tenant-slug', required: true })
@UseInterceptors(TenantContextInterceptor)
@Controller('products/packages')
export class PackagesController {
  constructor(private readonly svc: PackagesService) {}

  @Post() @ApiBearerAuth() async create(@Body() dto: CreatePackageDto) { return ok(await this.svc.create(dto)); }

  @Get() async findAll(
    @Query('published') pub?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    const p = page || 1;
    const l = limit || 20;
    const result = pub === 'true'
      ? await this.svc.findPublished(p, l)
      : await this.svc.findAll(p, l);

    return ok(result.data, {
      page: p,
      limit: l,
      total: result.total,
      totalPages: Math.ceil(result.total / l),
    });
  }

  // ✅ FIXED: Route ordering - more specific route first
  @Get('slug/:slug') async findBySlug(@Param('slug') slug: string) { return ok(await this.svc.findBySlug(slug)); }
  @Get(':id') async findOne(@Param('id') id: string) { return ok(await this.svc.findOne(id)); }

  @Patch(':id') @ApiBearerAuth() async update(@Param('id') id: string, @Body() dto: UpdatePackageDto) {
    return ok(await this.svc.update(id, dto));
  }

  @Delete(':id') @ApiBearerAuth() async remove(@Param('id') id: string) {
    await this.svc.remove(id); return ok({ deleted: true });
  }
}
