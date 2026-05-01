import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, Unique,
} from 'typeorm';
import { TourEntity } from './tour.entity';
import { ActivityEntity } from './activity.entity';

@Entity('tour_activities')
@Unique(['tourId', 'activityId'])
export class TourActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tour_id', type: 'uuid' })
  tourId: string;

  @ManyToOne(() => TourEntity, (t) => t.tourActivities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tour_id' })
  tour: TourEntity;

  @Column({ name: 'activity_id', type: 'uuid' })
  activityId: string;

  @ManyToOne(() => ActivityEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;

  @Column({ name: 'inclusion_type', type: 'varchar', length: 20, default: 'included' })
  inclusionType: string;

  @Column({ name: 'extra_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  extraPrice: number;
}
