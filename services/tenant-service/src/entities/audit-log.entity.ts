import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('audit_logs')
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'actor_id', type: 'uuid' })
  @Index('idx_audit_logs_actor')
  actorId: string;

  @Column({ name: 'actor_email', type: 'varchar', length: 255 })
  actorEmail: string;

  @Column({ type: 'varchar', length: 100 })
  @Index('idx_audit_logs_action')
  action: string;

  @Column({ name: 'resource_type', type: 'varchar', length: 100 })
  resourceType: string;

  @Column({ name: 'resource_id', type: 'varchar', length: 255, nullable: true })
  resourceId: string | null;

  @Column({ type: 'jsonb', nullable: true })
  details: Record<string, any> | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @CreateDateColumn({ name: 'created_at' })
  @Index('idx_audit_logs_created_at')
  createdAt: Date;
}
