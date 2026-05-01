import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ItinerariesService } from './itineraries.service';
import { CreateItineraryDto, UpdateItineraryDto } from '../../dto/itinerary.dto';
import { CalculatePriceDto } from '../../dto/pricing-calculator.dto';
import { TenantContextInterceptor } from '../../interceptors/tenant-context.interceptor';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Itineraries & Pricing')
@ApiHeader({ name: 'x-tenant-slug', required: true })
@UseInterceptors(TenantContextInterceptor)
@Controller('products/itineraries')
export class ItinerariesController {
  constructor(private readonly svc: ItinerariesService) {}

  @Post() @ApiBearerAuth() @ApiOperation({ summary: 'Create itinerary with days and pricing tiers' })
  async create(@Body() dto: CreateItineraryDto) { return ok(await this.svc.create(dto)); }

  @Get() @ApiOperation({ summary: 'Get itineraries by parent (tour/trek/package)' })
  async findByParent(@Query('parentId') parentId: string, @Query('parentType') parentType: string) {
    return ok(await this.svc.findByParent(parentId, parentType));
  }

  @Get(':id') async findOne(@Param('id') id: string) { return ok(await this.svc.findOne(id)); }

  @Patch(':id') @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdateItineraryDto) { return ok(await this.svc.update(id, dto)); }

  @Delete(':id') @ApiBearerAuth()
  async remove(@Param('id') id: string) { await this.svc.remove(id); return ok({ deleted: true }); }

  @Post('calculate-price') @ApiOperation({ summary: 'Calculate checkout price (server-side)' })
  async calculatePrice(@Body() dto: CalculatePriceDto) { return ok(await this.svc.calculatePrice(dto)); }
}
