import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { TenantEntity } from '../entities/tenant.entity';
import { PlanEntity } from '../entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity, PlanEntity])],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
