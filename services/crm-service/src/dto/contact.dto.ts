import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateContactDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional() @IsString()
  phone?: string;

  @IsOptional() @IsString()
  source?: string;

  @IsOptional() @IsArray() @IsString({ each: true })
  tags?: string[];

  @IsOptional() @IsString()
  notes?: string;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}
