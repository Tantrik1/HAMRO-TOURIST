import { IsString, MinLength, MaxLength, IsOptional, IsUUID, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
}

export class UpdateRegionDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) @MaxLength(255)
  name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1024)
  coverImageUrl?: string;
}
