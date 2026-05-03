import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors,
  ParseIntPipe, DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ToursService } from './tours.service';
import { CreateTourDto, UpdateTourDto } from '../../dto/tour.dto';
import { LinkActivityDto } from '../../dto/activity-link.dto';
import { TenantContextInterceptor } from '../../interceptors/tenant-context.interceptor';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Tours')
@ApiHeader({ name: 'x-tenant-slug', required: true })
@UseInterceptors(TenantContextInterceptor)
@Controller('products/tours')
export class ToursController {
  constructor(private readonly svc: ToursService) {}

  @Post() @ApiBearerAuth() @ApiOperation({ summary: 'Create tour' })
  async create(@Body() dto: CreateTourDto) { return ok(await this.svc.create(dto)); }

  @Get() @ApiOperation({ summary: 'List tours with pagination' })
  async findAll(
    @Query('regionId') regionId?: string,
    @Query('published') published?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    const p = page || 1;
    const l = limit || 20;
    const result = published === 'true'
      ? await this.svc.findPublished(regionId, p, l)
      : await this.svc.findAll(regionId, p, l);

    return ok(result.data, {
      page: p,
      limit: l,
      total: result.total,
      totalPages: Math.ceil(result.total / l),
    });
  }

  // ✅ FIXED: Route ordering - more specific route first
  @Get('slug/:slug') @ApiOperation({ summary: 'Get tour by slug' })
  async findBySlug(@Param('slug') slug: string) { return ok(await this.svc.findBySlug(slug)); }

  @Get(':id') @ApiOperation({ summary: 'Get tour by ID' })
  async findOne(@Param('id') id: string) { return ok(await this.svc.findOne(id)); }

  @Patch(':id') @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdateTourDto) { return ok(await this.svc.update(id, dto)); }

  @Delete(':id') @ApiBearerAuth()
  async remove(@Param('id') id: string) { await this.svc.remove(id); return ok({ deleted: true }); }

  @Post(':id/activities') @ApiBearerAuth() @ApiOperation({ summary: 'Link activity to tour' })
  async linkActivity(@Param('id') id: string, @Body() dto: LinkActivityDto) {
    return ok(await this.svc.linkActivity(id, dto));
  }

  @Delete(':id/activities/:activityId') @ApiBearerAuth()
  async unlinkActivity(@Param('id') id: string, @Param('activityId') activityId: string) {
    await this.svc.unlinkActivity(id, activityId); return ok({ unlinked: true });
  }
}
