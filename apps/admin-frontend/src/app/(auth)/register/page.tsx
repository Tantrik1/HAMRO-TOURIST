'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function RegisterPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'details'>('email');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', companyName: '', otp: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const sendOtp = useAuthStore((s) => s.sendOtp);
  const verifyAndRegister = useAuthStore((s) => s.verifyAndRegister);
  const router = useRouter();

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await sendOtp(form.email);
    setLoading(false);
    if (result.success) {
      setOtpSent(true);
      setStep('otp');
    } else {
      setError(result.error || 'Failed to send verification code');
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setStep('details');
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await verifyAndRegister({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      otp: form.otp,
    });
    setLoading(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-ht-ink px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold bg-grad-primary bg-clip-text text-transparent">
            Hamro Tourist
          </h1>
          <p className="text-ht-soft font-body mt-2">Create your travel agency account</p>
        </div>

        <form onSubmit={step === 'email' ? handleSendOtp : step === 'otp' ? handleVerifyOtp : handleSubmit} className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">
              {error}
            </div>
          )}

          {step === 'email' && (
            <>
              <div>
                <label className="block font-body text-sm text-ht-soft mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                  placeholder="you@agency.com" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
                {loading ? 'Sending code...' : 'Send Verification Code'}
              </button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div>
                <label className="block font-body text-sm text-ht-soft mb-1.5">Verification Code</label>
                <input type="text" value={form.otp} onChange={(e) => update('otp', e.target.value)} required maxLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px] text-center tracking-widest"
                  placeholder="123456" />
                <p className="text-xs text-ht-soft mt-2">Enter the 6-digit code sent to your email</p>
              </div>
              <button type="submit" disabled={loading || form.otp.length !== 6}
                className="w-full py-3.5 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <button type="button" onClick={() => setStep('email')}
                className="w-full py-3.5 rounded-full font-body font-semibold text-base text-ht-soft bg-ht-ink border border-ht-border hover:border-ht-violet transition-all duration-200 min-h-[48px]">
                Back
              </button>
            </>
          )}

          {step === 'details' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-sm text-ht-soft mb-1.5">First Name</label>
                  <input type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                    placeholder="John" />
                </div>
                <div>
                  <label className="block font-body text-sm text-ht-soft mb-1.5">Last Name</label>
                  <input type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                    placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm text-ht-soft mb-1.5">Company Name</label>
                <input type="text" value={form.companyName} onChange={(e) => update('companyName', e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                  placeholder="Adventure Travel Co." />
              </div>

              <div>
                <label className="block font-body text-sm text-ht-soft mb-1.5">Password</label>
                <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={8}
                  className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                  placeholder="Min 8 characters" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
              <button type="button" onClick={() => setStep('otp')}
                className="w-full py-3.5 rounded-full font-body font-semibold text-base text-ht-soft bg-ht-ink border border-ht-border hover:border-ht-violet transition-all duration-200 min-h-[48px]">
                Back
              </button>
            </>
          )}

          <p className="text-center text-sm font-body text-ht-soft">
            Already have an account?{' '}
            <a href="/login" className="text-ht-violet hover:underline">Sign in</a>
          </p>
          {step === 'email' && (
            <p className="text-center text-xs font-body text-ht-soft">
              We'll send you a verification code to confirm your email
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
