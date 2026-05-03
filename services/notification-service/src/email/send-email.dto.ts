import { IsString, IsNotEmpty, IsEmail, IsObject, IsIn } from 'class-validator';
import type { EmailJobType } from './email-job.interface';

const EMAIL_TYPES: EmailJobType[] = [
  'welcome',
  'verify-email',
  'reset-password',
  'domain-verified',
  'domain-pending',
  'new-lead',
  'plan-upgraded',
  'plan-limit',
];

export class SendEmailDto {
  @IsIn(EMAIL_TYPES)
  type: EmailJobType;

  @IsEmail()
  to: string;

  @IsObject()
  payload: Record<string, unknown>;
}
