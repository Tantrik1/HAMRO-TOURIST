import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MediaDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  bannerImage?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  cardImage?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  ogImage?: string;

  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true })
  galleryImages?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString()
  altText?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  cardImageAlt?: string;
}
