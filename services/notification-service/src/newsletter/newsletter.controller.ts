import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

function ok<T>(data: T, meta?: any) {
  return { success: true, data, ...(meta && { meta }) };
}

@Controller('notifications/newsletter')
export class NewsletterController {
  constructor(private service: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() body: { email: string; name?: string; tenantSlug?: string }) {
    return ok(await this.service.subscribe(body.email, body.name, body.tenantSlug));
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() body: { email: string }) {
    await this.service.unsubscribe(body.email);
    return ok({ unsubscribed: true });
  }

  @Get('subscribers')
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('tenantSlug') tenantSlug?: string,
  ) {
    const result = await this.service.findAll(
      Number(page) || 1, Number(limit) || 20, status, tenantSlug,
    );
    return ok(result.data, result.meta);
  }

  @Get('stats')
  async stats() {
    return ok(await this.service.getStats());
  }

  @Post('broadcast')
  async broadcast(@Body() body: { subject: string; body: string; tenantSlug?: string }) {
    return ok(await this.service.sendBroadcast(body.subject, body.body, body.tenantSlug));
  }
}
