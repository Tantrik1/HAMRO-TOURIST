import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, Unique,
} from 'typeorm';
import { TrekEntity } from './trek.entity';
import { ActivityEntity } from './activity.entity';

@Entity('trek_activities')
@Unique(['trekId', 'activityId'])
export class TrekActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'trek_id', type: 'uuid' })
  trekId: string;

  @ManyToOne(() => TrekEntity, (t) => t.trekActivities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trek_id' })
  trek: TrekEntity;

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
