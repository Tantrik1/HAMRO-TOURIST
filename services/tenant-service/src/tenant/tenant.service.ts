import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { TenantEntity } from '../entities/tenant.entity';
import { PlanEntity } from '../entities/plan.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantPlanDto } from './dto/update-tenant-plan.dto';
import type { TenantLimits } from '@hamrotourist/shared-types';
import { TenantPlan } from '@hamrotourist/shared-types';

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  /** Reserved slugs that cannot be used as tenant slugs */
  private readonly RESERVED_SLUGS = [
    'app', 'api', 'admin', 'www', 'mail', 'proxy', 'admin-proxy',
    'media', 'cdn', 'static', 'assets', 'blog', 'docs', 'help',
    'support', 'status', 'billing',
  ];

  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepo: Repository<TenantEntity>,
    @InjectRepository(PlanEntity)
    private readonly planRepo: Repository<PlanEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateTenantDto, ownerUserId: string): Promise<TenantEntity> {
    if (this.RESERVED_SLUGS.includes(dto.slug)) {
      throw new ConflictException(`Slug "${dto.slug}" is reserved`);
    }

    const existing = await this.tenantRepo.findOne({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException(`Slug "${dto.slug}" is already taken`);
    }

    // Get free plan
    const freePlan = await this.planRepo.findOne({ where: { name: TenantPlan.FREE } });
    if (!freePlan) {
      throw new NotFoundException('Free plan not configured');
    }

    const schemaName = `tenant_${dto.slug.replace(/-/g, '_')}`;

    // Create tenant record
    const tenant = this.tenantRepo.create({
      slug: dto.slug,
      companyName: dto.companyName,
      planId: freePlan.id,
      schemaName,
      ownerUserId,
    });
    await this.tenantRepo.save(tenant);

    // Provision schema
    await this.provisionSchema(schemaName);

    this.logger.log(`Tenant created: ${dto.slug} (schema: ${schemaName})`);
    return tenant;
  }

  async findBySlug(slug: string): Promise<TenantEntity> {
    const tenant = await this.tenantRepo.findOne({
      where: { slug },
      relations: ['plan'],
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant "${slug}" not found`);
    }
    return tenant;
  }

  async getLimits(slug: string): Promise<TenantLimits> {
    const tenant = await this.tenantRepo.findOne({
      where: { slug },
      relations: ['plan'],
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant "${slug}" not found`);
    }

    const plan = tenant.plan;
    return {
      maxCountries: plan.maxCountries,
      maxRegionsPerCountry: plan.maxRegionsPerCountry,
      maxTeamMembers: plan.maxTeamMembers,
      canUseCustomDomain: plan.canUseCustomDomain,
      canUseCustomHtml: plan.canUseCustomHtml,
      canAccessApi: plan.canAccessApi,
    };
  }

  async updatePlan(slug: string, dto: UpdateTenantPlanDto): Promise<TenantEntity> {
    const tenant = await this.findBySlug(slug);
    const plan = await this.planRepo.findOne({ where: { name: dto.plan } });
    if (!plan) {
      throw new NotFoundException(`Plan "${dto.plan}" not found`);
    }

    tenant.planId = plan.id;
    await this.tenantRepo.save(tenant);

    this.logger.log(`Tenant ${slug} upgraded to ${dto.plan}`);
    return this.findBySlug(slug);
  }

  /**
   * Creates the tenant schema and all required tables.
   * This runs the tenant migration SQL to create geography, product,
   * itinerary, pricing, CRM, and website config tables.
   */
  private async provisionSchema(schemaName: string): Promise<void> {
    const sanitized = schemaName.replace(/[^a-z0-9_]/gi, '_');

    await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${sanitized}"`);

    // Set search path to new schema
    await this.dataSource.query(`SET search_path TO "${sanitized}"`);

    // Create tenant tables
    await this.dataSource.query(`
      -- Geography
      CREATE TABLE IF NOT EXISTS countries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        code VARCHAR(10) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS regions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        cover_image_url VARCHAR(1024),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS idx_regions_country_id ON regions(country_id);

      -- Products
      CREATE TABLE IF NOT EXISTS tours (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        difficulty VARCHAR(20) NOT NULL DEFAULT 'moderate',
        duration_days INT NOT NULL DEFAULT 1,
        cover_image_url VARCHAR(1024),
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        deleted_at TIMESTAMPTZ
      );
      CREATE INDEX IF NOT EXISTS idx_tours_region_id ON tours(region_id);
      CREATE INDEX IF NOT EXISTS idx_tours_status ON tours(status);

      CREATE TABLE IF NOT EXISTS treks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        difficulty VARCHAR(20) NOT NULL DEFAULT 'moderate',
        max_altitude INT,
        cover_image_url VARCHAR(1024),
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        deleted_at TIMESTAMPTZ
      );
      CREATE INDEX IF NOT EXISTS idx_treks_region_id ON treks(region_id);
      CREATE INDEX IF NOT EXISTS idx_treks_status ON treks(status);

      CREATE TABLE IF NOT EXISTS activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        type VARCHAR(100) NOT NULL,
        description TEXT,
        base_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        cover_image_url VARCHAR(1024),
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        deleted_at TIMESTAMPTZ
      );
      CREATE INDEX IF NOT EXISTS idx_activities_region_id ON activities(region_id);

      CREATE TABLE IF NOT EXISTS packages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        cover_image_url VARCHAR(1024),
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        deleted_at TIMESTAMPTZ
      );

      CREATE TABLE IF NOT EXISTS package_regions (
        package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
        region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
        PRIMARY KEY (package_id, region_id)
      );

      -- Activity linking
      CREATE TABLE IF NOT EXISTS tour_activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
        activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
        inclusion_type VARCHAR(20) NOT NULL DEFAULT 'included',
        extra_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        UNIQUE(tour_id, activity_id)
      );

      CREATE TABLE IF NOT EXISTS trek_activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        trek_id UUID NOT NULL REFERENCES treks(id) ON DELETE CASCADE,
        activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
        inclusion_type VARCHAR(20) NOT NULL DEFAULT 'included',
        extra_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        UNIQUE(trek_id, activity_id)
      );

      -- Itineraries & Pricing
      CREATE TABLE IF NOT EXISTS itineraries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        parent_id UUID NOT NULL,
        parent_type VARCHAR(20) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        total_days INT NOT NULL DEFAULT 1,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS idx_itineraries_parent ON itineraries(parent_id, parent_type);

      CREATE TABLE IF NOT EXISTS itinerary_days (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
        day_number INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        accommodation VARCHAR(255),
        meals VARCHAR(255)
      );
      CREATE INDEX IF NOT EXISTS idx_itinerary_days_itinerary_id ON itinerary_days(itinerary_id);

      CREATE TABLE IF NOT EXISTS itinerary_pricing (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
        label VARCHAR(255) NOT NULL,
        base_price DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'USD',
        valid_from DATE,
        valid_to DATE
      );
      CREATE INDEX IF NOT EXISTS idx_itinerary_pricing_itinerary_id ON itinerary_pricing(itinerary_id);

      CREATE TABLE IF NOT EXISTS group_discounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        pricing_id UUID NOT NULL REFERENCES itinerary_pricing(id) ON DELETE CASCADE,
        min_pax INT NOT NULL,
        max_pax INT NOT NULL,
        discount_type VARCHAR(20) NOT NULL,
        discount_value DECIMAL(10, 2) NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_group_discounts_pricing_id ON group_discounts(pricing_id);

      -- Package-specific itineraries
      CREATE TABLE IF NOT EXISTS package_itineraries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        total_days INT NOT NULL DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS package_itinerary_days (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        package_itinerary_id UUID NOT NULL REFERENCES package_itineraries(id) ON DELETE CASCADE,
        day_number INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS package_pricing (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        package_itinerary_id UUID NOT NULL REFERENCES package_itineraries(id) ON DELETE CASCADE,
        label VARCHAR(255) NOT NULL,
        base_price DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'USD'
      );

      -- CRM
      CREATE TABLE IF NOT EXISTS crm_contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        source VARCHAR(100),
        tags TEXT[] DEFAULT '{}',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS crm_leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        value DECIMAL(10, 2),
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS idx_crm_leads_contact_id ON crm_leads(contact_id);
      CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON crm_leads(status);

      CREATE TABLE IF NOT EXISTS crm_notes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- Website config (stored per tenant for easy access)
      CREATE TABLE IF NOT EXISTS website_configs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        theme_id VARCHAR(50) NOT NULL DEFAULT 'adventure-bold',
        seo_title VARCHAR(255),
        seo_description TEXT,
        favicon_url VARCHAR(1024),
        primary_color VARCHAR(20) DEFAULT '#7C3AED',
        secondary_color VARCHAR(20) DEFAULT '#06B6D4',
        accent_color VARCHAR(20) DEFAULT '#F97316',
        heading_font VARCHAR(100) DEFAULT 'Syne',
        body_font VARCHAR(100) DEFAULT 'DM Sans',
        sections JSONB NOT NULL DEFAULT '[]',
        nav_links JSONB NOT NULL DEFAULT '[]',
        footer_links JSONB NOT NULL DEFAULT '[]',
        social_links JSONB NOT NULL DEFAULT '[]',
        published BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Create booking tables in tenant schema
    await this.dataSource.query(`
      DO $$ BEGIN CREATE TYPE booking_status AS ENUM ('inquiry','confirmed','deposit_paid','fully_paid','completed','cancelled','refunded'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
      DO $$ BEGIN CREATE TYPE booking_item_type AS ENUM ('tour','trek','activity','package'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
      DO $$ BEGIN CREATE TYPE booking_payment_method AS ENUM ('stripe','esewa','khalti','bank_transfer'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
      DO $$ BEGIN CREATE TYPE booking_payment_status AS ENUM ('pending','completed','failed','refunded'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_number VARCHAR(30) NOT NULL UNIQUE,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        status booking_status NOT NULL DEFAULT 'inquiry',
        total_amount DECIMAL(12, 2) NOT NULL,
        paid_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
        currency VARCHAR(10) NOT NULL DEFAULT 'USD',
        travel_date DATE NOT NULL,
        number_of_travelers INT NOT NULL DEFAULT 1,
        special_requests TEXT,
        assigned_to UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        deleted_at TIMESTAMPTZ
      );
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);

      CREATE TABLE IF NOT EXISTS booking_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        item_type booking_item_type NOT NULL,
        item_id UUID NOT NULL,
        item_title VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        unit_price DECIMAL(12, 2) NOT NULL,
        total_price DECIMAL(12, 2) NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_booking_items_booking_id ON booking_items(booking_id);

      CREATE TABLE IF NOT EXISTS booking_payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        method booking_payment_method NOT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'USD',
        status booking_payment_status NOT NULL DEFAULT 'pending',
        transaction_id VARCHAR(255),
        gateway_response JSONB,
        paid_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS idx_booking_payments_booking_id ON booking_payments(booking_id);
    `);

    // Reset search path
    await this.dataSource.query(`SET search_path TO public`);

    this.logger.log(`Schema provisioned: ${sanitized}`);
  }
}
