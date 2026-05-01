/**
 * Cloudflare Worker — Tenant Resolution
 * Runs at the edge before requests hit the origin servers.
 * Extracts tenant slug from subdomain or custom domain via KV lookup.
 */

interface Env {
  DOMAIN_MAP: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname;

    // Case 1: subdomain of hamrotourist.com
    if (host.endsWith('.hamrotourist.com')) {
      const slug = host.replace('.hamrotourist.com', '');

      // Reserved subdomains — pass through without tenant context
      if (['app', 'api', 'admin', 'www', 'media', 'proxy', 'admin-proxy'].includes(slug)) {
        return fetch(request);
      }

      // Add tenant slug header and forward
      const modifiedRequest = new Request(request);
      modifiedRequest.headers.set('X-Tenant-Slug', slug);
      return fetch(modifiedRequest);
    }

    // Case 2: custom domain — lookup from KV store
    const tenantSlug = await env.DOMAIN_MAP.get(host);
    if (tenantSlug) {
      const modifiedRequest = new Request(request);
      modifiedRequest.headers.set('X-Tenant-Slug', tenantSlug);
      return fetch(modifiedRequest);
    }

    // Case 3: admin subdomain of custom domain (admin.agencyname.com)
    if (host.startsWith('admin.')) {
      const baseDomain = host.replace('admin.', '');
      const slug = await env.DOMAIN_MAP.get(baseDomain);
      if (slug) {
        const modifiedRequest = new Request(request);
        modifiedRequest.headers.set('X-Tenant-Slug', slug);
        modifiedRequest.headers.set('X-Admin-Mode', 'true');
        return fetch(modifiedRequest);
      }
    }

    return new Response('Agency not found', { status: 404 });
  },
};
