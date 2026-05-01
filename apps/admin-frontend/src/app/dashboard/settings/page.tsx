'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { apiPatch } from '@/lib/api';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await apiPatch('/auth/profile', { firstName, lastName });
    setSaving(false);
    if (res.success) {
      setMessage('Profile updated!');
    } else {
      setMessage('Failed to update');
    }
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">Settings</h1>
        <p className="font-body text-ht-soft mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <div className="max-w-xl">
        <h2 className="font-display font-bold text-xl text-ht-text mb-4">Profile</h2>
        <form onSubmit={handleSave} className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet min-h-[44px]" />
            </div>
          </div>

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Email</label>
            <input type="email" value={user?.email || ''} disabled
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-soft font-body text-sm min-h-[44px] cursor-not-allowed" />
          </div>

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Tenant</label>
            <input type="text" value={user?.tenantSlug || 'Not set'} disabled
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-soft font-mono text-sm min-h-[44px] cursor-not-allowed" />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-full font-body font-semibold text-sm text-white bg-grad-primary hover:shadow-glow-violet transition-all min-h-[44px] disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {message && <span className="font-body text-sm text-[#84CC16]">{message}</span>}
          </div>
        </form>
      </div>

      {/* Billing section */}
      <div className="max-w-xl mt-10">
        <h2 className="font-display font-bold text-xl text-ht-text mb-4">Billing & Plan</h2>
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-body text-sm text-ht-soft">Current Plan</p>
              <p className="font-display font-bold text-2xl text-ht-text">Free</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#84CC16]/15 text-[#84CC16] border border-[#84CC16]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-current" /> Active
            </span>
          </div>
          <a href="/dashboard/billing"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm text-white bg-grad-warm hover:shadow-glow-coral transition-all min-h-[44px]">
            Upgrade Plan
          </a>
        </div>
      </div>
    </div>
  );
}
