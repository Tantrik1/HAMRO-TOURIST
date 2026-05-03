import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('newsletter_subscribers')
export class NewsletterSubscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index('idx_newsletter_email')
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | null;

  @Column({ name: 'tenant_slug', type: 'varchar', length: 63, nullable: true })
  @Index('idx_newsletter_tenant')
  tenantSlug: string | null;

  @Column({ type: 'varchar', length: 20, default: 'subscribed' })
  @Index('idx_newsletter_status')
  status: string;

  @Column({ name: 'subscribed_at', type: 'timestamptz', default: () => 'now()' })
  subscribedAt: Date;

  @Column({ name: 'unsubscribed_at', type: 'timestamptz', nullable: true })
  unsubscribedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
