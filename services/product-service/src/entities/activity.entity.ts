import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, JoinColumn, Index, OneToMany,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { FaqEntity } from './faq.entity';
import { GroupDiscountEntity } from './group-discount.entity';

@Entity('activities')
@Index(['slug'])  // ✅ Index for slug lookups
@Index(['status'])  // ✅ Index for status filters
@Index(['regionId'])  // ✅ Index for foreign key joins
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'region_id', type: 'uuid' })
  @Index()  // ✅ Index on region_id
  regionId: string;

  @ManyToOne(() => RegionEntity, (r) => r.activities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()  // ✅ Index on slug
  slug: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  basePrice: number;

  @Column({ name: 'duration_hours', type: 'decimal', precision: 6, scale: 2, nullable: true })
  durationHours: number | null;

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
  @Index()  // ✅ Index on status
  status: string;

  @Column({ type: 'varchar', length: 20, default: 'standalone' })
  linkMode: string;

  @Column({ type: 'jsonb', nullable: true })
  linkedTrekIds: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  linkedTourIds: string[] | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'jsonb', nullable: true })
  seo: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  media: Record<string, any> | null;

  @OneToMany(() => FaqEntity, (f) => f.entityId, { cascade: true })
  faqs: FaqEntity[];

  @OneToMany(() => GroupDiscountEntity, (gd) => gd.entityId, { cascade: true })
  groupDiscounts: GroupDiscountEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
