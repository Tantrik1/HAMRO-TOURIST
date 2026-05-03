import {
  IsEmail,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsIn,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubscribeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'adventure-nepal', description: 'Tenant slug if subscribing from an agency site' })
  @IsOptional()
  @IsString()
  tenantSlug?: string;
}

export class UnsubscribeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class SendNewsletterDto {
  @ApiProperty({ example: 'Monthly Travel Deals' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: '<h1>Check out our latest travel deals!</h1>' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({ example: 'adventure-nepal', description: 'Send only to subscribers of this tenant. Null = send to all.' })
  @IsOptional()
  @IsString()
  tenantSlug?: string;
}

export class ListSubscribersQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: ['subscribed', 'unsubscribed'] })
  @IsOptional()
  @IsIn(['subscribed', 'unsubscribed'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantSlug?: string;
}
