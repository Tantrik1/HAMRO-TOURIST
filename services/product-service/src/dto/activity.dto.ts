import { IsString, MinLength, MaxLength, IsOptional, IsUUID, IsEnum, IsNumber, Min, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '@hamrotourist/shared-types';

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

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;
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

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsEnum(ProductStatus)
  status?: ProductStatus;
}
