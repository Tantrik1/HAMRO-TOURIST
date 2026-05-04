import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { TrekActivityEntity } from './trek-activity.entity';

@Entity('treks')
export class TrekEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'region_id', type: 'uuid' })
  regionId: string;

  @ManyToOne(() => RegionEntity, (r) => r.treks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 20, default: 'moderate' })
  difficulty: string;

  @Column({ name: 'max_altitude', type: 'int', nullable: true })
  maxAltitude: number | null;

  @Column({ name: 'duration_days', type: 'int', default: 1 })
  durationDays: number;

  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  basePrice: number;

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
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

  @OneToMany(() => TrekActivityEntity, (ta) => ta.trek)
  trekActivities: TrekActivityEntity[];

  // Polymorphic relations (FAQs, GroupDiscounts) are managed by PolymorphicRelationsService
  faqs?: any[];
  groupDiscounts?: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
