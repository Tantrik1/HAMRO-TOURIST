import {
  IsString, MinLength, MaxLength, IsOptional, IsUUID,
  IsEnum, IsInt, Min, IsArray, ValidateNested, IsNumber, IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItineraryParentType, DiscountType } from '@hamrotourist/shared-types';

export class CreateItineraryDayDto {
  @ApiProperty() @IsInt() @Min(1)
  dayNumber: number;

  @ApiProperty() @IsString() @MinLength(2) @MaxLength(255)
  title: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  accommodation?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  meals?: string;
}

export class CreateGroupDiscountDto {
  @ApiProperty() @IsInt() @Min(1)
  minPax: number;

  @ApiProperty() @IsInt() @Min(1)
  maxPax: number;

  @ApiProperty({ enum: DiscountType }) @IsEnum(DiscountType)
  discountType: DiscountType;

  @ApiProperty() @IsNumber() @Min(0)
  discountValue: number;
}

export class CreatePricingTierDto {
  @ApiProperty({ example: 'Peak Season' }) @IsString() @MinLength(2) @MaxLength(255)
  label: string;

  @ApiProperty({ example: 1500 }) @IsNumber() @Min(0)
  basePrice: number;

  @ApiProperty({ example: 'USD' }) @IsString() @MaxLength(10)
  currency: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  validFrom?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  validTo?: string;

  @ApiPropertyOptional({ type: [CreateGroupDiscountDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateGroupDiscountDto)
  groupDiscounts?: CreateGroupDiscountDto[];
}

export class CreateItineraryDto {
  @ApiProperty() @IsUUID()
  parentId: string;

  @ApiProperty({ enum: ItineraryParentType }) @IsEnum(ItineraryParentType)
  parentType: ItineraryParentType;

  @ApiProperty({ example: '14-Day Classic Route' }) @IsString() @MinLength(3) @MaxLength(255)
  title: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiProperty() @IsInt() @Min(1)
  totalDays: number;

  @ApiPropertyOptional({ type: [CreateItineraryDayDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateItineraryDayDto)
  days?: CreateItineraryDayDto[];

  @ApiPropertyOptional({ type: [CreatePricingTierDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreatePricingTierDto)
  pricingTiers?: CreatePricingTierDto[];
}

export class UpdateItineraryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(3) @MaxLength(255)
  title?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1)
  totalDays?: number;
}
