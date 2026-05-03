import { Controller, All, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@ApiTags('Proxy')
@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  // Auth
  @All('auth') async proxyAuthRoot(@Req() req: Request, @Res() res: Response) { return this.forward('auth', req, res); }
  @All('auth/*') @ApiOperation({ summary: 'Proxy to Auth Service' })
  async proxyAuth(@Req() req: Request, @Res() res: Response) { return this.forward('auth', req, res); }

  // Tenants
  @All('tenants') async proxyTenantsRoot(@Req() req: Request, @Res() res: Response) { return this.forward('tenants', req, res); }
  @All('tenants/*') @ApiOperation({ summary: 'Proxy to Tenant Service' })
  async proxyTenants(@Req() req: Request, @Res() res: Response) { return this.forward('tenants', req, res); }

  // Products
  @All('products') async proxyProductsRoot(@Req() req: Request, @Res() res: Response) { return this.forward('products', req, res); }
  @All('products/*') @ApiOperation({ summary: 'Proxy to Product Service' })
  async proxyProducts(@Req() req: Request, @Res() res: Response) { return this.forward('products', req, res); }

  // Websites
  @All('websites') async proxyWebsitesRoot(@Req() req: Request, @Res() res: Response) { return this.forward('websites', req, res); }
  @All('websites/*') @ApiOperation({ summary: 'Proxy to Website Builder Service' })
  async proxyWebsites(@Req() req: Request, @Res() res: Response) { return this.forward('websites', req, res); }

  // Media
  @All('media') async proxyMediaRoot(@Req() req: Request, @Res() res: Response) { return this.forward('media', req, res); }
  @All('media/*') @ApiOperation({ summary: 'Proxy to Media Service' })
  async proxyMedia(@Req() req: Request, @Res() res: Response) { return this.forward('media', req, res); }

  // Domains
  @All('domains') async proxyDomainsRoot(@Req() req: Request, @Res() res: Response) { return this.forward('domains', req, res); }
  @All('domains/*') @ApiOperation({ summary: 'Proxy to Domain Service' })
  async proxyDomains(@Req() req: Request, @Res() res: Response) { return this.forward('domains', req, res); }

  // CRM
  @All('crm') async proxyCrmRoot(@Req() req: Request, @Res() res: Response) { return this.forward('crm', req, res); }
  @All('crm/*') @ApiOperation({ summary: 'Proxy to CRM Service' })
  async proxyCrm(@Req() req: Request, @Res() res: Response) { return this.forward('crm', req, res); }

  // Notifications
  @All('notifications') async proxyNotificationsRoot(@Req() req: Request, @Res() res: Response) { return this.forward('notifications', req, res); }
  @All('notifications/*') @ApiOperation({ summary: 'Proxy to Notification Service' })
  async proxyNotifications(@Req() req: Request, @Res() res: Response) { return this.forward('notifications', req, res); }

  // Billing
  @All('billing') async proxyBillingRoot(@Req() req: Request, @Res() res: Response) { return this.forward('billing', req, res); }
  @All('billing/*') @ApiOperation({ summary: 'Proxy to Billing Service' })
  async proxyBilling(@Req() req: Request, @Res() res: Response) { return this.forward('billing', req, res); }

  // Bookings
  @All('bookings') async proxyBookingsRoot(@Req() req: Request, @Res() res: Response) { return this.forward('bookings', req, res); }
  @All('bookings/*') @ApiOperation({ summary: 'Proxy to Booking Service' })
  async proxyBookings(@Req() req: Request, @Res() res: Response) { return this.forward('bookings', req, res); }

  private async forward(service: string, req: Request, res: Response): Promise<void> {
    try {
      const upstream = await this.proxyService.forward(service, req);
      if (upstream.setCookie?.length) {
        res.setHeader('Set-Cookie', upstream.setCookie);
      }
      res.status(upstream.status).json(upstream.data);
    } catch (error: any) {
      const status = error.response?.status || 502;
      const data = error.response?.data || {
        success: false,
        error: { code: 'GATEWAY_ERROR', message: error.message || 'Upstream service unreachable' },
      };
      res.status(status).json(data);
    }
  }
}
