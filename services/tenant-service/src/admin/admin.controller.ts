import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { PlatformAdminGuard } from './guards/platform-admin.guard';
import {
  ListTenantsQueryDto,
  ListUsersQueryDto,
  ListAuditLogsQueryDto,
  UpsertSettingDto,
} from './dto/admin.dto';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Platform Admin')
@ApiBearerAuth()
@UseGuards(PlatformAdminGuard)
@Controller('tenants/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ── Stats ──

  @Get('stats')
  @ApiOperation({ summary: 'Get platform-wide stats' })
  async getStats() {
    return ok(await this.adminService.getPlatformStats());
  }

  // ── Tenants ──

  @Get('tenants')
  @ApiOperation({ summary: 'List all tenants with search/filter' })
  async listTenants(@Query() query: ListTenantsQueryDto) {
    const result = await this.adminService.listTenants(query);
    return ok(result.data, result.meta);
  }

  @Patch('tenants/:slug/suspend')
  @ApiOperation({ summary: 'Suspend a tenant' })
  async suspendTenant(
    @Param('slug') slug: string,
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-email') actorEmail: string,
  ) {
    return ok(await this.adminService.suspendTenant(slug, actorId, actorEmail));
  }

  @Patch('tenants/:slug/activate')
  @ApiOperation({ summary: 'Activate a suspended tenant' })
  async activateTenant(
    @Param('slug') slug: string,
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-email') actorEmail: string,
  ) {
    return ok(await this.adminService.activateTenant(slug, actorId, actorEmail));
  }

  @Delete('tenants/:slug')
  @ApiOperation({ summary: 'Soft-delete a tenant' })
  async deleteTenant(
    @Param('slug') slug: string,
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-email') actorEmail: string,
  ) {
    return ok(await this.adminService.deleteTenant(slug, actorId, actorEmail));
  }

  // ── Users ──

  @Get('users')
  @ApiOperation({ summary: 'List all platform users' })
  async listUsers(@Query() query: ListUsersQueryDto) {
    const result = await this.adminService.listUsers(query);
    return ok(result.data, result.meta);
  }

  @Patch('users/:id/ban')
  @ApiOperation({ summary: 'Ban a user (soft-delete)' })
  async banUser(
    @Param('id') userId: string,
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-email') actorEmail: string,
  ) {
    return ok(await this.adminService.banUser(userId, actorId, actorEmail));
  }

  @Patch('users/:id/unban')
  @ApiOperation({ summary: 'Unban a user (restore soft-delete)' })
  async unbanUser(
    @Param('id') userId: string,
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-email') actorEmail: string,
  ) {
    return ok(await this.adminService.unbanUser(userId, actorId, actorEmail));
  }

  // ── Bookings (cross-tenant) ──

  @Get('bookings')
  @ApiOperation({ summary: 'List bookings across all tenants' })
  async listBookings(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    const result = await this.adminService.listBookings(
      Number(page) || 1,
      Number(limit) || 20,
      status || undefined,
    );
    return ok(result.data, result.meta);
  }

  // ── Audit Logs ──

  @Get('audit-logs')
  @ApiOperation({ summary: 'List audit logs' })
  async listAuditLogs(@Query() query: ListAuditLogsQueryDto) {
    const result = await this.adminService.listAuditLogs(query);
    return ok(result.data, result.meta);
  }

  // ── System Settings ──

  @Get('settings')
  @ApiOperation({ summary: 'List all system settings' })
  async listSettings() {
    return ok(await this.adminService.listSettings());
  }

  @Post('settings')
  @ApiOperation({ summary: 'Create or update a system setting' })
  async upsertSetting(
    @Body() dto: UpsertSettingDto,
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-email') actorEmail: string,
  ) {
    return ok(await this.adminService.upsertSetting(dto, actorId, actorEmail));
  }

  @Delete('settings/:key')
  @ApiOperation({ summary: 'Delete a system setting' })
  async deleteSetting(
    @Param('key') key: string,
    @Headers('x-user-id') actorId: string,
    @Headers('x-user-email') actorEmail: string,
  ) {
    return ok(await this.adminService.deleteSetting(key, actorId, actorEmail));
  }
}
