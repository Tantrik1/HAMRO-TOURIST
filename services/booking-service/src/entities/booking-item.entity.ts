import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from './booking.entity';

export enum BookingItemType {
  TOUR = 'tour',
  TREK = 'trek',
  ACTIVITY = 'activity',
  PACKAGE = 'package',
}

@Entity('booking_items')
export class BookingItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'booking_id' })
  bookingId: string;

  @ManyToOne(() => Booking, (booking) => booking.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ name: 'item_type', type: 'enum', enum: BookingItemType })
  itemType: BookingItemType;

  @Column({ name: 'item_id' })
  itemId: string;

  @Column({ name: 'item_title' })
  itemTitle: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number;
}
