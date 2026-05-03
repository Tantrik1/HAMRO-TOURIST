import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ILike } from 'typeorm';
import { TenantEntity } from '../entities/tenant.entity';
import { PlanEntity } from '../entities/plan.entity';
import { SystemSettingEntity } from '../entities/system-setting.entity';
import { AuditLogEntity } from '../entities/audit-log.entity';
import { TenantStatus } from '@hamrotourist/shared-types';
import {
  ListTenantsQueryDto,
  ListUsersQueryDto,
  ListAuditLogsQueryDto,
  UpsertSettingDto,
} from './dto/admin.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepo: Repository<TenantEntity>,
    @InjectRepository(PlanEntity)
    private readonly planRepo: Repository<PlanEntity>,
    @InjectRepository(SystemSettingEntity)
    private readonly settingRepo: Repository<SystemSettingEntity>,
    @InjectRepository(AuditLogEntity)
    private readonly auditRepo: Repository<AuditLogEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // ── Platform Stats ──

  async getPlatformStats() {
    const totalTenants = await this.tenantRepo.count();
    const activeTenants = await this.tenantRepo.count({ where: { status: TenantStatus.ACTIVE } });
    const suspendedTenants = await this.tenantRepo.count({ where: { status: TenantStatus.SUSPENDED } });
    const publishedTenants = await this.tenantRepo.count({ where: { published: true } });

    // User counts from auth-service DB (same DB, public schema)
    const userCountResult = await this.dataSource.query(
      `SELECT COUNT(*) as total FROM public.users WHERE deleted_at IS NULL`,
    );
    const totalUsers = parseInt(userCountResult[0]?.total || '0', 10);

    // Plan breakdown
    const planBreakdown = await this.tenantRepo
      .createQueryBuilder('t')
      .innerJoin('t.plan', 'p')
      .select('p.name', 'plan')
      .addSelect('COUNT(t.id)', 'count')
      .groupBy('p.name')
      .getRawMany();

    // Recent signups (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentSignups = await this.tenantRepo
      .createQueryBuilder('t')
      .where('t.createdAt >= :since', { since: thirtyDaysAgo })
      .getCount();

    return {
      totalTenants,
      activeTenants,
      suspendedTenants,
      publishedTenants,
      totalUsers,
      recentSignups,
      planBreakdown: planBreakdown.map((r) => ({
        plan: r.plan,
        count: parseInt(r.count, 10),
      })),
    };
  }

  // ── Tenants ──

  async listTenants(query: ListTenantsQueryDto) {
    const { page = 1, limit = 20, search, status, plan } = query;

    const qb = this.tenantRepo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.plan', 'p')
      .orderBy('t.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      qb.andWhere(
        '(t.slug ILIKE :s OR t.companyName ILIKE :s)',
        { s: `%${search}%` },
      );
    }
    if (status) {
      qb.andWhere('t.status = :status', { status });
    }
    if (plan) {
      qb.andWhere('p.name = :plan', { plan });
    }

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async suspendTenant(slug: string, actorId: string, actorEmail: string) {
    const tenant = await this.tenantRepo.findOne({ where: { slug } });
    if (!tenant) throw new NotFoundException(`Tenant "${slug}" not found`);

    tenant.status = TenantStatus.SUSPENDED;
    await this.tenantRepo.save(tenant);

    await this.logAudit(actorId, actorEmail, 'tenant.suspend', 'tenant', tenant.id, { slug });
    this.logger.warn(`Tenant suspended: ${slug} by ${actorEmail}`);
    return tenant;
  }

  async activateTenant(slug: string, actorId: string, actorEmail: string) {
    const tenant = await this.tenantRepo.findOne({ where: { slug } });
    if (!tenant) throw new NotFoundException(`Tenant "${slug}" not found`);

    tenant.status = TenantStatus.ACTIVE;
    await this.tenantRepo.save(tenant);

    await this.logAudit(actorId, actorEmail, 'tenant.activate', 'tenant', tenant.id, { slug });
    this.logger.log(`Tenant activated: ${slug} by ${actorEmail}`);
    return tenant;
  }

  async deleteTenant(slug: string, actorId: string, actorEmail: string) {
    const tenant = await this.tenantRepo.findOne({ where: { slug } });
    if (!tenant) throw new NotFoundException(`Tenant "${slug}" not found`);

    tenant.status = TenantStatus.DELETED;
    await this.tenantRepo.save(tenant);

    await this.logAudit(actorId, actorEmail, 'tenant.delete', 'tenant', tenant.id, { slug });
    this.logger.warn(`Tenant marked deleted: ${slug} by ${actorEmail}`);
    return tenant;
  }

  // ── Users (querying the shared users table) ──

  async listUsers(query: ListUsersQueryDto) {
    const { page = 1, limit = 20, search } = query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE u.deleted_at IS NULL';
    const params: any[] = [];

    if (search) {
      params.push(`%${search}%`);
      whereClause += ` AND (u.email ILIKE $${params.length} OR u.first_name ILIKE $${params.length} OR u.last_name ILIKE $${params.length})`;
    }

    const countResult = await this.dataSource.query(
      `SELECT COUNT(*) as total FROM public.users u ${whereClause}`,
      params,
    );
    const total = parseInt(countResult[0]?.total || '0', 10);

    const rawData = await this.dataSource.query(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.tenant_slug,
              u.is_email_verified, u.created_at, u.updated_at,
              CASE WHEN u.deleted_at IS NOT NULL THEN true ELSE false END as is_banned
       FROM public.users u ${whereClause}
       ORDER BY u.created_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset],
    );

    const data = rawData.map((u: any) => ({
      id: u.id,
      email: u.email,
      firstName: u.first_name,
      lastName: u.last_name,
      role: u.role,
      tenantSlug: u.tenant_slug,
      isEmailVerified: u.is_email_verified,
      isBanned: u.is_banned,
      createdAt: u.created_at,
    }));

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async banUser(userId: string, actorId: string, actorEmail: string) {
    await this.dataSource.query(
      `UPDATE public.users SET deleted_at = now() WHERE id = $1`,
      [userId],
    );
    await this.logAudit(actorId, actorEmail, 'user.ban', 'user', userId);
    this.logger.warn(`User banned: ${userId} by ${actorEmail}`);
    return { banned: true };
  }

  async unbanUser(userId: string, actorId: string, actorEmail: string) {
    await this.dataSource.query(
      `UPDATE public.users SET deleted_at = NULL WHERE id = $1`,
      [userId],
    );
    await this.logAudit(actorId, actorEmail, 'user.unban', 'user', userId);
    this.logger.log(`User unbanned: ${userId} by ${actorEmail}`);
    return { unbanned: true };
  }

  // ── Audit Logs ──

  async listAuditLogs(query: ListAuditLogsQueryDto) {
    const { page = 1, limit = 50, action, resourceType, actorId } = query;

    const qb = this.auditRepo
      .createQueryBuilder('log')
      .orderBy('log.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (action) qb.andWhere('log.action = :action', { action });
    if (resourceType) qb.andWhere('log.resourceType = :resourceType', { resourceType });
    if (actorId) qb.andWhere('log.actorId = :actorId', { actorId });

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // ── System Settings ──

  async listSettings() {
    return this.settingRepo.find({ order: { key: 'ASC' } });
  }

  async upsertSetting(dto: UpsertSettingDto, actorId: string, actorEmail: string) {
    let setting = await this.settingRepo.findOne({ where: { key: dto.key } });

    if (setting) {
      setting.value = dto.value;
      if (dto.description !== undefined) setting.description = dto.description;
    } else {
      setting = this.settingRepo.create({
        key: dto.key,
        value: dto.value,
        description: dto.description || null,
      });
    }

    await this.settingRepo.save(setting);
    await this.logAudit(actorId, actorEmail, 'setting.upsert', 'system_setting', setting.id, {
      key: dto.key,
      value: dto.value,
    });

    return setting;
  }

  async deleteSetting(key: string, actorId: string, actorEmail: string) {
    const setting = await this.settingRepo.findOne({ where: { key } });
    if (!setting) throw new NotFoundException(`Setting "${key}" not found`);

    await this.settingRepo.remove(setting);
    await this.logAudit(actorId, actorEmail, 'setting.delete', 'system_setting', setting.id, { key });
    return { deleted: true };
  }

  // ── Cross-Tenant Bookings ──

  async listBookings(page = 1, limit = 20, status?: string) {
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let whereClause = '';

    if (status) {
      params.push(status);
      whereClause = `WHERE b.status = $${params.length}`;
    }

    // Query all tenant schemas for bookings
    const tenants = await this.tenantRepo.find({
      where: { status: TenantStatus.ACTIVE },
      select: ['slug', 'schemaName'],
    });

    const allBookings: any[] = [];

    for (const t of tenants) {
      try {
        const rows = await this.dataSource.query(
          `SELECT b.id, b.booking_number, b.customer_name, b.customer_email,
                  b.status, b.total_amount, b.currency, b.travel_date, b.created_at,
                  '${t.slug}' as tenant_slug
           FROM "${t.schemaName}".bookings b
           ${whereClause}
           ORDER BY b.created_at DESC`,
          params,
        );
        allBookings.push(...rows);
      } catch {
        // Schema may not have bookings table yet — skip
      }
    }

    // Sort all by created_at DESC, then paginate in memory
    allBookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const total = allBookings.length;
    const data = allBookings.slice(offset, offset + limit).map((r) => ({
      id: r.id,
      bookingNumber: r.booking_number,
      customerName: r.customer_name,
      customerEmail: r.customer_email,
      status: r.status,
      totalAmount: parseFloat(r.total_amount),
      currency: r.currency,
      travelDate: r.travel_date,
      tenantSlug: r.tenant_slug,
      createdAt: r.created_at,
    }));

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // ── Audit Helper ──

  private async logAudit(
    actorId: string,
    actorEmail: string,
    action: string,
    resourceType: string,
    resourceId?: string,
    details?: Record<string, any>,
  ) {
    await this.auditRepo.save(
      this.auditRepo.create({
        actorId,
        actorEmail,
        action,
        resourceType,
        resourceId: resourceId || null,
        details: details || null,
      }),
    );
  }
}
