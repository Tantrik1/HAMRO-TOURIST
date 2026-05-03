import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantPlanDto } from './dto/update-tenant-plan.dto';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new tenant (agency)' })
  async create(
    @Body() dto: CreateTenantDto,
    @Headers('x-user-id') xUserId?: string,
  ) {
    const ownerUserId = dto.ownerUserId || xUserId || 'placeholder-user-id';
    const tenant = await this.tenantService.create(dto, ownerUserId);
    return ok(tenant);
  }

  @Get('published')
  @ApiOperation({ summary: 'List all published tenants (for renderer)' })
  async listPublished() {
    const tenants = await this.tenantService.listAllPublished();
    return ok(tenants);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get tenant by slug' })
  async findBySlug(@Param('slug') slug: string) {
    const tenant = await this.tenantService.findBySlug(slug);
    return ok(tenant);
  }

  @Get(':slug/limits')
  @ApiOperation({ summary: 'Get plan limits for tenant' })
  async getLimits(@Param('slug') slug: string) {
    const limits = await this.tenantService.getLimits(slug);
    return ok(limits);
  }

  @Patch(':slug/onboarding')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update onboarding details' })
  async updateOnboarding(@Param('slug') slug: string, @Body() body: any) {
    const tenant = await this.tenantService.updateOnboarding(slug, body);
    return ok(tenant);
  }

  @Patch(':slug/theme')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set active theme for tenant' })
  async setTheme(@Param('slug') slug: string, @Body('themeSlug') themeSlug: string) {
    const tenant = await this.tenantService.setTheme(slug, themeSlug);
    return ok(tenant);
  }

  @Post(':slug/publish')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish tenant website' })
  async publish(@Param('slug') slug: string) {
    const tenant = await this.tenantService.publish(slug);
    return ok(tenant);
  }

  @Patch(':slug/plan')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update tenant plan' })
  async updatePlan(
    @Param('slug') slug: string,
    @Body() dto: UpdateTenantPlanDto,
  ) {
    const tenant = await this.tenantService.updatePlan(slug, dto);
    return ok(tenant);
  }
}
