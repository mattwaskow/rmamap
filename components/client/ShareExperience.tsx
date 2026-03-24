'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { BOVPresentation } from '@/lib/types/models';
import { ValueWorkbench } from '@/components/client/ValueWorkbench';
import { currency, numberFmt, percent } from '@/lib/utils';

const CompsMap = dynamic(
  () => import('@/components/client/CompsMap').then((m) => m.CompsMap),
  { ssr: false }
);

const tabs = ['Overview', 'Value', 'Comps', 'Property', 'Financials', 'Area', 'Debt / Rates', 'Contact / Download'];

export function ShareExperience({ presentation, ratesAsOf }: { presentation: BOVPresentation; ratesAsOf: string }) {
  const [active, setActive] = useState(tabs[0]);
  const saleAvgPpu = presentation.salesComps.reduce((a, b) => a + b.pricePerUnit, 0) / presentation.salesComps.length;

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-10">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="section-title">{presentation.broker.company}</p>
          <h1 className="font-display text-4xl text-brand-900">{presentation.property.name}</h1>
          <p className="text-slate-600">{presentation.property.address} · {presentation.property.city}, {presentation.property.state} · {presentation.property.submarket}</p>
        </div>
        <div className="text-right text-sm text-slate-500">Private Presentation Link</div>
      </header>

      <nav className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActive(tab)} className={`rounded-full px-4 py-2 text-sm ${active===tab ? 'bg-brand-700 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </nav>

      {active === 'Overview' && (
        <section className="space-y-6">
          <div className="premium-card overflow-hidden">
            <img src={presentation.property.heroImage} alt="hero" className="h-80 w-full object-cover"/>
            <div className="p-6 grid gap-4 md:grid-cols-3">
              {presentation.valueBuckets.map((v) => <div key={v.label}><p className="section-title">{v.label}</p><p className="text-2xl font-semibold">{currency(v.value)}</p><p className="text-sm text-slate-600">{percent(v.capRate)} · {currency(v.pricePerUnit)}/unit</p></div>)}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">{[['Units', numberFmt(presentation.property.units)], ['Occupancy', percent(presentation.property.occupancyPct)], ['Avg Rent', currency(presentation.property.avgRent)], ['Pro Forma NOI', currency(presentation.underwriting.proformaNoi)]].map(([k,v]) => <div key={k} className="premium-card p-4"><p className="text-xs uppercase text-slate-500">{k}</p><p className="text-xl font-semibold">{v}</p></div>)}</div>
          <div className="premium-card p-5 text-sm text-slate-600">Rates snapshot as of {new Date(ratesAsOf).toLocaleString()} (5Y / 7Y / 10Y / SOFR shown in Debt / Rates).</div>
        </section>
      )}

      {active === 'Value' && <ValueWorkbench presentation={presentation} />}

      {active === 'Comps' && (
        <section className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="premium-card p-4"><p className="text-xs uppercase text-slate-500">Sales Comps</p><p className="text-2xl font-semibold">{presentation.salesComps.length}</p></div>
            <div className="premium-card p-4"><p className="text-xs uppercase text-slate-500">Avg Vintage</p><p className="text-2xl font-semibold">{Math.round(presentation.salesComps.reduce((a,b)=>a+b.yearBuilt,0)/presentation.salesComps.length)}</p></div>
            <div className="premium-card p-4"><p className="text-xs uppercase text-slate-500">Avg Price / Unit</p><p className="text-2xl font-semibold">{currency(saleAvgPpu)}</p></div>
          </div>
          <CompsMap sales={presentation.salesComps} rents={presentation.rentComps} />
        </section>
      )}

      {active === 'Property' && <section className="premium-card p-6"><p>{presentation.property.summary}</p></section>}
      {active === 'Financials' && <section className="premium-card p-6"><p>T12 Income: {currency(presentation.underwriting.t12Income)} · T12 Expenses: {currency(presentation.underwriting.t12Expenses)} · Stabilized NOI: {currency(presentation.underwriting.stabilizedNoi)}</p></section>}
      {active === 'Area' && <section className="space-y-4"><div className="premium-card p-6"><p className="text-sm text-slate-600">{presentation.area.narrative}</p></div><div className="grid gap-3 md:grid-cols-3">{presentation.area.valueImplications.map((b)=> <div key={b} className="premium-card p-4 text-sm">{b}</div>)}</div></section>}
      {active === 'Debt / Rates' && <section className="premium-card p-6"><p>Leverage {percent(presentation.debt?.leveragePct ?? 0,0)} · DSCR floor {presentation.debt?.dscrMin ?? 'N/A'}x · Debt Constant {percent((presentation.debt?.debtConstant ?? 0)*100)}</p></section>}
      {active === 'Contact / Download' && <section className="premium-card p-6"><p>{presentation.broker.fullName} · {presentation.broker.email} · {presentation.broker.phone}</p><a href={`/print/${presentation.share.token}`} className="mt-3 inline-block rounded-lg bg-brand-700 px-4 py-2 text-white">Open Print View</a></section>}
    </main>
  );
}
