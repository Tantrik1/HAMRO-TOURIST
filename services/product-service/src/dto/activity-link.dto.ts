import { IsUUID, IsEnum, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InclusionType } from '@hamrotourist/shared-types';

export class LinkActivityDto {
  @ApiProperty() @IsUUID()
  activityId: string;

  @ApiProperty({ enum: InclusionType }) @IsEnum(InclusionType)
  inclusionType: InclusionType;

  @ApiPropertyOptional({ example: 50 }) @IsOptional() @IsNumber() @Min(0)
  extraPrice?: number;
}
