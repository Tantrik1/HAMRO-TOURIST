import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LeadStatus } from '../entities/lead.entity';

export class CreateLeadDto {
  @IsUUID()
  contactId: string;

  @IsString() @IsNotEmpty()
  title: string;

  @IsOptional() @IsNumber()
  value?: number;

  @IsOptional() @IsString()
  currency?: string;

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsString()
  assignedTo?: string;

  @IsOptional() @IsDateString()
  expectedCloseDate?: string;
}

export class UpdateLeadDto extends PartialType(CreateLeadDto) {}

export class UpdateLeadStatusDto {
  @IsEnum(LeadStatus)
  status: LeadStatus;

  @IsOptional() @IsString()
  lostReason?: string;
}
