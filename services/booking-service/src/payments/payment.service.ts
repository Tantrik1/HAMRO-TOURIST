import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import Stripe from 'stripe';
import { BookingPayment, PaymentMethod, PaymentStatus } from '../entities/booking-payment.entity';
import { Booking, BookingStatus } from '../entities/booking.entity';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly stripe: Stripe;
  private readonly esewaSecretKey: string;
  private readonly esewaMerchantId: string;
  private readonly khaltiSecretKey: string;
  private readonly frontendUrl: string;

  constructor(
    @InjectRepository(BookingPayment) private paymentRepo: Repository<BookingPayment>,
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    private config: ConfigService,
  ) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY', 'sk_test_fake'), {
      apiVersion: '2025-02-24.acacia',
    });
    this.esewaSecretKey = this.config.get('ESEWA_SECRET_KEY', '');
    this.esewaMerchantId = this.config.get('ESEWA_MERCHANT_ID', '');
    this.khaltiSecretKey = this.config.get('KHALTI_SECRET_KEY', '');
    this.frontendUrl = this.config.get('FRONTEND_URL', 'http://localhost:3001');
  }

  async initiatePayment(bookingId: string, method: PaymentMethod, amount: number) {
    const booking = await this.bookingRepo.findOne({ where: { id: bookingId } });
    if (!booking) throw new NotFoundException('Booking not found');

    const payment = this.paymentRepo.create({
      bookingId,
      method,
      amount,
      currency: booking.currency,
      status: PaymentStatus.PENDING,
    });
    const saved = await this.paymentRepo.save(payment);

    switch (method) {
      case PaymentMethod.STRIPE:
        return this.initiateStripe(saved, booking);
      case PaymentMethod.ESEWA:
        return this.initiateEsewa(saved, booking);
      case PaymentMethod.KHALTI:
        return this.initiateKhalti(saved, booking);
      case PaymentMethod.BANK_TRANSFER:
        return { paymentId: saved.id, method: 'bank_transfer', instructions: 'Please transfer to the bank account provided by the agency.' };
      default:
        throw new BadRequestException(`Unsupported payment method: ${method}`);
    }
  }

  private async initiateStripe(payment: BookingPayment, booking: Booking) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: booking.currency.toLowerCase(),
          unit_amount: Math.round(payment.amount * 100),
          product_data: { name: `Booking ${booking.bookingNumber}` },
        },
        quantity: 1,
      }],
      metadata: { paymentId: payment.id, bookingId: booking.id },
      success_url: `${this.frontendUrl}/booking/${booking.bookingNumber}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.frontendUrl}/booking/${booking.bookingNumber}/payment`,
    });

    return { paymentId: payment.id, method: 'stripe', url: session.url, sessionId: session.id };
  }

  private async initiateEsewa(payment: BookingPayment, booking: Booking) {
    const transactionUuid = payment.id;
    const totalAmount = payment.amount;
    const signedFieldNames = 'total_amount,transaction_uuid,product_code';
    const signingString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${this.esewaMerchantId}`;
    const signature = createHmac('sha256', this.esewaSecretKey)
      .update(signingString)
      .digest('base64');

    return {
      paymentId: payment.id,
      method: 'esewa',
      formData: {
        amount: totalAmount,
        tax_amount: 0,
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: this.esewaMerchantId,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: `${this.frontendUrl}/booking/${booking.bookingNumber}/esewa-success`,
        failure_url: `${this.frontendUrl}/booking/${booking.bookingNumber}/payment?failed=true`,
        signed_field_names: signedFieldNames,
        signature,
      },
      actionUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
    };
  }

  private async initiateKhalti(payment: BookingPayment, booking: Booking) {
    const amountInPaisa = Math.round(payment.amount * 100);

    const response = await fetch('https://a.khalti.com/api/v2/epayment/initiate/', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${this.khaltiSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        return_url: `${this.frontendUrl}/booking/${booking.bookingNumber}/khalti-success`,
        website_url: this.frontendUrl,
        amount: amountInPaisa,
        purchase_order_id: payment.id,
        purchase_order_name: `Booking ${booking.bookingNumber}`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      this.logger.error('Khalti initiation failed', data);
      throw new BadRequestException('Khalti payment initiation failed');
    }

    return { paymentId: payment.id, method: 'khalti', url: data.payment_url, pidx: data.pidx };
  }

  async verifyStripeWebhook(payload: Buffer, signature: string) {
    const webhookSecret = this.config.get('STRIPE_BOOKING_WEBHOOK_SECRET', '');
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      throw new BadRequestException('Invalid Stripe webhook signature');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.paymentId;
      if (paymentId) {
        await this.markPaid(paymentId, session.payment_intent as string);
      }
    }
  }

  async verifyEsewa(encodedData: string) {
    const decoded = JSON.parse(Buffer.from(encodedData, 'base64').toString());
    const transactionUuid = decoded.transaction_uuid;
    const payment = await this.paymentRepo.findOne({ where: { id: transactionUuid } });
    if (!payment) throw new NotFoundException('Payment not found');

    if (decoded.status === 'COMPLETE') {
      await this.markPaid(payment.id, decoded.transaction_code || null);
    }

    return { verified: decoded.status === 'COMPLETE' };
  }

  async verifyKhalti(pidx: string) {
    const response = await fetch('https://a.khalti.com/api/v2/epayment/lookup/', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${this.khaltiSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pidx }),
    });

    const data = await response.json();
    if (data.status === 'Completed') {
      const paymentId = data.purchase_order_id;
      await this.markPaid(paymentId, data.transaction_id || pidx);
      return { verified: true };
    }

    return { verified: false, status: data.status };
  }

  private async markPaid(paymentId: string, transactionId: string | null) {
    const payment = await this.paymentRepo.findOne({ where: { id: paymentId } });
    if (!payment || payment.status === PaymentStatus.COMPLETED) return;

    payment.status = PaymentStatus.COMPLETED;
    payment.transactionId = transactionId;
    payment.paidAt = new Date();
    await this.paymentRepo.save(payment);

    // Update booking paid amount and status
    const booking = await this.bookingRepo.findOne({
      where: { id: payment.bookingId },
      relations: ['payments'],
    });
    if (!booking) return;

    const totalPaid = booking.payments
      .filter((p) => p.status === PaymentStatus.COMPLETED || p.id === payment.id)
      .reduce((sum, p) => sum + Number(p.amount), 0);

    booking.paidAmount = totalPaid;

    if (totalPaid >= Number(booking.totalAmount)) {
      booking.status = BookingStatus.FULLY_PAID;
    } else if (totalPaid > 0 && booking.status === BookingStatus.CONFIRMED) {
      booking.status = BookingStatus.DEPOSIT_PAID;
    }

    await this.bookingRepo.save(booking);
    this.logger.log(`Payment ${paymentId} marked as paid. Booking ${booking.bookingNumber} paidAmount=${totalPaid}`);
  }
}
