'use client';

export interface ItineraryDayRow {
  day: number;
  title: string;
  description?: string;
  accommodation?: string;
  meals?: string;
  altitude?: number;
}

interface ItineraryManagerProps {
  value: ItineraryDayRow[];
  onChange: (next: ItineraryDayRow[]) => void;
}

export default function ItineraryManager({ value, onChange }: ItineraryManagerProps) {
  function add() {
    const nextDay = value.length ? Math.max(...value.map((v) => v.day)) + 1 : 1;
    onChange([...value, { day: nextDay, title: '' }]);
  }
  function update(idx: number, patch: Partial<ItineraryDayRow>) {
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
    // Re-sequence day numbers
    next.forEach((d, i) => { d.day = i + 1; });
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-lg text-ht-text">Day-by-day itinerary</h3>
          <p className="font-body text-xs text-ht-muted">Break down the experience day-by-day so travellers know exactly what to expect.</p>
        </div>
        <button type="button" onClick={add}
          className="px-4 py-2 rounded-lg font-body text-sm text-ht-text border border-ht-border hover:border-ht-violet transition-all">
          + Add day
        </button>
      </div>

      {value.length === 0 && <p className="text-sm text-ht-soft font-body">No itinerary yet.</p>}

      {value.map((d, idx) => (
        <div key={idx} className="rounded-xl border border-ht-border bg-ht-ink/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-ht-violet/20 text-ht-violet font-mono font-semibold text-sm">{d.day}</span>
              <span className="font-display text-sm text-ht-text">Day {d.day}</span>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
                className="w-7 h-7 rounded-lg border border-ht-border text-ht-soft hover:text-ht-violet hover:border-ht-violet disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(idx, 1)} disabled={idx === value.length - 1}
                className="w-7 h-7 rounded-lg border border-ht-border text-ht-soft hover:text-ht-violet hover:border-ht-violet disabled:opacity-30">↓</button>
              <button type="button" onClick={() => removeAt(idx)}
                className="px-2 py-1 ml-1 text-ht-rose hover:text-ht-rose/80 font-body text-xs">Remove</button>
            </div>
          </div>

          <div>
            <label className="block font-body text-xs text-ht-muted mb-1.5">Title *</label>
            <input type="text" value={d.title} onChange={(e) => update(idx, { title: e.target.value })}
              placeholder="e.g. Arrival in Kathmandu"
              className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
          </div>

          <div>
            <label className="block font-body text-xs text-ht-muted mb-1.5">Description</label>
            <textarea rows={2} value={d.description ?? ''} onChange={(e) => update(idx, { description: e.target.value })}
              placeholder="What happens on this day..."
              className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-body text-xs text-ht-muted mb-1.5">Accommodation</label>
              <input type="text" value={d.accommodation ?? ''} onChange={(e) => update(idx, { accommodation: e.target.value })}
                placeholder="Hotel / Teahouse / Camp"
                className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-ht-muted mb-1.5">Meals</label>
              <input type="text" value={d.meals ?? ''} onChange={(e) => update(idx, { meals: e.target.value })}
                placeholder="B, L, D"
                className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-ht-muted mb-1.5">Altitude (m)</label>
              <input type="number" min={0} value={d.altitude ?? ''}
                onChange={(e) => update(idx, { altitude: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
