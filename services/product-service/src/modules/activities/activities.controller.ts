import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors,
  ParseIntPipe, DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto, UpdateActivityDto } from '../../dto/activity.dto';
import { TenantContextInterceptor } from '../../interceptors/tenant-context.interceptor';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Activities')
@ApiHeader({ name: 'x-tenant-slug', required: true })
@UseInterceptors(TenantContextInterceptor)
@Controller('products/activities')
export class ActivitiesController {
  constructor(private readonly svc: ActivitiesService) {}

  @Post() @ApiBearerAuth() async create(@Body() dto: CreateActivityDto) { return ok(await this.svc.create(dto)); }

  @Get() async findAll(
    @Query('regionId') regionId?: string,
    @Query('published') pub?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    const result = pub === 'true'
      ? await this.svc.findPublished(regionId, page, limit)
      : await this.svc.findAll(regionId, page, limit);

    return ok(result.data, {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / (limit || 20)),
    });
  }

  // ✅ FIXED: Route ordering - more specific route first
  @Get('slug/:slug') async findBySlug(@Param('slug') slug: string) { return ok(await this.svc.findBySlug(slug)); }
  @Get(':id') async findOne(@Param('id') id: string) { return ok(await this.svc.findOne(id)); }

  @Patch(':id') @ApiBearerAuth() async update(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
    return ok(await this.svc.update(id, dto));
  }

  @Delete(':id') @ApiBearerAuth() async remove(@Param('id') id: string) {
    await this.svc.remove(id); return ok({ deleted: true });
  }
}
