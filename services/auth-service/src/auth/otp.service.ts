import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, IsNull, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';
import { EmailOtpEntity } from '../entities/email-otp.entity';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly resend: Resend | null;
  private readonly fromEmail: string;
  private readonly fromName: string;
  private readonly otpTtlMinutes = 10;
  private readonly maxAttempts = 5;

  constructor(
    @InjectRepository(EmailOtpEntity)
    private readonly otpRepo: Repository<EmailOtpEntity>,
    private readonly config: ConfigService,
  ) {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    this.resend = apiKey ? new Resend(apiKey) : null;
    this.fromEmail = this.config.get('RESEND_FROM_EMAIL', 'hello@hamrotourist.com');
    this.fromName = this.config.get('RESEND_FROM_NAME', 'Hamro Tourist');
  }

  async sendOtp(email: string, purpose = 'register'): Promise<void> {
    const lower = email.toLowerCase();
    const code = this.generateCode();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + this.otpTtlMinutes * 60 * 1000);

    // ✅ FIXED: Use IsNull() instead of 'undefined as any'
    await this.otpRepo.update(
      { email: lower, purpose, consumedAt: IsNull() },
      { consumedAt: new Date() },
    );
    await this.otpRepo.save({ email: lower, codeHash, purpose, expiresAt });

    this.logger.warn(`[DEV] OTP for ${lower}: ${code}`);
    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: `${this.fromName} <${this.fromEmail}>`,
          to: lower,
          subject: `Your Hamro Tourist verification code: ${code}`,
          html: this.renderOtpEmail(code),
        });
      } catch (err: any) {
        this.logger.error(`Resend send failed: ${err?.message}`, err?.stack);
      }
    }
  }

  async verifyOtp(email: string, code: string, purpose = 'register'): Promise<boolean> {
    const lower = email.toLowerCase();
    const candidates = await this.otpRepo.find({
      where: { email: lower, purpose, expiresAt: MoreThan(new Date()) },
      order: { createdAt: 'DESC' },
      take: 5,
    });

    for (const otp of candidates) {
      if (otp.consumedAt) continue;
      if (otp.attempts >= this.maxAttempts) continue;
      const match = await bcrypt.compare(code, otp.codeHash);
      otp.attempts += 1;
      if (match) {
        otp.consumedAt = new Date();
        await this.otpRepo.save(otp);
        return true;
      }
      await this.otpRepo.save(otp);
    }
    return false;
  }

  async cleanupExpired(): Promise<void> {
    await this.otpRepo.delete({ expiresAt: LessThan(new Date(Date.now() - 24 * 60 * 60 * 1000)) });
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private renderOtpEmail(code: string): string {
    return `<!doctype html><html><body style="font-family:'DM Sans',sans-serif;background:#0A0A0F;color:#F1F0FF;padding:40px 20px;">
<div style="max-width:560px;margin:0 auto;background:#111118;border:1px solid #2A2A3A;border-radius:20px;padding:40px;">
  <h1 style="margin:0 0 12px 0;font-family:'Syne',sans-serif;font-size:28px;background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Hamro Tourist</h1>
  <p style="color:#9B9BB8;margin:0 0 24px 0;">Use the code below to verify your email and continue setting up your travel agency:</p>
  <div style="font-family:'JetBrains Mono',monospace;font-size:42px;letter-spacing:12px;font-weight:600;text-align:center;background:linear-gradient(135deg,#7C3AED,#06B6D4);color:#fff;padding:24px;border-radius:14px;margin:24px 0;">${code}</div>
  <p style="color:#5C5C78;font-size:13px;margin:24px 0 0 0;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
  <hr style="border:0;border-top:1px solid #2A2A3A;margin:32px 0;"/>
  <p style="color:#5C5C78;font-size:12px;margin:0;">Hamro Tourist · hamrotourist.com</p>
</div></body></html>`;
  }
}
