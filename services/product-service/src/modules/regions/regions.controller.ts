import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { CreateRegionDto, UpdateRegionDto } from '../../dto/region.dto';
import { TenantContextInterceptor } from '../../interceptors/tenant-context.interceptor';
import { TenantSlug } from '../../interceptors/tenant-slug.decorator';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Regions')
@ApiHeader({ name: 'x-tenant-slug', required: true })
@UseInterceptors(TenantContextInterceptor)
@Controller('products/regions')
export class RegionsController {
  constructor(private readonly svc: RegionsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create region (plan-limited)' })
  async create(@Body() dto: CreateRegionDto, @TenantSlug() slug: string) {
    return ok(await this.svc.create(dto, slug));
  }

  @Get()
  @ApiOperation({ summary: 'List all regions' })
  async findAll(@Query('countryId') countryId?: string) {
    if (countryId) return ok(await this.svc.findByCountry(countryId));
    return ok(await this.svc.findAll());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get region by ID' })
  async findOne(@Param('id') id: string) {
    return ok(await this.svc.findOne(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdateRegionDto) {
    return ok(await this.svc.update(id, dto));
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    await this.svc.remove(id);
    return ok({ deleted: true });
  }
}
