import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantPlan } from '@hamrotourist/shared-types';

@Entity('plans')
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TenantPlan,
    unique: true,
  })
  name: TenantPlan;

  @Column({ name: 'display_name', type: 'varchar', length: 50 })
  displayName: string;

  @Column({ name: 'price_monthly', type: 'decimal', precision: 10, scale: 2, default: 0 })
  priceMonthly: number;

  @Column({ name: 'max_countries', type: 'int', default: 5 })
  maxCountries: number;

  @Column({ name: 'max_regions_per_country', type: 'int', default: 3 })
  maxRegionsPerCountry: number;

  @Column({ name: 'max_team_members', type: 'int', default: 1 })
  maxTeamMembers: number;

  @Column({ name: 'can_use_custom_domain', type: 'boolean', default: false })
  canUseCustomDomain: boolean;

  @Column({ name: 'can_use_custom_html', type: 'boolean', default: false })
  canUseCustomHtml: boolean;

  @Column({ name: 'can_access_api', type: 'boolean', default: false })
  canAccessApi: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
