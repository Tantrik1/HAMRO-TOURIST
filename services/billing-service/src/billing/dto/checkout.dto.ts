import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateCheckoutDto {
  @IsString() @IsNotEmpty()
  tenantSlug: string;

  @IsIn(['pro', 'business', 'enterprise'])
  plan: string;

  @IsString() @IsNotEmpty()
  email: string;

  @IsString() @IsNotEmpty()
  companyName: string;
}

export class ChangePlanDto {
  @IsIn(['pro', 'business', 'enterprise'])
  plan: string;
}

export class CreatePortalDto {
  @IsString() @IsNotEmpty()
  tenantSlug: string;
}
