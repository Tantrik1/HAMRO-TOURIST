import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToMany, JoinTable,
} from 'typeorm';
import { RegionEntity } from './region.entity';

@Entity('packages')
export class PackageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
  status: string;

  @ManyToMany(() => RegionEntity)
  @JoinTable({
    name: 'package_regions',
    joinColumn: { name: 'package_id' },
    inverseJoinColumn: { name: 'region_id' },
  })
  regions: RegionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
