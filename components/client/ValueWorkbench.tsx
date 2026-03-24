'use client';

import { useMemo, useState } from 'react';
import { BOVPresentation } from '@/lib/types/models';
import { computeBuckets, occupancyAdjustedNoi } from '@/lib/services/valuation';
import { currency, percent } from '@/lib/utils';

export function ValueWorkbench({ presentation }: { presentation: BOVPresentation }) {
  const baseline = presentation.valuationAssumptions;
  const [noi, setNoi] = useState(baseline.baselineNoi);
  const [capLow, setCapLow] = useState(baseline.capRateLow);
  const [capMid, setCapMid] = useState(baseline.capRateMid);
  const [capHigh, setCapHigh] = useState(baseline.capRateHigh);
  const [occupancy, setOccupancy] = useState(baseline.occupancyBaseline);

  const adjustedNoi = useMemo(
    () => occupancyAdjustedNoi(baseline, occupancy, noi),
    [baseline, occupancy, noi]
  );

  const buckets = useMemo(
    () => computeBuckets({ noi: adjustedNoi, capLow, capMid, capHigh, units: presentation.property.units }),
    [adjustedNoi, capLow, capMid, capHigh, presentation.property.units]
  );

  return (
    <section className="space-y-6">
      <div className="premium-card p-6">
        <h3 className="font-display text-2xl text-brand-900">Value Workbench</h3>
        <p className="mt-2 text-sm text-slate-600">
          Adjust assumptions live. Outputs refresh instantly while preserving your underlying underwriting model.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm">NOI ({currency(noi)})
            <input type="range" min={1500000} max={3500000} step={25000} value={noi} onChange={(e)=>setNoi(Number(e.target.value))} className="w-full"/>
          </label>
          <label className="text-sm">Occupancy ({percent(occupancy,1)})
            <input type="range" min={88} max={98} step={0.1} value={occupancy} onChange={(e)=>setOccupancy(Number(e.target.value))} className="w-full"/>
          </label>
          <label className="text-sm">Strike Cap ({percent(capLow)})
            <input type="range" min={4.2} max={6.3} step={0.05} value={capLow} onChange={(e)=>setCapLow(Number(e.target.value))} className="w-full"/>
          </label>
          <label className="text-sm">Market Cap ({percent(capMid)})
            <input type="range" min={4.2} max={6.3} step={0.05} value={capMid} onChange={(e)=>setCapMid(Number(e.target.value))} className="w-full"/>
          </label>
          <label className="text-sm">Premium Cap ({percent(capHigh)})
            <input type="range" min={4.2} max={6.3} step={0.05} value={capHigh} onChange={(e)=>setCapHigh(Number(e.target.value))} className="w-full"/>
          </label>
          <button className="h-fit rounded-xl border border-brand-700 px-4 py-2 text-brand-700" onClick={() => {
            setNoi(baseline.baselineNoi); setCapLow(baseline.capRateLow); setCapMid(baseline.capRateMid); setCapHigh(baseline.capRateHigh); setOccupancy(baseline.occupancyBaseline);
          }}>Reset to Baseline</button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {buckets.map((bucket) => (
          <article key={bucket.label} className="premium-card p-5">
            <p className="section-title">{bucket.label}</p>
            <p className="mt-2 text-3xl font-semibold">{currency(bucket.value)}</p>
            <p className="mt-1 text-sm text-slate-600">{percent(bucket.capRate)} Cap · {currency(bucket.pricePerUnit)}/Unit</p>
          </article>
        ))}
      </div>
    </section>
  );
}
