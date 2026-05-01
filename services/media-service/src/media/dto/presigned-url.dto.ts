import { IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MediaCategory {
  BANNERS = 'banners',
  TOURS = 'tours',
  TREKS = 'treks',
  ACTIVITIES = 'activities',
  PACKAGES = 'packages',
  LOGOS = 'logos',
  MISC = 'misc',
}

export class PresignedUrlDto {
  @ApiProperty() @IsString() @MinLength(1) @MaxLength(63)
  tenantSlug: string;

  @ApiProperty({ enum: MediaCategory }) @IsEnum(MediaCategory)
  category: MediaCategory;

  @ApiProperty({ example: 'photo.jpg' }) @IsString() @MinLength(1) @MaxLength(255)
  filename: string;

  @ApiProperty({ example: 'image/jpeg' }) @IsString()
  contentType: string;
}

export class RegisterUploadDto {
  @ApiProperty() @IsString()
  tenantSlug: string;

  @ApiProperty() @IsString()
  key: string;

  @ApiProperty() @IsString()
  contentType: string;
}
