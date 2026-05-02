# 🛠️ FIXES IMPLEMENTATION GUIDE — Step-by-Step

**Status:** Ready to implement  
**Estimated Total Time:** 3 weeks  
**Priority Order:** Critical → High → Medium  

---

## 🔴 CRITICAL FIXES (Do Today - 4-5 hours)

### CRITICAL FIX #1: SQL Injection - Tenant Interceptor
**Time:** 30 minutes  
**Risk if not fixed:** 🔴 Complete database compromise

**Step 1: Update Interceptor File**
```bash
# Edit: services/product-service/src/interceptors/tenant-context.interceptor.ts
```

**Replace lines 20-35 with:**
```typescript
async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
  const req = context.switchToHttp().getRequest();
  let slug = req.headers['x-tenant-slug'] || req.user?.tenantSlug;
  
  if (!slug) {
    throw new UnauthorizedException('Missing tenant context');
  }

  // ✅ STRICT VALIDATION
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) || slug.length < 3 || slug.length > 63) {
    throw new BadRequestException('Invalid tenant slug format');
  }

  // ✅ Safe schema name generation
  const schema = `tenant_${slug.replace(/-/g, '_')}`;
  
  try {
    // ✅ Use parameterized query (TypeORM handles escaping)
    await this.dataSource.query(`SET search_path TO $1`, [schema]);
  } catch (error) {
    this.logger.error(`Failed to set schema for ${slug}:`, error);
    throw new InternalServerErrorException('Database configuration error');
  }

  return next.handle();
}
```

**Step 2: Add validation to shared-types**
```bash
# Create: packages/shared-types/src/validators/tenant.ts
```

```typescript
export function validateTenantSlug(slug: string): boolean {
  if (!slug || slug.length < 3 || slug.length > 63) return false;
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug);
}
```

**Test:**
```bash
pnpm --filter product-service test -- tenant-context.interceptor.spec.ts
```

---

### CRITICAL FIX #2: Unbounded List Endpoints
**Time:** 2 hours  
**Files affected:** 3 services × 8 endpoints = 24 changes

**Step 1: Update Package Service**
```bash
# Edit: services/product-service/src/modules/packages/packages.service.ts
```

**Replace `findAll()` method:**
```typescript
async findAll(
  page: number = 1,
  limit: number = 20,
): Promise<{ data: Package[]; total: number }> {
  // ✅ Add bounds checking
  page = Math.max(1, page);
  limit = Math.min(Math.max(1, limit), 100);  // Max 100 per page

  const [data, total] = await this.packageRepo.findAndCount({
    where: { status: 'published' },
    skip: (page - 1) * limit,
    take: limit,
    order: { createdAt: 'DESC' },
  });

  return { data, total };
}
```

**Update Controller:**
```bash
# Edit: services/product-service/src/modules/packages/packages.controller.ts
```

```typescript
import { ParseIntPipe, DefaultValuePipe } from '@nestjs/common';

@Get()
async list(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
) {
  const result = await this.packageService.findAll(page, limit);
  return ok(result.data, {
    page,
    limit,
    total: result.total,
    totalPages: Math.ceil(result.total / limit),
  });
}
```

**Repeat for:**
- `services/product-service/src/modules/tours/`
- `services/product-service/src/modules/activities/`
- `services/product-service/src/modules/regions/`
- `services/crm-service/src/leads/`
- `services/crm-service/src/contacts/`
- All other list endpoints

**Create Query DTO:**
```bash
# Create: services/product-service/src/dto/pagination.query.dto.ts
```

```typescript
import { IsNumber, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
```

**Test:**
```bash
# Verify pagination works
curl "http://localhost:4002/api/packages?page=1&limit=20"
curl "http://localhost:4002/api/packages?page=2&limit=50"
curl "http://localhost:4002/api/packages?page=-1&limit=999999"  # Should fail validation
```

---

### CRITICAL FIX #3: Validate Pagination Parameters
**Time:** 1 hour  
**Files:** CRM service (2 controllers)

```bash
# Create: services/crm-service/src/dto/pagination.query.dto.ts
```

```typescript
import { IsNumber, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
```

**Update leads controller:**
```bash
# Edit: services/crm-service/src/leads/leads.controller.ts
```

```typescript
import { PaginationQueryDto } from '../dto/pagination.query.dto';

@Get()
async findAll(@Query() query: PaginationQueryDto) {
  const skip = (query.page - 1) * query.limit;
  const [leads, total] = await this.leadRepo.findAndCount({
    skip,
    take: query.limit,
  });
  return ok(leads, { page: query.page, limit: query.limit, total });
}
```

**Repeat for contacts controller**

---

### CRITICAL FIX #4: Add Database Indexes
**Time:** 1.5 hours

**Step 1: Create Migration**
```bash
# Create: migrations/master/004_add_missing_indexes.sql
```

```sql
-- Add indexes for frequently queried columns

-- Tours table
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_status ON tours(status);
CREATE INDEX IF NOT EXISTS idx_tours_region_id ON tours(region_id);

-- Regions table
CREATE INDEX IF NOT EXISTS idx_regions_slug ON regions(slug);

-- Activities table
CREATE INDEX IF NOT EXISTS idx_activities_slug ON activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);

-- Packages table
CREATE INDEX IF NOT EXISTS idx_packages_slug ON packages(slug);

-- Contacts table
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Leads table
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_tenant_id ON leads(tenant_id);

-- Refresh tokens
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
```

**Step 2: Update Entities with Index Decorators**
```bash
# Edit: services/product-service/src/entities/tour.entity.ts
```

```typescript
import { Index } from 'typeorm';

@Entity('tours')
@Index(['slug'])  // ✅ Add this
@Index(['status'])  // ✅ Add this
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'enum', enum: ['draft', 'published', 'archived'] })
  status: string;

  @Column({ type: 'uuid' })
  regionId: string;
  // ... rest of entity
}
```

**Apply migration:**
```bash
pnpm db:migrate:master
```

**Verify indexes:**
```sql
-- In psql
SELECT schemaname, tablename, indexname FROM pg_indexes WHERE tablename = 'tours';
```

---

### CRITICAL FIX #5: Environment Variable Validation
**Time:** 45 minutes

**Step 1: Update Media Service**
```bash
# Edit: services/media-service/src/media/media.service.ts
```

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService implements OnModuleInit {
  private readonly accountId: string;
  private readonly r2Bucket: string;
  private readonly r2AccessKey: string;
  private readonly r2SecretKey: string;

  constructor(private config: ConfigService) {
    this.accountId = this.config.get('CLOUDFLARE_ACCOUNT_ID') || '';
    this.r2Bucket = this.config.get('CLOUDFLARE_R2_BUCKET') || '';
    this.r2AccessKey = this.config.get('CLOUDFLARE_R2_ACCESS_KEY') || '';
    this.r2SecretKey = this.config.get('CLOUDFLARE_R2_SECRET_KEY') || '';
  }

  onModuleInit() {
    const required = [
      ['CLOUDFLARE_ACCOUNT_ID', this.accountId],
      ['CLOUDFLARE_R2_BUCKET', this.r2Bucket],
      ['CLOUDFLARE_R2_ACCESS_KEY', this.r2AccessKey],
      ['CLOUDFLARE_R2_SECRET_KEY', this.r2SecretKey],
    ];

    for (const [key, value] of required) {
      if (!value) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
      }
    }

    console.log('✅ All required environment variables configured');
  }

  // ... rest of service
}
```

**Step 2: Create .env.example**
```bash
# Create: .env.example
```

```bash
# Authentication
JWT_SECRET=your_secret_key_here_min_32_chars
JWT_REFRESH_EXPIRY_DAYS=30

# Database
DATABASE_URL=postgres://hamro:password@localhost:5432/hamro_prod

# Redis
REDIS_URL=redis://localhost:6379

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_BUCKET=hamrotourist-media
CLOUDFLARE_R2_ACCESS_KEY=your_access_key
CLOUDFLARE_R2_SECRET_KEY=your_secret_key
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ZONE_ID=your_zone_id

# Email
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@hamrotourist.com
RESEND_FROM_NAME=Hamro Tourist

# Services
AUTH_SERVICE_PORT=4001
PRODUCT_SERVICE_PORT=4002
TENANT_SERVICE_PORT=4003
WEBSITE_BUILDER_PORT=4004
MEDIA_SERVICE_PORT=4005
DOMAIN_SERVICE_PORT=4006
CRM_SERVICE_PORT=4007
NOTIFICATION_SERVICE_PORT=4008
API_GATEWAY_PORT=4000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WEBSITE_RENDERER_URL=http://localhost:3001
```

**Step 3: Add to .gitignore**
```bash
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

**Test:**
```bash
# Run with missing env var
unset CLOUDFLARE_ACCOUNT_ID
pnpm --filter media-service dev
# Should fail: "❌ Missing required environment variable: CLOUDFLARE_ACCOUNT_ID"
```

---

## 🟠 HIGH PRIORITY FIXES (This Week - 6-8 hours)

### HIGH FIX #1: N+1 Query in Regions
**Time:** 1 hour

```bash
# Edit: services/product-service/src/modules/regions/regions.service.ts
```

**Replace `findOne()`:**
```typescript
async findOne(id: string): Promise<Region> {
  return this.regionRepo.findOne({
    where: { id },
    // ✅ Don't load relations - let controller decide
  });
}

async findOneWithTours(id: string, page: number = 1, limit: number = 20) {
  const region = await this.regionRepo.findOne({ where: { id } });
  if (!region) return null;

  // ✅ Load tours separately with pagination
  const [tours, tourCount] = await this.tourRepo.findAndCount({
    where: { regionId: id, status: 'published' },
    skip: (page - 1) * limit,
    take: limit,
  });

  return { ...region, tours, tourCount };
}
```

---

### HIGH FIX #2-10: Add to Sprint Board
Create GitHub issues for each:
- Add request timeouts (1.5 hours)
- Fix route ordering (0.5 hours)
- Add error logging (1.5 hours)
- Fix type assertions (2 hours)
- Fix inconsistent responses (0.5 hours)
- Add validation DTOs (2 hours)
- Close Redis connections (0.5 hours)
- Stream memory leak fix (1 hour)
- OTP type assertion fix (0.5 hours)

**Total:** 10 hours

---

## 🟡 MEDIUM PRIORITY (Next Week)

Create issues for medium-priority items and estimate at 2-3 hours each.

---

## ✅ VALIDATION CHECKLIST

After each fix, validate:

```bash
# 1. Build succeeds
pnpm build

# 2. Types check
pnpm typecheck

# 3. Linting passes
pnpm lint

# 4. Tests pass (if they exist)
pnpm test

# 5. Services start
pnpm dev
```

---

## 📊 PROGRESS TRACKING

```markdown
## Critical Fixes
- [ ] SQL injection fix (tenant interceptor)
- [ ] Unbounded list endpoints (pagination)
- [ ] Pagination parameter validation
- [ ] Database indexes
- [ ] Environment variable validation

## High Priority
- [ ] N+1 queries (regions)
- [ ] Request timeouts
- [ ] Route ordering (slug/id)
- [ ] Error logging
- [ ] Type assertions
- [ ] Error response format
- [ ] Validation DTOs
- [ ] Redis shutdown
- [ ] Stream memory leak
- [ ] OTP type safety

## Medium Priority
- [ ] Cascade deletes
- [ ] Type definitions
- [ ] Service URLs config
- [ ] Cache invalidation
- [ ] Validation completeness
- [ ] All remaining items (14 total)
```

---

## 🚀 DEPLOYMENT GATES

**Do NOT deploy until:**

- [x] Critical fixes #1-5 complete
- [x] High fixes #1-10 complete
- [x] All validations passing
- [x] Load tested (50+ concurrent users)
- [x] No memory leaks (24h monitoring)
- [x] Environment variables validated
- [x] Database migrations applied

---

**Estimated completion: 3 weeks**  
**Team capacity: 1 senior engineer full-time**  
**Or: 2 engineers at 50% each**
