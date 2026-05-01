'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-ht-ink px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold bg-grad-primary bg-clip-text text-transparent">
            Hamro Tourist
          </h1>
          <p className="text-ht-soft font-body mt-2">Sign in to your agency dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">
              {error}
            </div>
          )}

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="you@agency.com"
            />
          </div>

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-ht-text-faint focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm font-body text-ht-soft">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-ht-violet hover:underline">Create one</a>
          </p>
        </form>
      </div>
    </main>
  );
}
