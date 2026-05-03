import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { TourEntity } from './tour.entity';

@Entity('activity_tours')
export class ActivityTourEntity {
  @PrimaryColumn({ type: 'uuid', name: 'activity_id' })
  activityId: string;

  @PrimaryColumn({ type: 'uuid', name: 'tour_id' })
  tourId: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => ActivityEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;

  @ManyToOne(() => TourEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tour_id' })
  tour: TourEntity;
}
