import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto, UpdateLeadStatusDto } from '../dto/lead.dto';
import { PaginationQueryDto } from '../dto/pagination.query.dto';
import { TenantContextInterceptor } from '../interceptors/tenant-context.interceptor';

function ok<T>(data: T, meta?: any) {
  return { success: true, data, ...(meta && { meta }) };
}

@Controller('crm/leads')
@UseInterceptors(TenantContextInterceptor)
export class LeadsController {
  constructor(private service: LeadsService) {}

  @Post()
  async create(@Body() dto: CreateLeadDto) {
    return ok(await this.service.create(dto));
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('contactId') contactId?: string,
    @Query(new ValidationPipe({ transform: true })) pagination?: PaginationQueryDto,
  ) {
    // ✅ VALIDATED: Pagination parameters are validated via DTO
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 20;
    const result = await this.service.findAll(status, contactId, page, limit);
    return ok(result.data, result.meta);
  }

  @Get('pipeline/summary')
  async pipelineSummary() {
    return ok(await this.service.getPipelineSummary());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return ok(await this.service.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return ok(await this.service.update(id, dto));
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateLeadStatusDto) {
    return ok(await this.service.updateStatus(id, dto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return ok({ deleted: true });
  }
}
