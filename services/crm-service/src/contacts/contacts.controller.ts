import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseInterceptors } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from '../dto/contact.dto';
import { TenantContextInterceptor } from '../interceptors/tenant-context.interceptor';

function ok<T>(data: T, meta?: any) {
  return { success: true, data, ...(meta && { meta }) };
}

@Controller('crm/contacts')
@UseInterceptors(TenantContextInterceptor)
export class ContactsController {
  constructor(private service: ContactsService) {}

  @Post()
  async create(@Body() dto: CreateContactDto) {
    return ok(await this.service.create(dto));
  }

  @Get()
  async findAll(@Query('search') search?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
    const result = await this.service.findAll(search, Number(page) || 1, Number(limit) || 20);
    return ok(result.data, result.meta);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return ok(await this.service.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return ok(await this.service.update(id, dto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return ok({ deleted: true });
  }
}
