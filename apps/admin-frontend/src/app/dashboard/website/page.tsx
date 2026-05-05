'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Globe2, Sparkles, Check, ArrowRight, Loader2, Lock } from 'lucide-react';
import { apiGet, apiPatch, apiPost } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

interface Tenant {
  id: string;
  slug: string;
  companyName: string;
  themeSlug: string | null;
  published: boolean;
  publishedAt: string | null;
  customDomain: string | null;
  customDomainStatus: string;
}

interface Plan {
  canUseCustomDomain: boolean;
}

const THEMES = [
  {
    id: 'adventure-bold',
    name: 'Adventure Bold',
    tagline: 'For trekking & expedition outfits',
    desc: 'Dark, dramatic, glow effects. Perfect for high-adrenaline content.',
    icon: '🏔️',
    grad: 'from-ht-violet to-ht-coral',
  },
  {
    id: 'serene-journey',
    name: 'Serene Journey',
    tagline: 'For wellness & yoga retreats',
    desc: 'Light, photography-first, calm typography.',
    icon: '🧘',
    grad: 'from-ht-cyan to-ht-lime',
  },
  {
    id: 'heritage-classic',
    name: 'Heritage Classic',
    tagline: 'For cultural & historical tours',
    desc: 'Warm tones, traditional feel, editorial layouts.',
    icon: '🏛️',
    grad: 'from-ht-coral to-ht-rose',
  },
];

export default function WebsitePage() {
  const user = useAuthStore((s) => s.user);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [customDomain, setCustomDomain] = useState('');

  async function reload() {
    if (!user?.tenantSlug) return;
    const t = await apiGet<Tenant>(`/tenants/${user.tenantSlug}`);
    if (t.success) setTenant(t.data);
    const p = await apiGet<Plan>(`/tenants/${user.tenantSlug}/limits`);
    if (p.success) setPlan(p.data);
    setLoading(false);
  }

  useEffect(() => { reload(); }, [user?.tenantSlug]);

  async function pickTheme(themeSlug: string) {
    if (!user?.tenantSlug) return;
    setBusy(true);
    const res = await apiPatch<Tenant>(`/tenants/${user.tenantSlug}/theme`, { themeSlug });
    if (res.success) {
      setTenant(res.data);
      setMessage('Theme set!');
    } else {
      setError(res.error.message);
    }
    setBusy(false);
    setTimeout(() => { setMessage(''); setError(''); }, 3000);
  }

  async function publish() {
    if (!user?.tenantSlug) return;
    setBusy(true);
    setError('');
    const res = await apiPost<Tenant>(`/tenants/${user.tenantSlug}/publish`, {});
    if (res.success) {
      setTenant(res.data);
      setMessage('🎉 Your website is live!');
    } else {
      setError(res.error.message);
    }
    setBusy(false);
    setTimeout(() => setMessage(''), 6000);
  }

  async function connectDomain() {
    if (!customDomain.trim() || !user?.tenantSlug) return;
    setBusy(true);
    setError('');
    const res = await apiPost(`/domains`, {
      domain: customDomain.trim(),
      tenantSlug: user.tenantSlug,
    });
    if (res.success) {
      setMessage('Domain submitted! Verification in progress.');
      setCustomDomain('');
      reload();
    } else {
      setError(res.error.message);
    }
    setBusy(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-ht-violet animate-spin" />
      </div>
    );
  }

  const liveUrl = `https://${tenant?.slug}.hamrotourist.com`;
  const hasTheme = !!tenant?.themeSlug;
  const isPublished = !!tenant?.published;
  const canCustomDomain = plan?.canUseCustomDomain ?? false;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-ht-text">Website Preview</h1>
          <p className="font-body text-ht-soft mt-1">
            Pick a theme, publish your site, and connect your domain.
          </p>
        </div>
        <a
          href="/dashboard/builder"
          className="inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-5 py-2.5 hover:shadow-glow-violet transition-all text-sm"
        >
          Open Builder
          <Sparkles className="w-4 h-4" />
        </a>
      </div>

      {message && (
        <div className="p-4 rounded-xl2 bg-ht-lime/10 border border-ht-lime/30 text-ht-lime text-sm animate-fade-in">
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl2 bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Theme picker */}
      <section>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-mono text-2xl bg-grad-primary bg-clip-text text-transparent">01</span>
          <h2 className="font-display text-xl font-bold">Choose your theme</h2>
          {hasTheme && <Check className="w-5 h-5 text-ht-lime" />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {THEMES.map((theme) => {
            const isActive = tenant?.themeSlug === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => pickTheme(theme.id)}
                disabled={busy}
                className={`text-left bg-ht-surface border rounded-xl2 overflow-hidden transition-all group disabled:opacity-50 ${
                  isActive
                    ? 'border-ht-violet shadow-glow-violet'
                    : 'border-ht-border hover:border-ht-violet/40 hover:shadow-card-hover'
                }`}
              >
                <div className={`aspect-video bg-gradient-to-br ${theme.grad} relative flex items-center justify-center`}>
                  <span className="text-5xl group-hover:scale-110 transition-transform">{theme.icon}</span>
                  {isActive && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-ht-violet flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-base text-ht-text">{theme.name}</h3>
                  <p className="text-xs text-ht-soft mt-0.5">{theme.tagline}</p>
                  <p className="text-xs text-ht-text-faint mt-2">{theme.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Publish */}
      <section>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-mono text-2xl bg-grad-primary bg-clip-text text-transparent">02</span>
          <h2 className="font-display text-xl font-bold">Publish your site</h2>
          {isPublished && <Check className="w-5 h-5 text-ht-lime" />}
        </div>
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          {!hasTheme ? (
            <p className="text-sm text-ht-soft">Pick a theme above first.</p>
          ) : isPublished ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="text-sm text-ht-soft mb-1">Your site is live at:</p>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-lg text-ht-cyan hover:underline inline-flex items-center gap-1"
                >
                  {tenant?.slug}.hamrotourist.com
                  <ExternalLink className="w-4 h-4" />
                </a>
                {tenant?.publishedAt && (
                  <p className="text-xs text-ht-text-faint mt-1">
                    Published {new Date(tenant.publishedAt).toLocaleString()}
                  </p>
                )}
              </div>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-5 py-2.5 hover:shadow-glow-violet"
              >
                <Globe2 className="w-4 h-4" />
                View live site
              </a>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="text-sm text-ht-text">Once published, your site will go live at:</p>
                <p className="font-mono text-base text-ht-cyan mt-1">{tenant?.slug}.hamrotourist.com</p>
              </div>
              <button
                onClick={publish}
                disabled={busy}
                className="inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-6 py-2.5 hover:shadow-glow-violet hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Publish website
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Step 3: Custom domain (gated by plan) */}
      <section>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-mono text-2xl bg-grad-primary bg-clip-text text-transparent">03</span>
          <h2 className="font-display text-xl font-bold">Connect a custom domain</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-ht-coral/15 text-ht-coral border border-ht-coral/30 font-mono">
            Optional
          </span>
        </div>

        {!canCustomDomain ? (
          <div className="bg-grad-surface border border-ht-coral/30 rounded-xl2 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-ht-coral rounded-full blur-3xl opacity-20" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-ht-coral" />
                <h3 className="font-display text-lg font-bold text-ht-text">Upgrade to use a custom domain</h3>
              </div>
              <p className="text-sm text-ht-soft mb-5 max-w-xl">
                On the Pro plan ($29/mo), connect <span className="font-mono text-ht-text">yourcompany.com</span> directly to your site.
                We handle DNS verification, SSL provisioning, and everything else.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-ht-soft">
                {[
                  'Use your own domain (yourcompany.com)',
                  'Automatic SSL via Cloudflare',
                  'Up to 5 team members',
                  'Custom HTML/CSS injection',
                  'API access',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-ht-lime" />
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="/dashboard/settings#billing"
                className="inline-flex items-center gap-2 bg-grad-warm text-white font-semibold rounded-full px-6 py-2.5 hover:shadow-glow-coral"
              >
                Upgrade to Pro <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : tenant?.customDomain ? (
          <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-mono text-lg text-ht-text">{tenant.customDomain}</p>
                <p className="text-xs text-ht-text-faint mt-1">
                  Status: <span className="text-ht-coral capitalize">{tenant.customDomainStatus}</span>
                </p>
              </div>
              <a
                href={`https://${tenant.customDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ht-cyan hover:text-ht-text"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            {tenant.customDomainStatus !== 'active' && (
              <div className="text-xs text-ht-soft bg-ht-ink border border-ht-border rounded-md p-3 font-mono">
                Add this CNAME record to your DNS:<br />
                <span className="text-ht-cyan">{tenant.customDomain}</span> → <span className="text-ht-cyan">{tenant.slug}.hamrotourist.com</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
            <p className="text-sm text-ht-soft mb-4">
              Point your own domain to your Hamro Tourist site. We'll guide you through the DNS setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourcompany.com"
                className="flex-1 px-4 py-2.5 bg-ht-ink border border-ht-border rounded-md text-ht-text font-mono focus:border-ht-violet focus:outline-none"
              />
              <button
                onClick={connectDomain}
                disabled={busy || !customDomain.trim()}
                className="inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-6 py-2.5 hover:shadow-glow-violet disabled:opacity-50 whitespace-nowrap"
              >
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe2 className="w-4 h-4" />}
                Connect domain
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
