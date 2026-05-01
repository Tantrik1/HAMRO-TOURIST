import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFYING = 'verifying',
  ACTIVE = 'active',
  FAILED = 'failed',
}

@Entity('custom_domains')
export class CustomDomain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_slug' })
  tenantSlug: string;

  @Column({ unique: true })
  domain: string;

  @Column({ name: 'cloudflare_hostname_id', nullable: true })
  cloudflareHostnameId: string | null;

  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.PENDING, name: 'verification_status' })
  verificationStatus: VerificationStatus;

  @Column({ name: 'cname_target', nullable: true })
  cnameTarget: string | null;

  @Column({ name: 'ssl_status', nullable: true })
  sslStatus: string | null;

  @Column({ name: 'last_checked_at', type: 'timestamptz', nullable: true })
  lastCheckedAt: Date | null;

  @Column({ name: 'failure_reason', nullable: true })
  failureReason: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
