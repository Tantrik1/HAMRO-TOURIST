import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors,
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

  @Get() async findAll(@Query('published') pub?: string) {
    if (pub === 'true') return ok(await this.svc.findPublished());
    return ok(await this.svc.findAll());
  }

  @Get(':id') async findOne(@Param('id') id: string) { return ok(await this.svc.findOne(id)); }
  @Get('slug/:slug') async findBySlug(@Param('slug') slug: string) { return ok(await this.svc.findBySlug(slug)); }

  @Patch(':id') @ApiBearerAuth() async update(@Param('id') id: string, @Body() dto: UpdatePackageDto) {
    return ok(await this.svc.update(id, dto));
  }

  @Delete(':id') @ApiBearerAuth() async remove(@Param('id') id: string) {
    await this.svc.remove(id); return ok({ deleted: true });
  }
}
