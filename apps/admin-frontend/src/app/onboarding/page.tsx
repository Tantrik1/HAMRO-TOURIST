'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { apiPost, apiPatch } from '@/lib/api';

const POPULAR_COUNTRIES = [
  'Nepal', 'India', 'Bhutan', 'Tibet', 'Pakistan', 'Sri Lanka',
  'Thailand', 'Vietnam', 'Indonesia', 'Maldives', 'Japan', 'China',
];

export default function OnboardingPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setUser = useAuthStore((s) => s.setUser);

  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [yearEstablished, setYearEstablished] = useState<number>(new Date().getFullYear());
  const [aboutCompany, setAboutCompany] = useState('');
  const [countriesServed, setCountriesServed] = useState<string[]>([]);
  const [customCountry, setCustomCountry] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuth) router.replace('/auth?mode=login');
    if (!isLoading && user?.tenantSlug) router.replace('/dashboard');
  }, [isAuth, isLoading, user, router]);

  function slugify(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50);
  }

  function toggleCountry(c: string) {
    setCountriesServed((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }

  function addCustomCountry() {
    const trimmed = customCountry.trim();
    if (trimmed && !countriesServed.includes(trimmed)) {
      setCountriesServed([...countriesServed, trimmed]);
    }
    setCustomCountry('');
  }

  async function handleSubmit() {
    setError('');
    setBusy(true);
    const slug = slugify(companyName);
    if (!slug || slug.length < 3) {
      setError('Company name must produce a valid 3+ char slug');
      setBusy(false);
      return;
    }
    const res = await apiPost<{ slug: string }>('/tenants', {
      companyName,
      slug,
      yearEstablished,
      aboutCompany,
      countriesServed,
      ownerUserId: user?.id,
    });
    if (!res.success) {
      setError(res.error.message);
      setBusy(false);
      return;
    }
    // Persist tenant on user
    await apiPatch('/auth/tenant', { tenantSlug: slug });
    if (user) setUser({ ...user, tenantSlug: slug });
    router.replace('/dashboard');
  }

  return (
    <main className="min-h-screen bg-ht-ink flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-ht-violet rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-ht-cyan rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-ht-text mb-2">
            Welcome{user?.firstName ? `, ${user.firstName}` : ''}! <span className="inline-block animate-float">👋</span>
          </h1>
          <p className="text-ht-soft">Let's get your travel agency set up. This takes about a minute.</p>
        </div>

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-8 shadow-card">
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all ${
                  step >= i ? 'bg-grad-primary' : 'bg-ht-border'
                }`} />
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <Step title="Company name" subtitle="What's the name of your travel agency?">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Himalayan Adventures Co."
                className="w-full px-4 py-3 bg-ht-ink border border-ht-border rounded-md text-ht-text text-lg focus:border-ht-violet focus:outline-none"
                autoFocus
              />
              {companyName && (
                <p className="mt-2 text-xs text-ht-soft">
                  Your subdomain will be: <span className="font-mono text-ht-cyan">{slugify(companyName)}.hamrotourist.com</span>
                </p>
              )}
            </Step>
          )}

          {step === 2 && (
            <Step title="Year established" subtitle="When did your agency start operating?">
              <input
                type="number"
                value={yearEstablished}
                onChange={(e) => setYearEstablished(parseInt(e.target.value || '0'))}
                min={1900}
                max={new Date().getFullYear()}
                className="w-full px-4 py-3 bg-ht-ink border border-ht-border rounded-md text-ht-text text-lg font-mono focus:border-ht-violet focus:outline-none"
              />
            </Step>
          )}

          {step === 3 && (
            <Step title="About your company" subtitle="A short description that will appear on your homepage.">
              <textarea
                value={aboutCompany}
                onChange={(e) => setAboutCompany(e.target.value)}
                rows={5}
                maxLength={2000}
                placeholder="We are a family-run agency specializing in Himalayan treks..."
                className="w-full px-4 py-3 bg-ht-ink border border-ht-border rounded-md text-ht-text focus:border-ht-violet focus:outline-none resize-none"
              />
              <div className="text-xs text-ht-text-faint text-right mt-1">{aboutCompany.length}/2000</div>
            </Step>
          )}

          {step === 4 && (
            <Step title="Countries you serve" subtitle="Pick the destinations your agency operates in.">
              <div className="flex flex-wrap gap-2 mb-4">
                {POPULAR_COUNTRIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCountry(c)}
                    className={`px-3 py-1.5 rounded-full text-sm font-body border transition-all ${
                      countriesServed.includes(c)
                        ? 'bg-grad-primary border-transparent text-white shadow-glow-violet'
                        : 'border-ht-border text-ht-soft hover:border-ht-violet hover:text-ht-text'
                    }`}
                  >
                    {countriesServed.includes(c) && '✓ '}{c}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomCountry(); } }}
                  placeholder="Add another country..."
                  className="flex-1 px-3 py-2 bg-ht-ink border border-ht-border rounded-md text-ht-text focus:border-ht-violet focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCustomCountry}
                  className="px-4 py-2 rounded-md border border-ht-border text-ht-soft hover:border-ht-violet hover:text-ht-text"
                >
                  Add
                </button>
              </div>
              {countriesServed.filter((c) => !POPULAR_COUNTRIES.includes(c)).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {countriesServed.filter((c) => !POPULAR_COUNTRIES.includes(c)).map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-sm bg-ht-cyan/15 text-ht-cyan border border-ht-cyan/30">
                      {c} <button onClick={() => toggleCountry(c)} className="ml-1 hover:text-ht-rose">×</button>
                    </span>
                  ))}
                </div>
              )}
            </Step>
          )}

          <div className="flex justify-between gap-3 mt-8">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2.5 rounded-full border border-ht-border text-ht-soft hover:border-ht-violet hover:text-ht-text"
              >
                Back
              </button>
            ) : <span />}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !companyName.trim()) ||
                  (step === 3 && aboutCompany.trim().length < 10)
                }
                className="px-6 py-2.5 rounded-full bg-grad-primary text-white font-semibold hover:shadow-glow-violet disabled:opacity-50"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={busy || countriesServed.length === 0}
                className="px-8 py-2.5 rounded-full bg-grad-primary text-white font-semibold hover:shadow-glow-violet disabled:opacity-50"
              >
                {busy ? 'Setting up…' : 'Take me to my dashboard →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-2xl font-bold text-ht-text mb-1">{title}</h2>
      <p className="text-sm text-ht-soft mb-5">{subtitle}</p>
      {children}
    </div>
  );
}
