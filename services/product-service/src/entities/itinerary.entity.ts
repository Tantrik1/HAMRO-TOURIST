import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { ItineraryDayEntity } from './itinerary-day.entity';
import { ItineraryPricingEntity } from './itinerary-pricing.entity';

@Entity('itineraries')
export class ItineraryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'parent_id', type: 'uuid' })
  parentId: string;

  @Column({ name: 'parent_type', type: 'varchar', length: 20 })
  parentType: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'total_days', type: 'int', default: 1 })
  totalDays: number;

  @OneToMany(() => ItineraryDayEntity, (d) => d.itinerary, { cascade: true })
  days: ItineraryDayEntity[];

  @OneToMany(() => ItineraryPricingEntity, (p) => p.itinerary, { cascade: true })
  pricingTiers: ItineraryPricingEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
