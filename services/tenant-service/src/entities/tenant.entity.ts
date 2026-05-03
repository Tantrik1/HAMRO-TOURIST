import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CustomDomainStatus, TenantStatus } from '@hamrotourist/shared-types';
import { PlanEntity } from './plan.entity';

@Entity('tenants')
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 63, unique: true })
  @Index('idx_tenants_slug')
  slug: string;

  @Column({ name: 'company_name', type: 'varchar', length: 255 })
  companyName: string;

  @Column({ name: 'plan_id', type: 'uuid' })
  planId: string;

  @ManyToOne(() => PlanEntity)
  @JoinColumn({ name: 'plan_id' })
  plan: PlanEntity;

  @Column({ name: 'schema_name', type: 'varchar', length: 63 })
  schemaName: string;

  @Column({ name: 'custom_domain', type: 'varchar', length: 255, nullable: true })
  customDomain: string | null;

  @Column({
    name: 'custom_domain_status',
    type: 'enum',
    enum: CustomDomainStatus,
    default: CustomDomainStatus.PENDING,
  })
  customDomainStatus: CustomDomainStatus;

  @Column({ name: 'domain_verify_token', type: 'varchar', length: 64, nullable: true })
  domainVerifyToken: string | null;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.ACTIVE,
  })
  status: TenantStatus;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @Column({ name: 'owner_user_id', type: 'uuid' })
  ownerUserId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
