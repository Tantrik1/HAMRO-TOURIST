import { IsString, MinLength, MaxLength, IsOptional, IsUUID, Matches, IsInt, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SeoSettingsDto } from './seo-settings.dto';
import { MediaDto } from './media.dto';
import { FaqDto } from './faq.dto';

export class CreateRegionDto {
  @ApiProperty() @IsUUID()
  countryId: string;

  @ApiProperty({ example: 'Everest Region' })
  @IsString() @MinLength(2) @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'everest-region' })
  @IsString() @MinLength(2) @MaxLength(255)
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];
}

export class UpdateRegionDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) @MaxLength(255)
  name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];
}
