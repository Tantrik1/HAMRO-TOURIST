import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { CountryEntity } from './country.entity';
import { TourEntity } from './tour.entity';
import { TrekEntity } from './trek.entity';
import { ActivityEntity } from './activity.entity';

@Entity('regions')
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'country_id', type: 'uuid' })
  countryId: string;

  @ManyToOne(() => CountryEntity, (c) => c.regions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'cover_image_url', type: 'varchar', length: 1024, nullable: true })
  coverImageUrl: string | null;

  @OneToMany(() => TourEntity, (t) => t.region)
  tours: TourEntity[];

  @OneToMany(() => TrekEntity, (t) => t.region)
  treks: TrekEntity[];

  @OneToMany(() => ActivityEntity, (a) => a.region)
  activities: ActivityEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
