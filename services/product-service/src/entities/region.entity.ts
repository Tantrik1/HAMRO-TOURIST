import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany, Index,
} from 'typeorm';
import { CountryEntity } from './country.entity';
import { TourEntity } from './tour.entity';
import { TrekEntity } from './trek.entity';
import { ActivityEntity } from './activity.entity';

@Entity('regions')
@Index(['slug'])  // ✅ Index for slug lookups
@Index(['countryId'])  // ✅ Index for foreign key joins
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'country_id', type: 'uuid' })
  @Index()  // ✅ Index on country_id
  countryId: string;

  @ManyToOne(() => CountryEntity, (c) => c.regions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()  // ✅ Index on slug
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'jsonb', nullable: true })
  seo: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  media: Record<string, any> | null;

  @OneToMany(() => TourEntity, (t) => t.region)
  tours: TourEntity[];

  @OneToMany(() => TrekEntity, (t) => t.region)
  treks: TrekEntity[];

  @OneToMany(() => ActivityEntity, (a) => a.region)
  activities: ActivityEntity[];

  // Polymorphic relations (FAQs) are managed by PolymorphicRelationsService
  faqs?: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
