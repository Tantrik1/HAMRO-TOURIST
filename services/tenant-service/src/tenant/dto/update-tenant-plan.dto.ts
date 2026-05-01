import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TenantPlan } from '@hamrotourist/shared-types';

export class UpdateTenantPlanDto {
  @ApiProperty({ enum: TenantPlan, example: TenantPlan.PRO })
  @IsEnum(TenantPlan)
  plan: TenantPlan;
}
