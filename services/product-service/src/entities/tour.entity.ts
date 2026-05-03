import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, JoinColumn, OneToMany, Index,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { TourActivityEntity } from './tour-activity.entity';

@Entity('tours')
@Index(['slug'])  // ✅ Index for slug lookups
@Index(['status'])  // ✅ Index for status filters
@Index(['regionId'])  // ✅ Index for foreign key joins
export class TourEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'region_id', type: 'uuid' })
  @Index()  // ✅ Additional index decorator on column
  regionId: string;

  @ManyToOne(() => RegionEntity, (r) => r.tours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()  // ✅ Index on slug
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 20, default: 'moderate' })
  difficulty: string;

  @Column({ name: 'duration_days', type: 'int', default: 1 })
  durationDays: number;

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
  @Index()  // ✅ Index on status
  status: string;

  @OneToMany(() => TourActivityEntity, (ta) => ta.tour)
  tourActivities: TourActivityEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
