import { IsUUID, IsInt, Min, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CalculatePriceDto {
  @ApiProperty({ description: 'Itinerary pricing tier ID' }) @IsUUID()
  pricingTierId: string;

  @ApiProperty({ example: 4 }) @IsInt() @Min(1)
  pax: number;

  @ApiPropertyOptional({ description: 'IDs of optional activities selected', type: [String] })
  @IsOptional() @IsArray() @IsUUID('4', { each: true })
  optionalActivityIds?: string[];
}
