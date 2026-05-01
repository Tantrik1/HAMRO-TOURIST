'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPatch, apiDelete } from '@/lib/api';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  tags: string[];
  createdAt: string;
}

interface Lead {
  id: string;
  contactId: string;
  title: string;
  status: string;
  value: number | null;
  currency: string;
  createdAt: string;
  contact?: Contact;
}

const statusColors: Record<string, string> = {
  new: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30',
  contacted: 'bg-ht-violet/15 text-ht-violet border-ht-violet/30',
  qualified: 'bg-[#F97316]/15 text-[#F97316] border-[#F97316]/30',
  proposal: 'bg-[#A78BFA]/15 text-[#A78BFA] border-[#A78BFA]/30',
  won: 'bg-[#84CC16]/15 text-[#84CC16] border-[#84CC16]/30',
  lost: 'bg-ht-rose/15 text-ht-rose border-ht-rose/30',
};

export default function CRMPage() {
  const [tab, setTab] = useState<'contacts' | 'leads'>('leads');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewContact, setShowNewContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', source: 'manual' });

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (tab === 'contacts') {
        const res = await apiGet<Contact[]>('/crm/contacts');
        setContacts(res.success ? res.data : []);
      } else {
        const res = await apiGet<Lead[]>('/crm/leads');
        setLeads(res.success ? res.data : []);
      }
      setLoading(false);
    }
    load();
  }, [tab]);

  async function createContact(e: React.FormEvent) {
    e.preventDefault();
    const res = await apiPost<Contact>('/crm/contacts', newContact);
    if (res.success) {
      setContacts((prev) => [res.data, ...prev]);
      setShowNewContact(false);
      setNewContact({ name: '', email: '', phone: '', source: 'manual' });
    }
  }

  async function updateLeadStatus(leadId: string, status: string) {
    const res = await apiPatch<Lead>(`/crm/leads/${leadId}/status`, { status });
    if (res.success) {
      setLeads((prev) => prev.map((l) => l.id === leadId ? res.data : l));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ht-text">CRM</h1>
          <p className="font-body text-ht-soft mt-1">Manage contacts and track your sales pipeline.</p>
        </div>
        {tab === 'contacts' && (
          <button onClick={() => setShowNewContact(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm text-white bg-grad-primary hover:shadow-glow-violet transition-all duration-200 min-h-[44px]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Contact
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-ht-surface border border-ht-border rounded-xl p-1 mb-6 w-fit">
        {(['leads', 'contacts'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-body text-sm capitalize transition-all min-h-[36px] ${
              tab === t ? 'bg-ht-violet text-white' : 'text-ht-soft hover:text-ht-text'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* New Contact Form */}
      {showNewContact && (
        <form onSubmit={createContact} className="bg-ht-surface border border-ht-border rounded-xl2 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" placeholder="Name" required value={newContact.name} onChange={(e) => setNewContact(p => ({ ...p, name: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet min-h-[44px]" />
            <input type="email" placeholder="Email" required value={newContact.email} onChange={(e) => setNewContact(p => ({ ...p, email: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet min-h-[44px]" />
            <input type="text" placeholder="Phone" value={newContact.phone} onChange={(e) => setNewContact(p => ({ ...p, phone: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet min-h-[44px]" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2 rounded-full font-body font-semibold text-sm text-white bg-grad-primary min-h-[40px]">Save</button>
            <button type="button" onClick={() => setShowNewContact(false)} className="px-6 py-2 rounded-full font-body text-sm text-ht-soft border border-ht-border min-h-[40px]">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-ht-surface border border-ht-border rounded-xl2 animate-pulse" />)}
        </div>
      ) : tab === 'contacts' ? (
        contacts.length === 0 ? (
          <div className="bg-ht-surface border border-ht-border rounded-xl2 p-12 text-center">
            <p className="font-body text-ht-soft">No contacts yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {contacts.map((c) => (
              <div key={c.id} className="bg-ht-surface border border-ht-border rounded-xl2 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-grad-primary flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-ht-text font-medium truncate">{c.name}</p>
                  <p className="font-body text-xs text-ht-soft truncate">{c.email}</p>
                </div>
                {c.source && <span className="font-mono text-[10px] text-ht-soft uppercase">{c.source}</span>}
                <span className="font-body text-xs text-ht-soft">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )
      ) : (
        leads.length === 0 ? (
          <div className="bg-ht-surface border border-ht-border rounded-xl2 p-12 text-center">
            <p className="font-body text-ht-soft">No leads yet. Leads are created when visitors submit contact forms.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-ht-surface border border-ht-border rounded-xl2 p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-ht-text font-medium truncate">{lead.title}</p>
                  {lead.value != null && (
                    <span className="font-mono text-xs text-[#F97316]">{lead.currency} {lead.value}</span>
                  )}
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${statusColors[lead.status] || statusColors.new}`}>
                  <span className="w-1 h-1 rounded-full bg-current" />{lead.status}
                </span>
                <select
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                  className="px-2 py-1 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-xs min-h-[32px]"
                >
                  {['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
