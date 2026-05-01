import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { ItineraryEntity } from './itinerary.entity';
import { GroupDiscountEntity } from './group-discount.entity';

@Entity('itinerary_pricing')
export class ItineraryPricingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'itinerary_id', type: 'uuid' })
  itineraryId: string;

  @ManyToOne(() => ItineraryEntity, (i) => i.pricingTiers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itinerary_id' })
  itinerary: ItineraryEntity;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'valid_from', type: 'date', nullable: true })
  validFrom: Date | null;

  @Column({ name: 'valid_to', type: 'date', nullable: true })
  validTo: Date | null;

  @OneToMany(() => GroupDiscountEntity, (g) => g.pricing, { cascade: true })
  groupDiscounts: GroupDiscountEntity[];
}
