import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItineraryDayDto {
  @ApiProperty() @IsInt() @Min(1)
  day: number;

  @ApiProperty() @IsString()
  title: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  accommodation?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  meals?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  altitude?: number;
}
