import { IsUUID, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PackageDestinationDto {
  @ApiProperty() @IsUUID()
  destinationId: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @Min(0)
  customName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  customDescription?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1)
  durationDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  sortOrder?: number;
}
