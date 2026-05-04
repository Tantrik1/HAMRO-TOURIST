'use client';

export interface GroupDiscountRow {
  minPax: number;
  maxPax?: number | null;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  label?: string;
  isActive?: boolean;
}

interface GroupDiscountManagerProps {
  value: GroupDiscountRow[];
  onChange: (next: GroupDiscountRow[]) => void;
  currency?: string;
}

export default function GroupDiscountManager({ value, onChange, currency = '$' }: GroupDiscountManagerProps) {
  function add() {
    onChange([...value, { minPax: 2, discountType: 'percent', discountValue: 10, isActive: true }]);
  }
  function update(idx: number, patch: Partial<GroupDiscountRow>) {
    const next = [...value];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  }
  function removeAt(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-lg text-ht-text">Group discounts</h3>
          <p className="font-body text-xs text-ht-muted">Auto-apply tiered discounts based on the number of travellers.</p>
        </div>
        <button type="button" onClick={add}
          className="px-4 py-2 rounded-lg font-body text-sm text-ht-text border border-ht-border hover:border-ht-violet transition-all">
          + Add tier
        </button>
      </div>

      {value.length === 0 && <p className="text-sm text-ht-soft font-body">No group discounts yet.</p>}

      {value.map((row, idx) => (
        <div key={idx} className="rounded-xl border border-ht-border bg-ht-ink/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-ht-muted">Tier #{idx + 1}</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs font-body text-ht-soft">
                <input type="checkbox" checked={row.isActive ?? true}
                  onChange={(e) => update(idx, { isActive: e.target.checked })}
                  className="w-4 h-4 accent-ht-violet" />
                Active
              </label>
              <button type="button" onClick={() => removeAt(idx)}
                className="text-ht-rose hover:text-ht-rose/80 font-body text-xs">Remove</button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-body text-xs text-ht-muted mb-1.5">Min pax *</label>
              <input type="number" min={1} value={row.minPax}
                onChange={(e) => update(idx, { minPax: Math.max(1, Number(e.target.value) || 1) })}
                className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-ht-muted mb-1.5">Max pax</label>
              <input type="number" min={1} value={row.maxPax ?? ''}
                onChange={(e) => update(idx, { maxPax: e.target.value ? Number(e.target.value) : null })}
                placeholder="(unlimited)"
                className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-ht-muted mb-1.5">Discount type</label>
              <select value={row.discountType}
                onChange={(e) => update(idx, { discountType: e.target.value as 'percent' | 'fixed' })}
                className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors">
                <option value="percent">Percent (%)</option>
                <option value="fixed">Fixed ({currency})</option>
              </select>
            </div>
            <div>
              <label className="block font-body text-xs text-ht-muted mb-1.5">Value *</label>
              <input type="number" min={0} step={0.01} value={row.discountValue}
                onChange={(e) => update(idx, { discountValue: Math.max(0, Number(e.target.value) || 0) })}
                className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
            </div>
          </div>
          <div>
            <label className="block font-body text-xs text-ht-muted mb-1.5">Label (optional)</label>
            <input type="text" value={row.label ?? ''}
              onChange={(e) => update(idx, { label: e.target.value })}
              placeholder="e.g. Group of friends"
              className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
          </div>
        </div>
      ))}
    </div>
  );
}
