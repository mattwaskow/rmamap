import { notFound } from 'next/navigation';
import { demoDallasPresentation } from '@/lib/data/demo';
import { currency, percent } from '@/lib/utils';

export default async function PrintPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (token !== demoDallasPresentation.share.token) return notFound();

  return (
    <main className="mx-auto max-w-4xl space-y-6 bg-white p-10">
      <h1 className="font-display text-4xl">{demoDallasPresentation.property.name} — Print Summary</h1>
      <p>{demoDallasPresentation.property.summary}</p>
      <section>
        <h2 className="mb-3 text-xl font-semibold">Value Range</h2>
        {demoDallasPresentation.valueBuckets.map((bucket) => (
          <div key={bucket.label} className="mb-2 flex justify-between border-b pb-2">
            <span>{bucket.label}</span>
            <span>{currency(bucket.value)} @ {percent(bucket.capRate)}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
