import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { ItineraryPricingEntity } from './itinerary-pricing.entity';

@Entity('group_discounts')
export class GroupDiscountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'pricing_id', type: 'uuid' })
  pricingId: string;

  @ManyToOne(() => ItineraryPricingEntity, (p) => p.groupDiscounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pricing_id' })
  pricing: ItineraryPricingEntity;

  @Column({ name: 'min_pax', type: 'int' })
  minPax: number;

  @Column({ name: 'max_pax', type: 'int' })
  maxPax: number;

  @Column({ name: 'discount_type', type: 'varchar', length: 20 })
  discountType: string;

  @Column({ name: 'discount_value', type: 'decimal', precision: 10, scale: 2 })
  discountValue: number;
}
