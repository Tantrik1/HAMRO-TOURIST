import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToMany, JoinTable, Index, OneToMany,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { PackageDestinationEntity } from './package-destination.entity';
import { FaqEntity } from './faq.entity';
import { GroupDiscountEntity } from './group-discount.entity';

@Entity('packages')
@Index(['slug'])  // ✅ Index for slug lookups
@Index(['status'])  // ✅ Index for status filters
export class PackageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()  // ✅ Index on slug
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'total_days', type: 'int', default: 1 })
  totalDays: number;

  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  basePrice: number;

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
  @Index()  // ✅ Index on status
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  highlights: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  inclusions: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  exclusions: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  itinerary: Record<string, any>[] | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'jsonb', nullable: true })
  seo: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  media: Record<string, any> | null;

  @ManyToMany(() => RegionEntity)
  @JoinTable({
    name: 'package_regions',
    joinColumn: { name: 'package_id' },
    inverseJoinColumn: { name: 'region_id' },
  })
  regions: RegionEntity[];

  @OneToMany(() => PackageDestinationEntity, (pd) => pd.package, { cascade: true })
  packageDestinations: PackageDestinationEntity[];

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
