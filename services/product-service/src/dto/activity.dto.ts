import { IsString, MinLength, MaxLength, IsOptional, IsUUID, IsEnum, IsNumber, Min, Matches, IsInt, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductStatus, LinkMode } from '@hamrotourist/shared-types';
import { SeoSettingsDto } from './seo-settings.dto';
import { MediaDto } from './media.dto';
import { FaqDto } from './faq.dto';
import { GroupDiscountDto } from './group-discount.dto';

export class CreateActivityDto {
  @ApiProperty() @IsUUID()
  regionId: string;

  @ApiProperty({ example: 'Paragliding in Pokhara' })
  @IsString() @MinLength(3) @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'paragliding-pokhara' })
  @IsString() @MinLength(3) @MaxLength(255) @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @ApiProperty({ example: 'paragliding' })
  @IsString() @MinLength(2) @MaxLength(100)
  type: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiProperty({ example: 85 }) @IsNumber() @Min(0)
  basePrice: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0)
  durationHours?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ enum: LinkMode }) @IsOptional() @IsEnum(LinkMode)
  linkMode?: LinkMode;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  linkedTrekIds?: string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  linkedTourIds?: string[];

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];

  @ApiPropertyOptional({ type: [GroupDiscountDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => GroupDiscountDto)
  groupDiscounts?: GroupDiscountDto[];
}

export class UpdateActivityDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(3) @MaxLength(255)
  title?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) @MaxLength(100)
  type?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0)
  basePrice?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0)
  durationHours?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional() @IsOptional() @IsEnum(LinkMode)
  linkMode?: LinkMode;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  linkedTrekIds?: string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  linkedTourIds?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

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
