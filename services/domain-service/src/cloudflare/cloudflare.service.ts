import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface CfCustomHostnameResponse {
  id: string;
  hostname: string;
  ssl: { status: string; method: string };
  status: string;
  ownership_verification?: { name: string; type: string; value: string };
}

@Injectable()
export class CloudflareService {
  private readonly logger = new Logger(CloudflareService.name);
  private readonly apiBase = 'https://api.cloudflare.com/client/v4';
  private readonly token: string;
  private readonly zoneId: string;

  constructor(private config: ConfigService) {
    this.token = this.config.get('CF_API_TOKEN', '');
    this.zoneId = this.config.get('CF_ZONE_ID', '');
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  async createCustomHostname(domain: string): Promise<CfCustomHostnameResponse | null> {
    try {
      const res = await fetch(`${this.apiBase}/zones/${this.zoneId}/custom_hostnames`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          hostname: domain,
          ssl: { method: 'http', type: 'dv', settings: { min_tls_version: '1.2' } },
        }),
      });
      const json = await res.json();
      if (json.success) return json.result;
      this.logger.error('CF create failed', json.errors);
      return null;
    } catch (err) {
      this.logger.error('CF create error', err);
      return null;
    }
  }

  async getCustomHostname(hostnameId: string): Promise<CfCustomHostnameResponse | null> {
    try {
      const res = await fetch(`${this.apiBase}/zones/${this.zoneId}/custom_hostnames/${hostnameId}`, {
        headers: this.headers,
      });
      const json = await res.json();
      if (json.success) return json.result;
      return null;
    } catch {
      return null;
    }
  }

  async deleteCustomHostname(hostnameId: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.apiBase}/zones/${this.zoneId}/custom_hostnames/${hostnameId}`, {
        method: 'DELETE',
        headers: this.headers,
      });
      const json = await res.json();
      return json.success;
    } catch {
      return false;
    }
  }
}
