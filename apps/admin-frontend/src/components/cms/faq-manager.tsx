'use client';

export interface FaqRow {
  question: string;
  answer: string;
  sortOrder?: number;
  isActive?: boolean;
}

interface FaqManagerProps {
  value: FaqRow[];
  onChange: (next: FaqRow[]) => void;
}

export default function FaqManager({ value, onChange }: FaqManagerProps) {
  function add() {
    onChange([...value, { question: '', answer: '', isActive: true }]);
  }
  function update(idx: number, patch: Partial<FaqRow>) {
    const next = [...value];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  }
  function removeAt(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function move(idx: number, dir: -1 | 1) {
    const next = [...value];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-lg text-ht-text">FAQs</h3>
          <p className="font-body text-xs text-ht-muted">Answer common questions to improve SEO and conversions.</p>
        </div>
        <button type="button" onClick={add}
          className="px-4 py-2 rounded-lg font-body text-sm text-ht-text border border-ht-border hover:border-ht-violet transition-all">
          + Add FAQ
        </button>
      </div>

      {value.length === 0 && <p className="text-sm text-ht-soft font-body">No FAQs yet.</p>}

      {value.map((faq, idx) => (
        <div key={idx} className="rounded-xl border border-ht-border bg-ht-ink/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-ht-muted">FAQ #{idx + 1}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
                className="w-7 h-7 rounded-lg border border-ht-border text-ht-soft hover:text-ht-violet hover:border-ht-violet disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(idx, 1)} disabled={idx === value.length - 1}
                className="w-7 h-7 rounded-lg border border-ht-border text-ht-soft hover:text-ht-violet hover:border-ht-violet disabled:opacity-30">↓</button>
              <label className="flex items-center gap-1.5 text-xs font-body text-ht-soft ml-2">
                <input type="checkbox" checked={faq.isActive ?? true}
                  onChange={(e) => update(idx, { isActive: e.target.checked })}
                  className="w-4 h-4 accent-ht-violet" />
                Active
              </label>
              <button type="button" onClick={() => removeAt(idx)}
                className="px-2 py-1 ml-1 text-ht-rose hover:text-ht-rose/80 font-body text-xs">Remove</button>
            </div>
          </div>
          <input type="text" value={faq.question} onChange={(e) => update(idx, { question: e.target.value })}
            placeholder="Question"
            className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
          <textarea rows={3} value={faq.answer} onChange={(e) => update(idx, { answer: e.target.value })}
            placeholder="Answer"
            className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none" />
        </div>
      ))}
    </div>
  );
}
