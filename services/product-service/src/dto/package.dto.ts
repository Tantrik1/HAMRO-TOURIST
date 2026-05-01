import { IsString, MinLength, MaxLength, IsOptional, IsEnum, IsArray, IsUUID, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '@hamrotourist/shared-types';

export class CreatePackageDto {
  @ApiProperty({ example: 'Nepal Adventure Package' })
  @IsString() @MinLength(3) @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'nepal-adventure-package' })
  @IsString() @MinLength(3) @MaxLength(255) @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  regionIds?: string[];
}

export class UpdatePackageDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(3) @MaxLength(255)
  title?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true })
  regionIds?: string[];
}
