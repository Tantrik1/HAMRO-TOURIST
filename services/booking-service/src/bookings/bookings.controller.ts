import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingStatusDto } from '../dto/update-booking-status.dto';
import { TenantContextInterceptor } from '../interceptors/tenant-context.interceptor';
import { BookingStatus } from '../entities/booking.entity';

function ok<T>(data: T, meta?: any) {
  return { success: true, data, ...(meta && { meta }) };
}

@ApiTags('Bookings')
@Controller('bookings')
@UseInterceptors(TenantContextInterceptor)
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking inquiry' })
  async create(@Body() dto: CreateBookingDto) {
    return ok(await this.service.create(dto));
  }

  @Get()
  @ApiOperation({ summary: 'List bookings with filters and pagination' })
  async findAll(
    @Query('status') status?: BookingStatus,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.service.findAll({
      status,
      dateFrom,
      dateTo,
      search,
      page: Number(page) || 1,
      limit: Number(limit) || 20,
    });
    return ok(result.data, result.meta);
  }

  @Get('stats/summary')
  @ApiOperation({ summary: 'Get booking statistics summary' })
  async getStats() {
    return ok(await this.service.getStats());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking details by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return ok(await this.service.findOne(id));
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update booking status' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return ok(await this.service.updateStatus(id, dto.status));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a booking' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.remove(id);
    return ok({ deleted: true });
  }
}
