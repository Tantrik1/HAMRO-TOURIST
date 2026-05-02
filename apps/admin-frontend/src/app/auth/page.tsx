'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';

type Mode = 'login' | 'signup';
type Step = 'form' | 'otp' | 'verifying';

function AuthInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initialMode = (params.get('mode') === 'signup' ? 'signup' : 'login') as Mode;
  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  const sendOtp = useAuthStore((s) => s.sendOtp);
  const verifyAndRegister = useAuthStore((s) => s.verifyAndRegister);
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuth && user) {
      if (!user.tenantSlug) router.replace('/onboarding');
      else router.replace('/dashboard');
    }
  }, [isAuth, user, router]);

  async function handleSignupStart(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const res = await sendOtp(email);
    setBusy(false);
    if (res.success) {
      setInfo(`We've sent a 6-digit code to ${email}. Check your inbox.`);
      setStep('otp');
    } else {
      setError(res.error || 'Failed to send OTP');
    }
  }

  async function handleVerifyAndRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const res = await verifyAndRegister({ email, password, firstName, lastName, otp });
    setBusy(false);
    if (res.success) {
      router.replace('/onboarding');
    } else {
      setError(res.error || 'Registration failed');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const res = await login(email, password);
    setBusy(false);
    if (res.success) {
      router.replace('/dashboard');
    } else {
      setError(res.error || 'Login failed');
    }
  }

  return (
    <main className="min-h-screen bg-ht-ink flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ht-violet rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ht-cyan rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md">
        <Link href="/" className="block mb-8 text-center">
          <h1 className="font-display text-3xl font-bold bg-grad-primary bg-clip-text text-transparent">
            Hamro Tourist
          </h1>
        </Link>

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-8 shadow-card">
          <div className="grid grid-cols-2 gap-2 p-1 bg-ht-ink rounded-full mb-6">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setStep('form'); setError(''); setInfo(''); }}
                className={`py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
                  mode === m
                    ? 'bg-grad-primary text-white shadow-glow-violet'
                    : 'text-ht-soft hover:text-ht-text'
                }`}
              >
                {m === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm">
              {error}
            </div>
          )}
          {info && (
            <div className="mb-4 p-3 rounded-md bg-ht-cyan/10 border border-ht-cyan/30 text-ht-cyan text-sm">
              {info}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Field label="Email" type="email" value={email} onChange={setEmail} required />
              <Field label="Password" type="password" value={password} onChange={setPassword} required />
              <SubmitBtn busy={busy} label="Sign in" />
            </form>
          ) : step === 'form' ? (
            <form onSubmit={handleSignupStart} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" value={firstName} onChange={setFirstName} required />
                <Field label="Last name" value={lastName} onChange={setLastName} required />
              </div>
              <Field label="Email" type="email" value={email} onChange={setEmail} required />
              <Field label="Password" type="password" value={password} onChange={setPassword} required minLength={8} />
              <SubmitBtn busy={busy} label="Send verification code →" />
              <p className="text-xs text-ht-text-faint text-center pt-2">
                We'll email you a 6-digit code to verify your email.
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-4">
              <div className="text-sm text-ht-soft text-center">
                Enter the 6-digit code sent to <span className="text-ht-text font-mono">{email}</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                className="w-full text-center text-3xl tracking-[0.5em] font-mono py-4 bg-ht-ink border border-ht-border rounded-lg text-ht-text focus:border-ht-violet focus:outline-none"
                required
              />
              <SubmitBtn busy={busy} label="Verify & create account" />
              <button
                type="button"
                onClick={() => { setStep('form'); setOtp(''); setInfo(''); }}
                className="w-full text-xs text-ht-soft hover:text-ht-text"
              >
                ← Use a different email
              </button>
              <button
                type="button"
                onClick={async () => {
                  setBusy(true);
                  const res = await sendOtp(email);
                  setBusy(false);
                  setInfo(res.success ? 'New code sent.' : '');
                  if (!res.success) setError(res.error || 'Could not resend');
                }}
                className="w-full text-xs text-ht-cyan hover:underline"
              >
                Resend code
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-ht-text-faint">
          By continuing you agree to our Terms and Privacy.
        </p>
      </div>
    </main>
  );
}

function Field({ label, type = 'text', value, onChange, required, minLength }: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-body text-ht-soft uppercase tracking-wider">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="mt-1 w-full px-3 py-2.5 bg-ht-ink border border-ht-border rounded-md text-ht-text font-body focus:border-ht-violet focus:outline-none transition-colors"
      />
    </label>
  );
}

function SubmitBtn({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="w-full py-3 rounded-full bg-grad-primary text-white font-body font-semibold hover:shadow-glow-violet hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {busy ? 'Please wait…' : label}
    </button>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthInner />
    </Suspense>
  );
}
