import { IsInt, IsOptional, IsString, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountType } from '@hamrotourist/shared-types';

export class GroupDiscountDto {
  @ApiProperty() @IsInt() @Min(1)
  minPax: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1)
  maxPax?: number;

  @ApiProperty({ enum: DiscountType }) @IsEnum(DiscountType)
  discountType: DiscountType;

  @ApiProperty() @IsNumber() @Min(0)
  discountValue: number;

  @ApiPropertyOptional() @IsOptional() @IsString()
  label?: string;

  @ApiPropertyOptional() @IsOptional()
  isActive?: boolean;
}
