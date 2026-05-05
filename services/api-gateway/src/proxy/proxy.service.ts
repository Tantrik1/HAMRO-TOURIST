import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

export interface ForwardedResponse {
  status: number;
  data: any;
  setCookie?: string[];
}

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  private readonly serviceMap: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.serviceMap = {
      auth: this.config.get('AUTH_SERVICE_URL', `http://localhost:${this.config.get('AUTH_SERVICE_PORT', 4001)}`),
      tenants: this.config.get('TENANT_SERVICE_URL', `http://localhost:${this.config.get('TENANT_SERVICE_PORT', 4002)}`),
      products: this.config.get('PRODUCT_SERVICE_URL', `http://localhost:${this.config.get('PRODUCT_SERVICE_PORT', 4003)}`),
      builder: this.config.get('WEBSITE_BUILDER_SERVICE_URL', `http://localhost:${this.config.get('WEBSITE_BUILDER_SERVICE_PORT', 4004)}`),
      websites: this.config.get('WEBSITE_BUILDER_SERVICE_URL', `http://localhost:${this.config.get('WEBSITE_BUILDER_SERVICE_PORT', 4004)}`),
      media: this.config.get('MEDIA_SERVICE_URL', `http://localhost:${this.config.get('MEDIA_SERVICE_PORT', 4005)}`),
      domains: this.config.get('DOMAIN_SERVICE_URL', `http://localhost:${this.config.get('DOMAIN_SERVICE_PORT', 4006)}`),
      crm: this.config.get('CRM_SERVICE_URL', `http://localhost:${this.config.get('CRM_SERVICE_PORT', 4007)}`),
      notifications: this.config.get('NOTIFICATION_SERVICE_URL', `http://localhost:${this.config.get('NOTIFICATION_SERVICE_PORT', 4008)}`),
      billing: this.config.get('BILLING_SERVICE_URL', `http://localhost:${this.config.get('BILLING_SERVICE_PORT', 4009)}`),
      bookings: this.config.get('BOOKING_SERVICE_URL', `http://localhost:${this.config.get('BOOKING_SERVICE_PORT', 4010)}`),
    };
  }

  async forward(serviceName: string, req: Request): Promise<ForwardedResponse> {
    const baseUrl = this.serviceMap[serviceName];
    if (!baseUrl) {
      throw new Error(`Unknown service: ${serviceName}`);
    }

    // Strip the gateway-only `/api/<service>` prefix; keep the rest of the path.
    // For root resource calls (e.g. POST /api/tenants) the result is '' → '/'.
    const stripPrefix = `/api/${serviceName}`;
    let remainder = req.path.startsWith(stripPrefix)
      ? req.path.slice(stripPrefix.length)
      : req.path;
    if (remainder && !remainder.startsWith('/')) remainder = '/' + remainder;
    const url = `${baseUrl}/${serviceName}${remainder}`;

    this.logger.debug(`Forwarding ${req.method} ${req.url} → ${url}`);

    const headers: Record<string, string> = {};
    if (req.headers.authorization) {
      headers['authorization'] = req.headers.authorization as string;
    }
    if (req.headers['x-tenant-slug']) {
      headers['x-tenant-slug'] = req.headers['x-tenant-slug'] as string;
    }
    if (req.headers['x-user-id']) {
      headers['x-user-id'] = req.headers['x-user-id'] as string;
    }
    if (req.headers.cookie) {
      headers['cookie'] = req.headers.cookie as string;
    }
    headers['content-type'] = 'application/json';

    const response = await firstValueFrom(
      this.httpService.request({
        method: req.method as any,
        url,
        headers,
        data: req.body,
        params: req.query,
        // Don't throw on 4xx so we can pass error responses through.
        validateStatus: () => true,
      }),
    );

    const setCookieHeader = response.headers['set-cookie'];
    return {
      status: response.status,
      data: response.data,
      setCookie: Array.isArray(setCookieHeader)
        ? setCookieHeader
        : setCookieHeader
          ? [setCookieHeader as string]
          : undefined,
    };
  }

  getServiceNames(): string[] {
    return Object.keys(this.serviceMap);
  }
}
