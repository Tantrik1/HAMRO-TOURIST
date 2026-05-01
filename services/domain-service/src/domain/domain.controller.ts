import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { DomainService } from './domain.service';
import { CreateDomainDto } from '../dto/create-domain.dto';

function ok<T>(data: T) {
  return { success: true, data };
}

@Controller('domains')
export class DomainController {
  constructor(private domainService: DomainService) {}

  @Post()
  async submit(@Body() dto: CreateDomainDto) {
    return ok(await this.domainService.submitDomain(dto));
  }

  @Get('tenant/:tenantSlug')
  async getByTenant(@Param('tenantSlug') tenantSlug: string) {
    return ok(await this.domainService.getDomainsByTenant(tenantSlug));
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return ok(await this.domainService.getDomain(id));
  }

  @Get(':id/verify')
  async verify(@Param('id') id: string) {
    return ok(await this.domainService.checkVerification(id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.domainService.deleteDomain(id);
    return ok({ deleted: true });
  }
}
