import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateDomainDto {
  @IsString()
  @IsNotEmpty()
  tenantSlug: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/, {
    message: 'Invalid domain format',
  })
  domain: string;
}
