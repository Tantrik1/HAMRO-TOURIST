import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TreksService } from './treks.service';
import { CreateTrekDto, UpdateTrekDto } from '../../dto/trek.dto';
import { LinkActivityDto } from '../../dto/activity-link.dto';
import { TenantContextInterceptor } from '../../interceptors/tenant-context.interceptor';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Treks')
@ApiHeader({ name: 'x-tenant-slug', required: true })
@UseInterceptors(TenantContextInterceptor)
@Controller('products/treks')
export class TreksController {
  constructor(private readonly svc: TreksService) {}

  @Post() @ApiBearerAuth() async create(@Body() dto: CreateTrekDto) { return ok(await this.svc.create(dto)); }

  @Get() async findAll(@Query('regionId') regionId?: string, @Query('published') pub?: string) {
    if (pub === 'true') return ok(await this.svc.findPublished(regionId));
    return ok(await this.svc.findAll(regionId));
  }

  @Get(':id') async findOne(@Param('id') id: string) { return ok(await this.svc.findOne(id)); }

  @Get('slug/:slug') async findBySlug(@Param('slug') slug: string) { return ok(await this.svc.findBySlug(slug)); }

  @Patch(':id') @ApiBearerAuth() async update(@Param('id') id: string, @Body() dto: UpdateTrekDto) { return ok(await this.svc.update(id, dto)); }

  @Delete(':id') @ApiBearerAuth() async remove(@Param('id') id: string) { await this.svc.remove(id); return ok({ deleted: true }); }

  @Post(':id/activities') @ApiBearerAuth() @ApiOperation({ summary: 'Link activity to trek' })
  async linkActivity(@Param('id') id: string, @Body() dto: LinkActivityDto) {
    return ok(await this.svc.linkActivity(id, dto));
  }

  @Delete(':id/activities/:activityId') @ApiBearerAuth()
  async unlinkActivity(@Param('id') id: string, @Param('activityId') aid: string) {
    await this.svc.unlinkActivity(id, aid); return ok({ unlinked: true });
  }
}
