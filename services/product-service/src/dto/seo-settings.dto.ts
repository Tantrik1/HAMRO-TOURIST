import { IsString, IsOptional, IsBoolean, IsArray, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SeoSettingsDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(60)
  metaTitle?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(160)
  metaDescription?: string;

  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true })
  metaKeywords?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(60)
  ogTitle?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(160)
  ogDescription?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  ogImage?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  canonicalUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  noIndex?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  noFollow?: boolean;

  @ApiPropertyOptional() @IsOptional()
  structuredData?: Record<string, any>;
}
