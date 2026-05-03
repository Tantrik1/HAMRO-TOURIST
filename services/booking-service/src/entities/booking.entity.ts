import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { BookingItem } from './booking-item.entity';
import { BookingPayment } from './booking-payment.entity';

export enum BookingStatus {
  INQUIRY = 'inquiry',
  CONFIRMED = 'confirmed',
  DEPOSIT_PAID = 'deposit_paid',
  FULLY_PAID = 'fully_paid',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'booking_number', unique: true })
  bookingNumber: string;

  @Column({ name: 'customer_name' })
  customerName: string;

  @Column({ name: 'customer_email' })
  customerEmail: string;

  @Column({ name: 'customer_phone', nullable: true })
  customerPhone: string | null;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.INQUIRY })
  status: BookingStatus;

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ name: 'paid_amount', type: 'decimal', precision: 12, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ name: 'travel_date', type: 'date' })
  travelDate: Date;

  @Column({ name: 'number_of_travelers', default: 1 })
  numberOfTravelers: number;

  @Column({ name: 'special_requests', type: 'text', nullable: true })
  specialRequests: string | null;

  @Column({ name: 'assigned_to', nullable: true })
  assignedTo: string | null;

  @OneToMany(() => BookingItem, (item) => item.booking, { cascade: true })
  items: BookingItem[];

  @OneToMany(() => BookingPayment, (payment) => payment.booking, { cascade: true })
  payments: BookingPayment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
