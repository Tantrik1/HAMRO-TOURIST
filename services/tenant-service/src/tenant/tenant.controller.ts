import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
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
  async create(@Body() dto: CreateTenantDto) {
    // In production, ownerUserId comes from JWT. For now, accept from header.
    const tenant = await this.tenantService.create(dto, 'placeholder-user-id');
    return ok(tenant);
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
