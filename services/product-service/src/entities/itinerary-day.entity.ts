import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { ItineraryEntity } from './itinerary.entity';

@Entity('itinerary_days')
export class ItineraryDayEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'itinerary_id', type: 'uuid' })
  itineraryId: string;

  @ManyToOne(() => ItineraryEntity, (i) => i.days, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itinerary_id' })
  itinerary: ItineraryEntity;

  @Column({ name: 'day_number', type: 'int' })
  dayNumber: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  accommodation: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meals: string | null;
}
