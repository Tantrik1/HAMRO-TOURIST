import { IsString, MinLength, MaxLength, IsOptional, IsBoolean, Matches, IsInt, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SeoSettingsDto } from './seo-settings.dto';
import { MediaDto } from './media.dto';
import { FaqDto } from './faq.dto';

export class CreateCountryDto {
  @ApiProperty({ example: 'Nepal' })
  @IsString() @MinLength(2) @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'NP' })
  @IsString() @MinLength(2) @MaxLength(10)
  code: string;

  @ApiProperty({ example: 'nepal' })
  @IsString() @MinLength(2) @MaxLength(255)
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase alphanumeric with hyphens' })
  slug: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];
}

export class UpdateCountryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) @MaxLength(255)
  name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) @MaxLength(10)
  code?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => SeoSettingsDto)
  seo?: SeoSettingsDto;

  @ApiPropertyOptional() @IsOptional() @ValidateNested() @Type(() => MediaDto)
  media?: MediaDto;

  @ApiPropertyOptional({ type: [FaqDto] }) @IsOptional() @ValidateNested({ each: true }) @Type(() => FaqDto)
  faqs?: FaqDto[];
}
