import {
  Controller, Get, Post, Patch, Delete, Body, Param, Headers, Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BuilderService } from './builder.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { CreateSnapshotDto } from './dto/create-snapshot.dto';
import { ok } from '@hamrotourist/shared-types';

function requireTenantSlug(slug: string | undefined): string {
  if (!slug || !/^[a-z0-9][a-z0-9-_]{1,62}$/.test(slug)) {
    throw new BadRequestException('Missing or invalid x-tenant-slug header');
  }
  return slug;
}

function makeCtx(slug: string) {
  return { schema: `tenant_${slug.replace(/-/g, '_')}`, slug };
}

@ApiTags('Builder')
@Controller('builder')
export class BuilderController {
  constructor(private readonly svc: BuilderService) {}

  // ─── Settings ──────────────────────────────────────────────

  @Get('settings')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get builder settings' })
  async getSettings(@Headers('x-tenant-slug') slug: string) {
    return ok(await this.svc.getSettings(makeCtx(requireTenantSlug(slug))));
  }

  @Patch('settings')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Update builder settings' })
  async updateSettings(
    @Headers('x-tenant-slug') slug: string,
    @Body() dto: UpdateSettingsDto,
  ) {
    return ok(await this.svc.updateSettings(makeCtx(requireTenantSlug(slug)), dto));
  }

  // ─── Themes ──────────────────────────────────────────────────

  @Get('themes')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'List available themes' })
  async listThemes(@Headers('x-tenant-slug') slug: string) {
    return ok(await this.svc.listThemes(makeCtx(requireTenantSlug(slug))));
  }

  @Get('themes/:key')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get theme details' })
  async getTheme(@Headers('x-tenant-slug') slug: string, @Param('key') key: string) {
    return ok(await this.svc.getTheme(makeCtx(requireTenantSlug(slug)), key));
  }

  @Post('themes/seed')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Seed builtin themes (idempotent)' })
  async seedThemes(@Headers('x-tenant-slug') slug: string) {
    await this.svc.seedBuiltinThemes(makeCtx(requireTenantSlug(slug)));
    return ok({ seeded: true });
  }

  // ─── Pages ───────────────────────────────────────────────────

  @Get('pages')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'List all pages' })
  async listPages(@Headers('x-tenant-slug') slug: string) {
    return ok(await this.svc.listPages(makeCtx(requireTenantSlug(slug))));
  }

  @Get('pages/:pageId')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get page by ID' })
  async getPage(@Headers('x-tenant-slug') slug: string, @Param('pageId') pageId: string) {
    return ok(await this.svc.getPage(makeCtx(requireTenantSlug(slug)), pageId));
  }

  @Get('pages/slug/:slug')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get page by slug' })
  async getPageBySlug(
    @Headers('x-tenant-slug') tenantSlug: string,
    @Param('slug') pageSlug: string,
  ) {
    return ok(await this.svc.getPageBySlug(makeCtx(requireTenantSlug(tenantSlug)), pageSlug));
  }

  @Post('pages')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Create a new page' })
  async createPage(@Headers('x-tenant-slug') slug: string, @Body() dto: CreatePageDto) {
    return ok(await this.svc.createPage(makeCtx(requireTenantSlug(slug)), dto));
  }

  @Patch('pages/:pageId')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Update a page' })
  async updatePage(
    @Headers('x-tenant-slug') slug: string,
    @Param('pageId') pageId: string,
    @Body() dto: UpdatePageDto,
  ) {
    return ok(await this.svc.updatePage(makeCtx(requireTenantSlug(slug)), pageId, dto));
  }

  @Delete('pages/:pageId')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Delete a page' })
  async deletePage(@Headers('x-tenant-slug') slug: string, @Param('pageId') pageId: string) {
    await this.svc.deletePage(makeCtx(requireTenantSlug(slug)), pageId);
    return ok({ deleted: true });
  }

  @Post('pages/reorder')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Reorder pages' })
  async reorderPages(@Headers('x-tenant-slug') slug: string, @Body('pageIds') pageIds: string[]) {
    await this.svc.reorderPages(makeCtx(requireTenantSlug(slug)), pageIds);
    return ok({ reordered: true });
  }

  // ─── Sections ──────────────────────────────────────────────

  @Post('pages/:pageId/sections')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Add section to page' })
  async addSection(
    @Headers('x-tenant-slug') slug: string,
    @Param('pageId') pageId: string,
    @Body() dto: { sectionType: string; label?: string; config?: Record<string, any>; variant?: string },
  ) {
    return ok(await this.svc.addSection(makeCtx(requireTenantSlug(slug)), pageId, dto));
  }

  @Patch('sections/:sectionId')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Update a section' })
  async updateSection(
    @Headers('x-tenant-slug') slug: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: { label?: string; enabled?: boolean; config?: Record<string, any>; variant?: string },
  ) {
    return ok(await this.svc.updateSection(makeCtx(requireTenantSlug(slug)), sectionId, dto));
  }

  @Delete('sections/:sectionId')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Delete a section' })
  async deleteSection(@Headers('x-tenant-slug') slug: string, @Param('sectionId') sectionId: string) {
    await this.svc.deleteSection(makeCtx(requireTenantSlug(slug)), sectionId);
    return ok({ deleted: true });
  }

  @Post('pages/:pageId/sections/reorder')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Reorder sections within a page' })
  async reorderSections(
    @Headers('x-tenant-slug') slug: string,
    @Param('pageId') pageId: string,
    @Body('sectionIds') sectionIds: string[],
  ) {
    await this.svc.reorderSections(makeCtx(requireTenantSlug(slug)), pageId, sectionIds);
    return ok({ reordered: true });
  }

  @Post('sections/:sectionId/duplicate')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Duplicate a section' })
  async duplicateSection(@Headers('x-tenant-slug') slug: string, @Param('sectionId') sectionId: string) {
    return ok(await this.svc.duplicateSection(makeCtx(requireTenantSlug(slug)), sectionId));
  }

  // ─── Snapshots ───────────────────────────────────────────────

  @Get('snapshots')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'List snapshots' })
  async listSnapshots(@Headers('x-tenant-slug') slug: string) {
    return ok(await this.svc.listSnapshots(makeCtx(requireTenantSlug(slug))));
  }

  @Get('snapshots/:snapshotId')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get snapshot' })
  async getSnapshot(@Headers('x-tenant-slug') slug: string, @Param('snapshotId') snapshotId: string) {
    return ok(await this.svc.getSnapshot(makeCtx(requireTenantSlug(slug)), snapshotId));
  }

  @Post('snapshots')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Create snapshot' })
  async createSnapshot(@Headers('x-tenant-slug') slug: string, @Body() dto: CreateSnapshotDto) {
    return ok(await this.svc.createSnapshot(makeCtx(requireTenantSlug(slug)), dto));
  }

  @Post('snapshots/:snapshotId/restore')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Restore snapshot' })
  async restoreSnapshot(@Headers('x-tenant-slug') slug: string, @Param('snapshotId') snapshotId: string) {
    return ok(await this.svc.restoreSnapshot(makeCtx(requireTenantSlug(slug)), snapshotId));
  }

  @Delete('snapshots/:snapshotId')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Delete snapshot' })
  async deleteSnapshot(@Headers('x-tenant-slug') slug: string, @Param('snapshotId') snapshotId: string) {
    await this.svc.deleteSnapshot(makeCtx(requireTenantSlug(slug)), snapshotId);
    return ok({ deleted: true });
  }

  // ─── Publish ─────────────────────────────────────────────────

  @Post('publish')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Publish all pages (creates snapshot + marks live)' })
  async publish(
    @Headers('x-tenant-slug') slug: string,
    @Body() body: { userId?: string; userName?: string },
  ) {
    return ok(await this.svc.publish(makeCtx(requireTenantSlug(slug)), body?.userId, body?.userName));
  }

  @Get('live')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get live snapshot' })
  async getLiveSnapshot(@Headers('x-tenant-slug') slug: string) {
    return ok(await this.svc.getLiveSnapshot(makeCtx(requireTenantSlug(slug))));
  }

  // ─── Site data (public) ──────────────────────────────────────

  @Get('site')
  @ApiHeader({ name: 'x-tenant-slug', required: true })
  @ApiOperation({ summary: 'Get full site data for renderer' })
  async getSiteData(
    @Headers('x-tenant-slug') slug: string,
    @Query('preview') preview?: string,
  ) {
    return ok(await this.svc.getSiteData(makeCtx(requireTenantSlug(slug)), preview === 'true'));
  }
}
