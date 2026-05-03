import { IsString, MinLength, MaxLength, IsOptional, IsEnum, IsArray, IsUUID, Matches, IsInt, ValidateNested, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductStatus } from '@hamrotourist/shared-types';
import { SeoSettingsDto } from './seo-settings.dto';
import { MediaDto } from './media.dto';
import { FaqDto } from './faq.dto';
import { GroupDiscountDto } from './group-discount.dto';
import { ItineraryDayDto } from './itinerary-day.dto';
import { PackageDestinationDto } from './package-destination.dto';

export class CreatePackageDto {
  @ApiProperty({ example: 'Nepal Adventure Package' })
  @IsString() @MinLength(3) @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'nepal-adventure-package' })
  @IsString() @MinLength(3) @MaxLength(255) @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1)
  totalDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0)
  basePrice?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  regionIds?: string[];

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

  @ApiPropertyOptional({ type: [PackageDestinationDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => PackageDestinationDto)
  destinations?: PackageDestinationDto[];

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];

  @ApiPropertyOptional({ type: [GroupDiscountDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => GroupDiscountDto)
  groupDiscounts?: GroupDiscountDto[];
}

export class UpdatePackageDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(3) @MaxLength(255)
  title?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1)
  totalDays?: number;

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

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  regionIds?: string[];

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];

  @ApiPropertyOptional({ type: [GroupDiscountDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => GroupDiscountDto)
  groupDiscounts?: GroupDiscountDto[];
}
