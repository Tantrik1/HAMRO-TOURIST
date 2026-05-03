import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PackageEntity } from './package.entity';
import { TrekEntity } from './trek.entity';

@Entity('package_destinations')
export class PackageDestinationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'package_id', type: 'uuid' })
  packageId: string;

  @ManyToOne(() => PackageEntity, (p) => p.packageDestinations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'package_id' })
  package: PackageEntity;

  @Column({ name: 'destination_id', type: 'uuid' })
  destinationId: string;

  @ManyToOne(() => TrekEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'destination_id' })
  destination: TrekEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customName: string | null;

  @Column({ type: 'text', nullable: true })
  customDescription: string | null;

  @Column({ name: 'duration_days', type: 'int', nullable: true })
  durationDays: number | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
