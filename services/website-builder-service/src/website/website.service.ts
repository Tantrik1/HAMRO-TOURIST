import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import Redis from 'ioredis';
import { WebsiteConfigEntity } from '../entities/website-config.entity';
import { UpdateWebsiteConfigDto } from './dto/update-website.dto';

@Injectable()
export class WebsiteService {
  private readonly logger = new Logger(WebsiteService.name);
  private readonly redis: Redis;
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor(
    @InjectRepository(WebsiteConfigEntity)
    private readonly repo: Repository<WebsiteConfigEntity>,
    private readonly dataSource: DataSource,
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.redis = new Redis(this.config.get('REDIS_URL', 'redis://localhost:6379'));
  }

  async getConfig(tenantSlug: string): Promise<WebsiteConfigEntity> {
    // Check Redis cache first
    const cacheKey = `website:${tenantSlug}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    // Set tenant schema
    const schema = `tenant_${tenantSlug.replace(/-/g, '_')}`;
    await this.dataSource.query(`SET search_path TO "${schema}"`);

    let config = await this.repo.findOne({ where: {} });
    if (!config) {
      // Create default config
      config = await this.repo.save(this.repo.create(this.getDefaultConfig()));
    }

    await this.dataSource.query('SET search_path TO public');

    // Cache the config
    await this.redis.setex(cacheKey, this.CACHE_TTL, JSON.stringify(config));
    return config;
  }

  async updateConfig(tenantSlug: string, dto: UpdateWebsiteConfigDto): Promise<WebsiteConfigEntity> {
    const schema = `tenant_${tenantSlug.replace(/-/g, '_')}`;
    await this.dataSource.query(`SET search_path TO "${schema}"`);

    let config = await this.repo.findOne({ where: {} });
    if (!config) {
      config = this.repo.create(this.getDefaultConfig());
    }

    Object.assign(config, dto);
    const saved = await this.repo.save(config);

    await this.dataSource.query('SET search_path TO public');

    // Invalidate cache
    await this.redis.del(`website:${tenantSlug}`);

    return saved;
  }

  async updateTheme(tenantSlug: string, themeId: string): Promise<WebsiteConfigEntity> {
    return this.updateConfig(tenantSlug, { themeId: themeId as any });
  }

  /**
   * Publish flow:
   * 1. Validate config has required sections
   * 2. Set published = true
   * 3. Clear ISR cache via Next.js revalidate API
   * 4. Return live URL
   */
  async publish(tenantSlug: string): Promise<{ url: string; publishedAt: Date }> {
    const schema = `tenant_${tenantSlug.replace(/-/g, '_')}`;
    await this.dataSource.query(`SET search_path TO "${schema}"`);

    const config = await this.repo.findOne({ where: {} });
    if (!config) throw new NotFoundException('Website config not found. Create config first.');

    // Validate: must have at least a hero section
    if (!config.sections || config.sections.length === 0) {
      throw new BadRequestException('Cannot publish: add at least one section');
    }

    config.published = true;
    await this.repo.save(config);

    await this.dataSource.query('SET search_path TO public');

    // Invalidate cache
    await this.redis.del(`website:${tenantSlug}`);

    // Trigger ISR revalidation
    await this.triggerRevalidation(tenantSlug);

    // Update tenant's published status
    await this.updateTenantPublished(tenantSlug);

    const url = `https://${tenantSlug}.hamrotourist.com`;
    this.logger.log(`Published: ${url}`);

    return { url, publishedAt: new Date() };
  }

  private async triggerRevalidation(tenantSlug: string): Promise<void> {
    const rendererUrl = this.config.get('RENDERER_URL', 'http://localhost:3001');
    const secret = this.config.get('REVALIDATE_SECRET', 'dev-revalidate-secret');

    try {
      await firstValueFrom(this.httpService.post(`${rendererUrl}/api/revalidate`, {
        secret,
        slug: tenantSlug,
        paths: ['/', '/tours', '/treks', '/activities', '/packages'],
      }));
      this.logger.log(`ISR revalidation triggered for ${tenantSlug}`);
    } catch (err: any) {
      this.logger.warn(`ISR revalidation failed: ${err.message}`);
    }
  }

  private async updateTenantPublished(tenantSlug: string): Promise<void> {
    const tenantServiceUrl = `http://localhost:${this.config.get('TENANT_SERVICE_PORT', 4002)}`;
    try {
      await firstValueFrom(this.httpService.patch(
        `${tenantServiceUrl}/tenants/${tenantSlug}`,
        { published: true, publishedAt: new Date() },
      ));
    } catch (err: any) {
      this.logger.warn(`Could not update tenant published status: ${err.message}`);
    }
  }

  private getDefaultConfig(): Partial<WebsiteConfigEntity> {
    return {
      themeId: 'adventure-bold',
      primaryColor: '#7C3AED',
      secondaryColor: '#06B6D4',
      accentColor: '#F97316',
      headingFont: 'Syne',
      bodyFont: 'DM Sans',
      sections: [
        { id: 'hero', type: 'hero-banner', title: 'Hero Banner', enabled: true, config: { headline: 'Welcome', subtext: 'Discover amazing adventures' }, sortOrder: 0 },
        { id: 'featured', type: 'featured-tours', title: 'Featured Tours', enabled: true, config: { layout: 'grid', count: 6 }, sortOrder: 1 },
        { id: 'regions', type: 'region-showcase', title: 'Destinations', enabled: true, config: { layout: 'grid' }, sortOrder: 2 },
        { id: 'activities', type: 'activity-cards', title: 'Activities', enabled: true, config: { showPricing: true }, sortOrder: 3 },
        { id: 'testimonials', type: 'testimonials', title: 'Testimonials', enabled: false, config: { items: [] }, sortOrder: 4 },
        { id: 'about', type: 'about-us', title: 'About Us', enabled: false, config: {}, sortOrder: 5 },
        { id: 'why-us', type: 'why-choose-us', title: 'Why Choose Us', enabled: false, config: { features: [] }, sortOrder: 6 },
        { id: 'contact', type: 'contact-form', title: 'Contact', enabled: true, config: {}, sortOrder: 7 },
        { id: 'newsletter', type: 'newsletter-signup', title: 'Newsletter', enabled: false, config: {}, sortOrder: 8 },
      ],
      navLinks: [
        { label: 'Tours', href: '/tours', isExternal: false },
        { label: 'Treks', href: '/treks', isExternal: false },
        { label: 'Activities', href: '/activities', isExternal: false },
        { label: 'Packages', href: '/packages', isExternal: false },
        { label: 'Contact', href: '/contact', isExternal: false },
      ],
      footerLinks: [],
      socialLinks: [],
    };
  }
}
