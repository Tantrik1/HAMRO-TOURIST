import { Controller, Post, Get, Body, Query, Req, Headers, HttpCode, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto } from '../dto/initiate-payment.dto';
import { TenantContextInterceptor } from '../interceptors/tenant-context.interceptor';

function ok<T>(data: T) {
  return { success: true, data };
}

@Controller('bookings/payments')
export class PaymentController {
  constructor(private service: PaymentService) {}

  @Post('initiate')
  @UseInterceptors(TenantContextInterceptor)
  async initiate(@Body() dto: InitiatePaymentDto) {
    const result = await this.service.initiatePayment(dto.bookingId, dto.method, dto.amount);
    return ok(result);
  }

  @Post('stripe/webhook')
  @HttpCode(200)
  async stripeWebhook(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    await this.service.verifyStripeWebhook(req.body as Buffer, sig);
    return { received: true };
  }

  @Get('esewa/verify')
  @UseInterceptors(TenantContextInterceptor)
  async esewaVerify(@Query('data') data: string) {
    const result = await this.service.verifyEsewa(data);
    return ok(result);
  }

  @Post('khalti/verify')
  @UseInterceptors(TenantContextInterceptor)
  async khaltiVerify(@Body() body: { pidx: string }) {
    const result = await this.service.verifyKhalti(body.pidx);
    return ok(result);
  }
}
