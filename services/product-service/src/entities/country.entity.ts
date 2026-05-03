import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { FaqEntity } from './faq.entity';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  code: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'jsonb', nullable: true })
  seo: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  media: Record<string, any> | null;

  @OneToMany(() => RegionEntity, (r) => r.country)
  regions: RegionEntity[];

  @OneToMany(() => FaqEntity, (f) => f.entityId, { cascade: true })
  faqs: FaqEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
