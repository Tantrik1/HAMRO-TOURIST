'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '@/lib/api';

interface Setting {
  key: string;
  value: unknown;
  updatedAt: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  const loadSettings = async () => {
    const res = await apiGet<Setting[]>('/tenants/admin/settings');
    if (res.success) setSettings(res.data);
  };

  useEffect(() => { loadSettings(); }, []);

  const handleSave = async (key: string) => {
    setSaving(true);
    let parsed: unknown;
    try {
      parsed = JSON.parse(editValue);
    } catch {
      parsed = editValue;
    }
    await apiPost('/tenants/admin/settings', { key, value: String(parsed) });
    setSaving(false);
    setEditKey(null);
    loadSettings();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">System Settings</h1>
        <p className="font-body text-ht-soft mt-1">Platform-wide configuration</p>
      </div>

      <div className="space-y-4">
        {settings.map((s) => (
          <div key={s.key} className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-mono text-sm text-ht-text">{s.key}</h3>
              {editKey !== s.key ? (
                <button
                  onClick={() => { setEditKey(s.key); setEditValue(JSON.stringify(s.value)); }}
                  className="font-body text-xs text-ht-coral hover:text-ht-coral transition-colors"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(s.key)}
                    disabled={saving}
                    className="font-body text-xs text-ht-lime hover:text-ht-lime transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setEditKey(null)}
                    className="font-body text-xs text-ht-soft hover:text-ht-text transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            {editKey === s.key ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-4 py-3 bg-ht-surface2 border border-ht-border rounded-xl font-mono text-sm text-ht-text focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              />
            ) : (
              <p className="font-mono text-sm text-ht-soft bg-ht-surface2 px-4 py-3 rounded-xl">
                {JSON.stringify(s.value)}
              </p>
            )}
          </div>
        ))}
        {settings.length === 0 && (
          <div className="bg-ht-surface border border-ht-border rounded-xl2 p-12 text-center">
            <p className="font-body text-ht-soft">No settings configured yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
