import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, ILike } from 'typeorm';
import { Booking, BookingStatus } from '../entities/booking.entity';
import { BookingItem } from '../entities/booking-item.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';

/** Allowed status transitions: from → to[] */
const STATUS_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.INQUIRY]: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED],
  [BookingStatus.CONFIRMED]: [
    BookingStatus.DEPOSIT_PAID,
    BookingStatus.FULLY_PAID,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.DEPOSIT_PAID]: [
    BookingStatus.FULLY_PAID,
    BookingStatus.CANCELLED,
    BookingStatus.REFUNDED,
  ],
  [BookingStatus.FULLY_PAID]: [
    BookingStatus.COMPLETED,
    BookingStatus.CANCELLED,
    BookingStatus.REFUNDED,
  ],
  [BookingStatus.COMPLETED]: [BookingStatus.REFUNDED],
  [BookingStatus.CANCELLED]: [BookingStatus.REFUNDED],
  [BookingStatus.REFUNDED]: [],
};

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(BookingItem)
    private readonly itemRepo: Repository<BookingItem>,
  ) {}

  /**
   * Generates a booking number in the format HT-YYYYMMDD-XXXXX.
   * The 5 random characters are uppercase alphanumeric.
   */
  private generateBookingNumber(): string {
    const now = new Date();
    const ymd = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let random = '';
    for (let i = 0; i < 5; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `HT-${ymd}-${random}`;
  }

  /**
   * Creates a booking inquiry.
   * Server-side recalculates totalPrice per item and overall totalAmount.
   */
  async create(dto: CreateBookingDto): Promise<Booking> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('At least one booking item is required');
    }

    const bookingNumber = this.generateBookingNumber();

    // Server-side price recalculation — never trust client totalAmount
    const items: Partial<BookingItem>[] = dto.items.map((item) => ({
      itemType: item.itemType,
      itemId: item.itemId,
      itemTitle: item.itemTitle,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: Number((item.unitPrice * item.quantity).toFixed(2)),
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.totalPrice),
      0,
    );

    const booking = this.bookingRepo.create({
      bookingNumber,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      customerPhone: dto.customerPhone ?? null,
      travelDate: dto.travelDate as unknown as Date,
      numberOfTravelers: dto.numberOfTravelers,
      specialRequests: dto.specialRequests ?? null,
      currency: dto.currency ?? 'USD',
      totalAmount: Number(totalAmount.toFixed(2)),
      paidAmount: 0,
      status: BookingStatus.INQUIRY,
      items: items as BookingItem[],
    });

    const saved = await this.bookingRepo.save(booking);
    this.logger.log(`Booking created: ${saved.bookingNumber}`);
    return saved;
  }

  /**
   * Lists bookings with optional filters and pagination.
   */
  async findAll(filters: {
    status?: BookingStatus;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;

    const qb = this.bookingRepo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.items', 'items')
      .orderBy('booking.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (filters.status) {
      qb.andWhere('booking.status = :status', { status: filters.status });
    }

    if (filters.dateFrom && filters.dateTo) {
      qb.andWhere('booking.travelDate BETWEEN :dateFrom AND :dateTo', {
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      });
    } else if (filters.dateFrom) {
      qb.andWhere('booking.travelDate >= :dateFrom', {
        dateFrom: filters.dateFrom,
      });
    } else if (filters.dateTo) {
      qb.andWhere('booking.travelDate <= :dateTo', {
        dateTo: filters.dateTo,
      });
    }

    if (filters.search) {
      qb.andWhere(
        '(booking.customerName ILIKE :search OR booking.customerEmail ILIKE :search OR booking.bookingNumber ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Finds a single booking by ID with items and payments.
   * @throws {NotFoundException} if booking does not exist
   */
  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['items', 'payments'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  /**
   * Updates the booking status with valid transition enforcement.
   * @throws {BadRequestException} if status transition is invalid
   */
  async updateStatus(id: string, newStatus: BookingStatus): Promise<Booking> {
    const booking = await this.findOne(id);
    const allowed = STATUS_TRANSITIONS[booking.status];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from '${booking.status}' to '${newStatus}'. Allowed transitions: ${allowed?.join(', ') || 'none'}`,
      );
    }
    booking.status = newStatus;
    return this.bookingRepo.save(booking);
  }

  /**
   * Soft-cancels a booking (sets status to cancelled).
   */
  async cancel(id: string): Promise<Booking> {
    return this.updateStatus(id, BookingStatus.CANCELLED);
  }

  /**
   * Soft-deletes a booking.
   */
  async remove(id: string): Promise<void> {
    const booking = await this.findOne(id);
    await this.bookingRepo.softRemove(booking);
  }

  /**
   * Returns aggregate stats: counts per status + total revenue from fully paid / completed bookings.
   */
  async getStats(): Promise<{
    byStatus: Record<string, number>;
    totalRevenue: number;
    totalBookings: number;
  }> {
    const statusCounts = await this.bookingRepo
      .createQueryBuilder('booking')
      .select('booking.status', 'status')
      .addSelect('COUNT(*)::int', 'count')
      .groupBy('booking.status')
      .getRawMany<{ status: string; count: number }>();

    const byStatus: Record<string, number> = {};
    let totalBookings = 0;
    for (const row of statusCounts) {
      byStatus[row.status] = Number(row.count);
      totalBookings += Number(row.count);
    }

    const revenueResult = await this.bookingRepo
      .createQueryBuilder('booking')
      .select('COALESCE(SUM(booking.paid_amount), 0)', 'revenue')
      .where('booking.status IN (:...statuses)', {
        statuses: [
          BookingStatus.FULLY_PAID,
          BookingStatus.COMPLETED,
          BookingStatus.DEPOSIT_PAID,
        ],
      })
      .getRawOne<{ revenue: string }>();

    return {
      byStatus,
      totalRevenue: Number(revenueResult?.revenue ?? 0),
      totalBookings,
    };
  }
}
