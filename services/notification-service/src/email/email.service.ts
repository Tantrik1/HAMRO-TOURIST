import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resend } from './resend.client';
import { render } from '@react-email/components';
import { WelcomeEmail } from '../templates/welcome';
import { VerifyEmail } from '../templates/verify-email';
import { ResetPasswordEmail } from '../templates/reset-password';
import { DomainVerifiedEmail } from '../templates/domain-verified';
import { DomainPendingEmail } from '../templates/domain-pending';
import { NewLeadEmail } from '../templates/new-lead';
import { PlanUpgradedEmail } from '../templates/plan-upgraded';
import { PlanLimitEmail } from '../templates/plan-limit';
import type { EmailJobType } from './email-job.interface';

type TemplateRenderer = (payload: Record<string, unknown>) => Promise<{ subject: string; html: string }>;

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly from: string;
  private readonly renderers: Record<EmailJobType, TemplateRenderer>;

  constructor(private config: ConfigService) {
    const name = this.config.get('RESEND_FROM_NAME', 'Hamro Tourist');
    const email = this.config.get('RESEND_FROM_EMAIL', 'hello@hamrotourist.com');
    this.from = `${name} <${email}>`;

    this.renderers = {
      'welcome': async (p) => ({
        subject: `Welcome to Hamro Tourist, ${p.agencyName}!`,
        html: await render(WelcomeEmail(p as any)),
      }),
      'verify-email': async (p) => ({
        subject: 'Verify your email address',
        html: await render(VerifyEmail(p as any)),
      }),
      'reset-password': async (p) => ({
        subject: 'Reset your password',
        html: await render(ResetPasswordEmail(p as any)),
      }),
      'domain-verified': async (p) => ({
        subject: `Your domain ${p.domain} is now active!`,
        html: await render(DomainVerifiedEmail(p as any)),
      }),
      'domain-pending': async (p) => ({
        subject: `Action needed: configure DNS for ${p.domain}`,
        html: await render(DomainPendingEmail(p as any)),
      }),
      'new-lead': async (p) => ({
        subject: `New inquiry from ${p.leadName}`,
        html: await render(NewLeadEmail(p as any)),
      }),
      'plan-upgraded': async (p) => ({
        subject: `You've upgraded to ${p.planName}!`,
        html: await render(PlanUpgradedEmail(p as any)),
      }),
      'plan-limit': async (p) => ({
        subject: `You've reached your ${p.resourceName} limit`,
        html: await render(PlanLimitEmail(p as any)),
      }),
    };
  }

  async send(type: EmailJobType, to: string, payload: Record<string, unknown>): Promise<void> {
    const renderer = this.renderers[type];
    if (!renderer) {
      this.logger.error(`Unknown email type: ${type}`);
      return;
    }

    const { subject, html } = await renderer(payload);

    const { error } = await resend.emails.send({
      from: this.from,
      to,
      subject,
      html,
    });

    if (error) {
      this.logger.error(`Failed to send ${type} email to ${to}`, error);
      throw new Error(`Resend error: ${error.message}`);
    }

    this.logger.log(`Sent ${type} email to ${to}`);
  }
}
