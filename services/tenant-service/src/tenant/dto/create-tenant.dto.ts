import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
