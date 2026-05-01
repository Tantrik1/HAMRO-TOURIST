import { IsString, MinLength, MaxLength, IsOptional, IsUUID, IsEnum, IsInt, Min, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Difficulty, ProductStatus } from '@hamrotourist/shared-types';

export class CreateTourDto {
  @ApiProperty() @IsUUID()
  regionId: string;

  @ApiProperty({ example: 'Everest Base Camp Trek' })
  @IsString() @MinLength(3) @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'everest-base-camp-trek' })
  @IsString() @MinLength(3) @MaxLength(255) @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiProperty({ enum: Difficulty }) @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({ example: 14 }) @IsInt() @Min(1)
  durationDays: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;
}

export class UpdateTourDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(3) @MaxLength(255)
  title?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1)
  durationDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsEnum(ProductStatus)
  status?: ProductStatus;
}
