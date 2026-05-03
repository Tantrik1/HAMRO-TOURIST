import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber,
  MinLength,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookingItemType } from '../entities/booking-item.entity';

export class CreateBookingItemDto {
  @ApiProperty({ enum: BookingItemType })
  @IsEnum(BookingItemType)
  itemType: BookingItemType;

  @ApiProperty()
  @IsUUID()
  itemId: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  itemTitle: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Unit price — server will recalculate totals' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unitPrice: number;
}

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  customerName: string;

  @ApiProperty()
  @IsEmail()
  customerEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  customerPhone?: string;

  @ApiProperty({ description: 'ISO date string (YYYY-MM-DD)' })
  @IsDateString()
  travelDate: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  numberOfTravelers: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  specialRequests?: string;

  @ApiPropertyOptional({ default: 'USD' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiProperty({ type: [CreateBookingItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingItemDto)
  items: CreateBookingItemDto[];
}
