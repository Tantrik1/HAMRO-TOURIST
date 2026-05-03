import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TenantEntity } from '../entities/tenant.entity';
import { PlanEntity } from '../entities/plan.entity';
import { SystemSettingEntity } from '../entities/system-setting.entity';
import { AuditLogEntity } from '../entities/audit-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TenantEntity,
      PlanEntity,
      SystemSettingEntity,
      AuditLogEntity,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
