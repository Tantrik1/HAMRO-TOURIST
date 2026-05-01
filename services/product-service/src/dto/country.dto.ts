import { IsString, MinLength, MaxLength, IsOptional, IsBoolean, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
}

export class UpdateCountryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) @MaxLength(255)
  name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) @MaxLength(10)
  code?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isActive?: boolean;
}
