'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ht-ink px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl bg-grad-primary bg-clip-text text-transparent">
            Hamro Tourist
          </h1>
          <p className="font-body text-ht-soft mt-2">Super Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ht-surface border border-ht-border rounded-xl2 p-8 space-y-5">
          {error && (
            <div className="bg-ht-rose/10 border border-ht-rose/30 rounded-xl px-4 py-3 text-sm text-ht-rose font-body">
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
              className="w-full px-4 py-3 bg-ht-surface2 border border-ht-border rounded-xl font-body text-sm text-ht-text placeholder:text-ht-soft/50 focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="admin@hamrotourist.com"
            />
          </div>

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-ht-surface2 border border-ht-border rounded-xl font-body text-sm text-ht-text placeholder:text-ht-soft/50 focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-grad-primary text-white font-body font-semibold rounded-full hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
