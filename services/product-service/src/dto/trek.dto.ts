import { IsString, MinLength, MaxLength, IsOptional, IsUUID, IsEnum, IsInt, Min, Matches, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Difficulty, ProductStatus } from '@hamrotourist/shared-types';
import { SeoSettingsDto } from './seo-settings.dto';
import { MediaDto } from './media.dto';
import { FaqDto } from './faq.dto';
import { GroupDiscountDto } from './group-discount.dto';
import { ItineraryDayDto } from './itinerary-day.dto';

export class CreateTrekDto {
  @ApiProperty() @IsUUID()
  regionId: string;

  @ApiProperty({ example: 'Annapurna Circuit' })
  @IsString() @MinLength(3) @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'annapurna-circuit' })
  @IsString() @MinLength(3) @MaxLength(255) @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiProperty({ enum: Difficulty }) @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  maxAltitude?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  durationDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0)
  basePrice?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  highlights?: string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  inclusions?: string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  exclusions?: string[];

  @ApiPropertyOptional({ type: [ItineraryDayDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => ItineraryDayDto)
  itinerary?: ItineraryDayDto[];

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];

  @ApiPropertyOptional({ type: [GroupDiscountDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => GroupDiscountDto)
  groupDiscounts?: GroupDiscountDto[];
}

export class UpdateTrekDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID()
  regionId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(3) @MaxLength(255)
  title?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  maxAltitude?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  durationDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0)
  basePrice?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  highlights?: string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  inclusions?: string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  exclusions?: string[];

  @ApiPropertyOptional({ type: [ItineraryDayDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => ItineraryDayDto)
  itinerary?: ItineraryDayDto[];

  @ApiPropertyOptional() @IsOptional() @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];

  @ApiPropertyOptional({ type: [GroupDiscountDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => GroupDiscountDto)
  groupDiscounts?: GroupDiscountDto[];
}
