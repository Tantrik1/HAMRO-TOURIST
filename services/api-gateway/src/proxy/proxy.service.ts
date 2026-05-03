import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  private readonly serviceMap: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.serviceMap = {
      // ✅ FIXED: Use environment variables with localhost fallbacks
      auth: this.config.get('AUTH_SERVICE_URL', `http://localhost:${this.config.get('AUTH_SERVICE_PORT', 4001)}`),
      tenants: this.config.get('TENANT_SERVICE_URL', `http://localhost:${this.config.get('TENANT_SERVICE_PORT', 4002)}`),
      products: this.config.get('PRODUCT_SERVICE_URL', `http://localhost:${this.config.get('PRODUCT_SERVICE_PORT', 4003)}`),
      websites: this.config.get('WEBSITE_BUILDER_SERVICE_URL', `http://localhost:${this.config.get('WEBSITE_BUILDER_SERVICE_PORT', 4004)}`),
      media: this.config.get('MEDIA_SERVICE_URL', `http://localhost:${this.config.get('MEDIA_SERVICE_PORT', 4005)}`),
      domains: this.config.get('DOMAIN_SERVICE_URL', `http://localhost:${this.config.get('DOMAIN_SERVICE_PORT', 4006)}`),
      crm: this.config.get('CRM_SERVICE_URL', `http://localhost:${this.config.get('CRM_SERVICE_PORT', 4007)}`),
      notifications: this.config.get('NOTIFICATION_SERVICE_URL', `http://localhost:${this.config.get('NOTIFICATION_SERVICE_PORT', 4008)}`),
      billing: this.config.get('BILLING_SERVICE_URL', `http://localhost:${this.config.get('BILLING_SERVICE_PORT', 4009)}`),
      bookings: this.config.get('BOOKING_SERVICE_URL', `http://localhost:${this.config.get('BOOKING_SERVICE_PORT', 4010)}`),
    };
  }

  async forward(serviceName: string, req: Request): Promise<any> {
    const baseUrl = this.serviceMap[serviceName];
    if (!baseUrl) {
      throw new Error(`Unknown service: ${serviceName}`);
    }

    const path = req.url.replace(`/api/${serviceName}`, '') || '/';
    const url = `${baseUrl}/${serviceName}${path}`;

    this.logger.debug(`Forwarding ${req.method} ${req.url} → ${url}`);

    const headers: Record<string, string> = {};
    if (req.headers.authorization) {
      headers['authorization'] = req.headers.authorization as string;
    }
    if (req.headers['x-tenant-slug']) {
      headers['x-tenant-slug'] = req.headers['x-tenant-slug'] as string;
    }
    headers['content-type'] = 'application/json';

    const response = await firstValueFrom(
      this.httpService.request({
        method: req.method as any,
        url,
        headers,
        data: req.body,
        params: req.query,
      }),
    );

    return response.data;
  }

  getServiceNames(): string[] {
    return Object.keys(this.serviceMap);
  }
}
