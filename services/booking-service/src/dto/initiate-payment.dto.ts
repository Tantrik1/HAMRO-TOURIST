import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsUUID, Min } from 'class-validator';
import { PaymentMethod } from '../entities/booking-payment.entity';

export class InitiatePaymentDto {
  @ApiProperty()
  @IsUUID()
  bookingId: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ description: 'Payment amount in booking currency' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;
}
