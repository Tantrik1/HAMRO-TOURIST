import {
  Controller, Get, Post, Patch, Delete, Param, Body, UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CreateCountryDto, UpdateCountryDto } from '../../dto/country.dto';
import { TenantContextInterceptor } from '../../interceptors/tenant-context.interceptor';
import { TenantSlug } from '../../interceptors/tenant-slug.decorator';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Countries')
@ApiHeader({ name: 'x-tenant-slug', required: true })
@UseInterceptors(TenantContextInterceptor)
@Controller('products/countries')
export class CountriesController {
  constructor(private readonly svc: CountriesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create country (plan-limited)' })
  async create(@Body() dto: CreateCountryDto, @TenantSlug() slug: string) {
    return ok(await this.svc.create(dto, slug));
  }

  @Get()
  @ApiOperation({ summary: 'List all countries' })
  async findAll() {
    return ok(await this.svc.findAll());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get country by ID' })
  async findOne(@Param('id') id: string) {
    return ok(await this.svc.findOne(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update country' })
  async update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return ok(await this.svc.update(id, dto));
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete country' })
  async remove(@Param('id') id: string) {
    await this.svc.remove(id);
    return ok({ deleted: true });
  }
}
