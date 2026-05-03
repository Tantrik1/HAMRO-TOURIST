import {
  IsString,
  IsArray,
  IsInt,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Acme Travels' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  companyName: string;

  @ApiProperty({ example: 'acme-travels', description: 'URL-safe slug for subdomain' })
  @IsString()
  @MinLength(3)
  @MaxLength(63)
  @Matches(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, {
    message: 'Slug must be lowercase alphanumeric with hyphens, not starting/ending with hyphen',
  })
  slug: string;

  @ApiPropertyOptional({ example: 2018 })
  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(2100)
  yearEstablished?: number;

  @ApiPropertyOptional({ example: 'We are a family-run agency...' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  aboutCompany?: string;

  @ApiPropertyOptional({ example: ['Nepal', 'Bhutan', 'India'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  countriesServed?: string[];

  @ApiPropertyOptional({ example: '<uuid>', description: 'Owner user ID (set by gateway from JWT)' })
  @IsOptional()
  @IsString()
  ownerUserId?: string;
}
