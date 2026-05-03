import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateCheckoutDto, ChangePlanDto, CreatePortalDto } from './dto/checkout.dto';

function ok<T>(data: T) {
  return { success: true, data };
}

@Controller('billing')
export class BillingController {
  constructor(private service: BillingService) {}

  @Post('checkout')
  async createCheckout(@Body() dto: CreateCheckoutDto) {
    const result = await this.service.createCheckoutSession(
      dto.tenantSlug, dto.plan, dto.email, dto.companyName,
    );
    return ok(result);
  }

  @Post('portal')
  async createPortal(@Body() dto: CreatePortalDto) {
    return ok(await this.service.createPortalSession(dto.tenantSlug));
  }

  @Get('subscription/:tenantSlug')
  async getSubscription(@Param('tenantSlug') tenantSlug: string) {
    return ok(await this.service.getSubscription(tenantSlug));
  }

  @Patch('subscription/:tenantSlug/plan')
  async changePlan(@Param('tenantSlug') tenantSlug: string, @Body() dto: ChangePlanDto) {
    return ok(await this.service.changePlan(tenantSlug, dto.plan));
  }

  @Delete('subscription/:tenantSlug')
  async cancel(@Param('tenantSlug') tenantSlug: string) {
    return ok(await this.service.cancelSubscription(tenantSlug));
  }

  @Post('subscription/:tenantSlug/resume')
  async resume(@Param('tenantSlug') tenantSlug: string) {
    return ok(await this.service.resumeSubscription(tenantSlug));
  }
}
