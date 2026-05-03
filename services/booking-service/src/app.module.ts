import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingItem } from './entities/booking-item.entity';
import { BookingPayment } from './entities/booking-payment.entity';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentModule } from './payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5432),
        username: config.get('DATABASE_USER', 'hamrotourist'),
        password: config.get('DATABASE_PASSWORD', 'hamrotourist_dev'),
        database: config.get('DATABASE_NAME', 'hamrotourist'),
        entities: [Booking, BookingItem, BookingPayment],
        synchronize: false,
      }),
    }),
    BookingsModule,
    PaymentModule,
  ],
})
export class AppModule {}
