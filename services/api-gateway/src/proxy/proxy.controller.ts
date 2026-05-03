import { Controller, All, Req, Param, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ProxyService } from './proxy.service';

@ApiTags('Proxy')
@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*')
  @ApiOperation({ summary: 'Proxy to Auth Service' })
  async proxyAuth(@Req() req: Request) {
    return this.forward('auth', req);
  }

  @All('tenants/*')
  @ApiOperation({ summary: 'Proxy to Tenant Service' })
  async proxyTenants(@Req() req: Request) {
    return this.forward('tenants', req);
  }

  @All('products/*')
  @ApiOperation({ summary: 'Proxy to Product Service' })
  async proxyProducts(@Req() req: Request) {
    return this.forward('products', req);
  }

  @All('websites/*')
  @ApiOperation({ summary: 'Proxy to Website Builder Service' })
  async proxyWebsites(@Req() req: Request) {
    return this.forward('websites', req);
  }

  @All('media/*')
  @ApiOperation({ summary: 'Proxy to Media Service' })
  async proxyMedia(@Req() req: Request) {
    return this.forward('media', req);
  }

  @All('domains/*')
  @ApiOperation({ summary: 'Proxy to Domain Service' })
  async proxyDomains(@Req() req: Request) {
    return this.forward('domains', req);
  }

  @All('crm/*')
  @ApiOperation({ summary: 'Proxy to CRM Service' })
  async proxyCrm(@Req() req: Request) {
    return this.forward('crm', req);
  }

  @All('notifications/*')
  @ApiOperation({ summary: 'Proxy to Notification Service' })
  async proxyNotifications(@Req() req: Request) {
    return this.forward('notifications', req);
  }

  @All('billing/*')
  @ApiOperation({ summary: 'Proxy to Billing Service' })
  async proxyBilling(@Req() req: Request) {
    return this.forward('billing', req);
  }

  @All('bookings/*')
  @ApiOperation({ summary: 'Proxy to Booking Service' })
  async proxyBookings(@Req() req: Request) {
    return this.forward('bookings', req);
  }

  private async forward(service: string, req: Request) {
    try {
      return await this.proxyService.forward(service, req);
    } catch (error: any) {
      const status = error.response?.status || 500;
      const data = error.response?.data || {
        success: false,
        error: { code: 'GATEWAY_ERROR', message: error.message },
      };
      throw new HttpException(data, status);
    }
  }
}
