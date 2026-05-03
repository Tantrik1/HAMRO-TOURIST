export type EmailJobType =
  | 'welcome'
  | 'verify-email'
  | 'reset-password'
  | 'domain-verified'
  | 'domain-pending'
  | 'new-lead'
  | 'plan-upgraded'
  | 'plan-limit';

export interface EmailJobData {
  type: EmailJobType;
  to: string;
  payload: Record<string, unknown>;
}
