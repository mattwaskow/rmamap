import { demoDallasPresentation } from '@/lib/data/demo';

const steps = ['Property Info', 'Photos', 'Financial Inputs', 'Valuation Inputs', 'Rent Comps', 'Sales Comps', 'Area Data', 'Share Settings'];

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id !== demoDallasPresentation.property.id) return <main className="p-8">Unknown property.</main>;

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="font-display text-4xl text-brand-900">Edit {demoDallasPresentation.property.name}</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <aside className="premium-card p-4">{steps.map((s)=> <p key={s} className="rounded-lg px-3 py-2 text-sm hover:bg-brand-50">{s}</p>)}</aside>
        <section className="premium-card p-6 lg:col-span-3">
          <h2 className="text-xl font-semibold">Financial Inputs (Summary Mode)</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="text-sm">Current NOI<input defaultValue={demoDallasPresentation.underwriting.currentNoi} className="mt-1 w-full rounded border px-3 py-2"/></label>
            <label className="text-sm">Pro Forma NOI<input defaultValue={demoDallasPresentation.underwriting.proformaNoi} className="mt-1 w-full rounded border px-3 py-2"/></label>
            <label className="text-sm">Stabilized NOI<input defaultValue={demoDallasPresentation.underwriting.stabilizedNoi} className="mt-1 w-full rounded border px-3 py-2"/></label>
            <label className="text-sm">Visibility<select className="mt-1 w-full rounded border px-3 py-2"><option>Summary</option><option>Detailed</option></select></label>
          </div>
        </section>
      </div>
    </main>
  );
}
