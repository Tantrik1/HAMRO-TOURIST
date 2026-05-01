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

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
  status: string;

  @OneToMany(() => TrekActivityEntity, (ta) => ta.trek)
  trekActivities: TrekActivityEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
