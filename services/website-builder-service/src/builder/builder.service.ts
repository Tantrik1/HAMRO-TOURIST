import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { BuilderThemeEntity } from './entities/builder-theme.entity';
import { BuilderPageEntity } from './entities/builder-page.entity';
import { BuilderSectionEntity } from './entities/builder-section.entity';
import { BuilderSnapshotEntity } from './entities/builder-snapshot.entity';
import { BuilderSettingsEntity } from './entities/builder-settings.entity';
import { CreatePageDto, CreateSectionDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { CreateSnapshotDto } from './dto/create-snapshot.dto';

interface TenantContext {
  schema: string;
  slug: string;
}

function makeContext(tenantSlug: string): TenantContext {
  return { schema: `tenant_${tenantSlug.replace(/-/g, '_')}`, slug: tenantSlug };
}

@Injectable()
export class BuilderService {
  private readonly logger = new Logger(BuilderService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(BuilderThemeEntity)
    private readonly themeRepo: Repository<BuilderThemeEntity>,
    @InjectRepository(BuilderPageEntity)
    private readonly pageRepo: Repository<BuilderPageEntity>,
    @InjectRepository(BuilderSectionEntity)
    private readonly sectionRepo: Repository<BuilderSectionEntity>,
    @InjectRepository(BuilderSnapshotEntity)
    private readonly snapshotRepo: Repository<BuilderSnapshotEntity>,
    @InjectRepository(BuilderSettingsEntity)
    private readonly settingsRepo: Repository<BuilderSettingsEntity>,
  ) {}

  // ─── Tenant helpers ──────────────────────────────────────

  private tenantDepth = 0;

  private async withTenant<T>(ctx: TenantContext, fn: () => Promise<T>): Promise<T> {
    const isOutermost = this.tenantDepth === 0;
    if (isOutermost) {
      await this.dataSource.query(`SET search_path TO "${ctx.schema}"`);
    }
    this.tenantDepth++;
    try {
      const result = await fn();
      return result;
    } finally {
      this.tenantDepth--;
      if (this.tenantDepth === 0) {
        await this.dataSource.query('SET search_path TO public');
      }
    }
  }

  // ─── Settings ─────────────────────────────────────────────

  async getSettings(ctx: TenantContext): Promise<BuilderSettingsEntity> {
    return this.withTenant(ctx, async () => {
      let settings = await this.settingsRepo.findOne({ where: {} });
      if (!settings) {
        settings = this.settingsRepo.create({});
        await this.settingsRepo.save(settings);
      }
      return settings;
    });
  }

  async updateSettings(ctx: TenantContext, dto: UpdateSettingsDto): Promise<BuilderSettingsEntity> {
    return this.withTenant(ctx, async () => {
      const settings = await this.getSettings(ctx);
      Object.assign(settings, dto);
      return this.settingsRepo.save(settings);
    });
  }

  // ─── Themes ────────────────────────────────────────────────

  async listThemes(ctx: TenantContext): Promise<BuilderThemeEntity[]> {
    return this.withTenant(ctx, () => this.themeRepo.find({ where: { isActive: true } }));
  }

  async getTheme(ctx: TenantContext, key: string): Promise<BuilderThemeEntity> {
    return this.withTenant(ctx, async () => {
      const theme = await this.themeRepo.findOne({ where: { key } });
      if (!theme) throw new NotFoundException(`Theme "${key}" not found`);
      return theme;
    });
  }

  async seedBuiltinThemes(ctx: TenantContext): Promise<void> {
    return this.withTenant(ctx, async () => {
      const count = await this.themeRepo.count();
      if (count > 0) return;

      const themes: Partial<BuilderThemeEntity>[] = [
        {
          key: 'adventure-bold',
          name: 'Adventure Bold',
          description: 'Dark, immersive layout for adventure travel brands.',
          source: 'builtin',
          colorDefaults: {
            primary: '#7C3AED',
            secondary: '#06B6D4',
            accent: '#F97316',
            lime: '#84CC16',
            ink: '#0A0A0F',
            surface: '#111118',
            surface2: '#1A1A24',
            text: '#F1F0FF',
            textSoft: '#9B9BB8',
            textFaint: '#5C5C78',
            border: '#2A2A3A',
            muted: '#3D3D52',
          },
          fontDefaults: { heading: 'Syne', body: 'DM Sans', mono: 'JetBrains Mono' },
          allowedSections: [],
          defaultNavbarVariant: 'transparent',
          defaultFooterVariant: 'mega',
        },
        {
          key: 'travel-minimal',
          name: 'Travel Minimal',
          description: 'Clean, editorial layout with generous whitespace.',
          source: 'builtin',
          colorDefaults: {
            primary: '#2563EB',
            secondary: '#0EA5E9',
            accent: '#F59E0B',
            lime: '#22C55E',
            ink: '#FFFFFF',
            surface: '#F8FAFC',
            surface2: '#F1F5F9',
            text: '#0F172A',
            textSoft: '#64748B',
            textFaint: '#94A3B8',
            border: '#E2E8F0',
            muted: '#CBD5E1',
          },
          fontDefaults: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
          allowedSections: [],
          defaultNavbarVariant: 'minimal',
          defaultFooterVariant: 'minimal',
        },
        {
          key: 'nature-warm',
          name: 'Nature Warm',
          description: 'Earthy tones and warm gradients for eco-tourism.',
          source: 'builtin',
          colorDefaults: {
            primary: '#059669',
            secondary: '#0891B2',
            accent: '#D97706',
            lime: '#65A30D',
            ink: '#064E3B',
            surface: '#065F46',
            surface2: '#047857',
            text: '#ECFDF5',
            textSoft: '#A7F3D0',
            textFaint: '#6EE7B7',
            border: '#10B981',
            muted: '#34D399',
          },
          fontDefaults: { heading: 'Merriweather', body: 'Inter', mono: 'JetBrains Mono' },
          allowedSections: [],
          defaultNavbarVariant: 'classic',
          defaultFooterVariant: 'centered',
        },
      ];

      await this.themeRepo.save(themes.map((t) => this.themeRepo.create(t)));
      this.logger.log(`Seeded ${themes.length} builtin themes for ${ctx.slug}`);
    });
  }

  // ─── Pages ───────────────────────────────────────────────────

  async listPages(ctx: TenantContext): Promise<BuilderPageEntity[]> {
    return this.withTenant(ctx, () =>
      this.pageRepo.find({
        where: { status: In(['draft', 'published']) },
        order: { sortOrder: 'ASC', createdAt: 'ASC' },
        relations: ['sections'],
      }),
    );
  }

  async getPage(ctx: TenantContext, pageId: string): Promise<BuilderPageEntity> {
    return this.withTenant(ctx, async () => {
      const page = await this.pageRepo.findOne({
        where: { id: pageId },
        relations: ['sections'],
      });
      if (!page) throw new NotFoundException('Page not found');
      page.sections.sort((a, b) => a.sortOrder - b.sortOrder);
      return page;
    });
  }

  async getPageBySlug(ctx: TenantContext, slug: string): Promise<BuilderPageEntity> {
    return this.withTenant(ctx, async () => {
      const page = await this.pageRepo.findOne({
        where: { slug },
        relations: ['sections'],
      });
      if (!page) throw new NotFoundException('Page not found');
      page.sections.sort((a, b) => a.sortOrder - b.sortOrder);
      return page;
    });
  }

  async createPage(ctx: TenantContext, dto: CreatePageDto): Promise<BuilderPageEntity> {
    return this.withTenant(ctx, async () => {
      const existing = await this.pageRepo.findOne({ where: { slug: dto.slug } });
      if (existing) throw new BadRequestException(`Page with slug "${dto.slug}" already exists`);

      if (dto.isHome) {
        await this.pageRepo.update({ isHome: true }, { isHome: false });
      }

      const page = this.pageRepo.create(dto);
      const saved = await this.pageRepo.save(page);

      if (dto.sections?.length) {
        const sections = dto.sections.map((s, i) =>
          this.sectionRepo.create({ ...s, pageId: saved.id, sortOrder: s.sortOrder ?? i }),
        );
        await this.sectionRepo.save(sections);
      }

      return this.getPage(ctx, saved.id);
    });
  }

  async updatePage(ctx: TenantContext, pageId: string, dto: UpdatePageDto): Promise<BuilderPageEntity> {
    return this.withTenant(ctx, async () => {
      const page = await this.getPage(ctx, pageId);

      if (dto.slug && dto.slug !== page.slug) {
        const existing = await this.pageRepo.findOne({ where: { slug: dto.slug } });
        if (existing) throw new BadRequestException(`Slug "${dto.slug}" already in use`);
      }

      if (dto.isHome) {
        await this.pageRepo.update({ isHome: true }, { isHome: false });
      }

      Object.assign(page, dto);
      await this.pageRepo.save(page);

      if (dto.sections) {
        await this.sectionRepo.delete({ pageId });
        const sections = dto.sections.map((s, i) =>
          this.sectionRepo.create({ ...s, pageId, sortOrder: s.sortOrder ?? i }),
        );
        await this.sectionRepo.save(sections);
      }

      return this.getPage(ctx, pageId);
    });
  }

  async deletePage(ctx: TenantContext, pageId: string): Promise<void> {
    return this.withTenant(ctx, async () => {
      const page = await this.pageRepo.findOne({ where: { id: pageId } });
      if (!page) throw new NotFoundException('Page not found');
      await this.pageRepo.softDelete(pageId);
    });
  }

  async reorderPages(ctx: TenantContext, pageIds: string[]): Promise<void> {
    return this.withTenant(ctx, async () => {
      for (let i = 0; i < pageIds.length; i++) {
        await this.pageRepo.update({ id: pageIds[i] }, { sortOrder: i });
      }
    });
  }

  // ─── Sections ──────────────────────────────────────────────

  async addSection(ctx: TenantContext, pageId: string, dto: CreateSectionDto): Promise<BuilderSectionEntity> {
    return this.withTenant(ctx, async () => {
      const page = await this.pageRepo.findOne({ where: { id: pageId } });
      if (!page) throw new NotFoundException('Page not found');

      const maxOrder = await this.sectionRepo
        .createQueryBuilder('s')
        .select('MAX(s.sortOrder)', 'max')
        .where('s.pageId = :pageId', { pageId })
        .getRawOne();

      const section = this.sectionRepo.create({
        ...dto,
        pageId,
        sortOrder: dto.sortOrder ?? (maxOrder?.max ?? 0) + 1,
      });
      return this.sectionRepo.save(section);
    });
  }

  async updateSection(ctx: TenantContext, sectionId: string, dto: Partial<CreateSectionDto>): Promise<BuilderSectionEntity> {
    return this.withTenant(ctx, async () => {
      const section = await this.sectionRepo.findOne({ where: { id: sectionId } });
      if (!section) throw new NotFoundException('Section not found');
      Object.assign(section, dto);
      return this.sectionRepo.save(section);
    });
  }

  async deleteSection(ctx: TenantContext, sectionId: string): Promise<void> {
    return this.withTenant(ctx, async () => {
      await this.sectionRepo.delete({ id: sectionId });
    });
  }

  async reorderSections(ctx: TenantContext, pageId: string, sectionIds: string[]): Promise<void> {
    return this.withTenant(ctx, async () => {
      for (let i = 0; i < sectionIds.length; i++) {
        await this.sectionRepo.update({ id: sectionIds[i], pageId }, { sortOrder: i });
      }
    });
  }

  async duplicateSection(ctx: TenantContext, sectionId: string): Promise<BuilderSectionEntity> {
    return this.withTenant(ctx, async () => {
      const section = await this.sectionRepo.findOne({ where: { id: sectionId } });
      if (!section) throw new NotFoundException('Section not found');
      const { id, createdAt, updatedAt, ...rest } = section;
      const duplicate = this.sectionRepo.create({
        ...rest,
        label: `${rest.label} (Copy)`,
        sortOrder: rest.sortOrder + 1,
      });
      return this.sectionRepo.save(duplicate);
    });
  }

  // ─── Snapshots ─────────────────────────────────────────────

  async listSnapshots(ctx: TenantContext): Promise<BuilderSnapshotEntity[]> {
    return this.withTenant(ctx, () =>
      this.snapshotRepo.find({ order: { createdAt: 'DESC' } }),
    );
  }

  async getSnapshot(ctx: TenantContext, snapshotId: string): Promise<BuilderSnapshotEntity> {
    return this.withTenant(ctx, async () => {
      const snap = await this.snapshotRepo.findOne({ where: { id: snapshotId } });
      if (!snap) throw new NotFoundException('Snapshot not found');
      return snap;
    });
  }

  async createSnapshot(ctx: TenantContext, dto: CreateSnapshotDto): Promise<BuilderSnapshotEntity> {
    return this.withTenant(ctx, async () => {
      const snap = this.snapshotRepo.create(dto);
      return this.snapshotRepo.save(snap);
    });
  }

  async restoreSnapshot(ctx: TenantContext, snapshotId: string): Promise<BuilderPageEntity[]> {
    return this.withTenant(ctx, async () => {
      const snap = await this.getSnapshot(ctx, snapshotId);

      // Archive current pages
      await this.pageRepo.update({ status: 'published' }, { status: 'archived' });

      // Restore pages from snapshot
      const restoredPages: BuilderPageEntity[] = [];
      for (const pageData of snap.pages) {
        const page = this.pageRepo.create({
          slug: pageData.slug,
          label: pageData.label,
          status: 'draft',
          navbarVariant: 'classic',
          footerVariant: 'mega',
        });
        const saved = await this.pageRepo.save(page);

        if (pageData.sections?.length) {
          const sections = pageData.sections.map((s, i) =>
            this.sectionRepo.create({
              sectionType: s.sectionType,
              label: s.label,
              enabled: s.enabled,
              config: s.config,
              sortOrder: s.sortOrder ?? i,
              variant: s.variant ?? 'standard',
              pageId: saved.id,
            }),
          );
          await this.sectionRepo.save(sections);
        }
        restoredPages.push(saved);
      }

      return restoredPages;
    });
  }

  async deleteSnapshot(ctx: TenantContext, snapshotId: string): Promise<void> {
    return this.withTenant(ctx, async () => {
      await this.snapshotRepo.delete({ id: snapshotId });
    });
  }

  // ─── Publish ───────────────────────────────────────────────

  async publish(ctx: TenantContext, userId?: string, userName?: string): Promise<{ url: string; snapshotId: string }> {
    return this.withTenant(ctx, async () => {
      const settings = await this.getSettings(ctx);
      const pages = await this.listPages(ctx);

      // Build snapshot from current draft pages
      const snapshotPages = pages
        .filter((p) => p.status !== 'archived')
        .map((page) => ({
          id: page.id,
          slug: page.slug,
          label: page.label,
          status: page.status,
          sections: page.sections.map((s) => ({
            id: s.id,
            sectionType: s.sectionType,
            label: s.label,
            enabled: s.enabled,
            config: s.config,
            sortOrder: s.sortOrder,
            variant: s.variant,
          })),
        }));

      // Mark all pages as published
      for (const page of pages) {
        await this.pageRepo.update({ id: page.id }, { status: 'published', publishedAt: new Date() });
      }

      // Create publish snapshot
      const snapshot = await this.snapshotRepo.save(
        this.snapshotRepo.create({
          name: `Publish — ${new Date().toISOString()}`,
          snapshotType: 'publish',
          pages: snapshotPages,
          themeOverrides: settings,
          themeKey: settings.activeThemeKey,
          publishedByUserId: userId ?? null,
          publishedByName: userName ?? null,
          publishedAt: new Date(),
          isLive: true,
        }),
      );

      // Unmark previous live snapshots
      await this.snapshotRepo.update(
        { isLive: true, id: snapshot.id },
        { isLive: true },
      );
      await this.snapshotRepo
        .createQueryBuilder()
        .update()
        .set({ isLive: false })
        .where('id != :id', { id: snapshot.id })
        .execute();

      settings.published = true;
      settings.publishedAt = new Date();
      await this.settingsRepo.save(settings);

      const url = `https://${ctx.slug}.hamrotourist.com`;
      this.logger.log(`Published snapshot ${snapshot.id} for ${ctx.slug}`);

      return { url, snapshotId: snapshot.id };
    });
  }

  async getLiveSnapshot(ctx: TenantContext): Promise<BuilderSnapshotEntity | null> {
    return this.withTenant(ctx, () =>
      this.snapshotRepo.findOne({ where: { isLive: true }, order: { createdAt: 'DESC' } }),
    );
  }

  // ─── Full site data (for renderer) ─────────────────────────

  async getSiteData(ctx: TenantContext, preview = false): Promise<{
    settings: BuilderSettingsEntity;
    pages: BuilderPageEntity[];
    theme: BuilderThemeEntity | null;
  }> {
    return this.withTenant(ctx, async () => {
      const settings = await this.getSettings(ctx);
      const theme = await this.themeRepo.findOne({ where: { key: settings.activeThemeKey } });
      const where = preview ? {} : { status: 'published' as const };
      const pages = await this.pageRepo.find({
        where,
        order: { sortOrder: 'ASC' },
        relations: ['sections'],
      });
      for (const page of pages) {
        page.sections.sort((a, b) => a.sortOrder - b.sortOrder);
      }
      return { settings, pages, theme };
    });
  }
}
