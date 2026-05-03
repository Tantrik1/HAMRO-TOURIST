import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { TrekEntity } from './trek.entity';

@Entity('activity_treks')
export class ActivityTrekEntity {
  @PrimaryColumn({ type: 'uuid', name: 'activity_id' })
  activityId: string;

  @PrimaryColumn({ type: 'uuid', name: 'trek_id' })
  trekId: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => ActivityEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;

  @ManyToOne(() => TrekEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trek_id' })
  trek: TrekEntity;
}
