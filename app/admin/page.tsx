import Link from 'next/link';
import { demoDallasPresentation } from '@/lib/data/demo';

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="font-display text-4xl text-brand-900">Broker Dashboard</h1>
      <p className="mt-2 text-slate-600">Create/edit presentations, manage share settings, and control visibility.</p>
      <div className="mt-8 premium-card p-6">
        <p className="section-title">Active Presentation</p>
        <h2 className="mt-2 text-2xl font-semibold">{demoDallasPresentation.property.name}</h2>
        <div className="mt-4 flex gap-3">
          <Link href={`/admin/properties/${demoDallasPresentation.property.id}/edit`} className="rounded-lg bg-brand-700 px-4 py-2 text-white">Edit</Link>
          <Link href={`/share/${demoDallasPresentation.share.token}`} className="rounded-lg border border-brand-700 px-4 py-2 text-brand-700">Open Link</Link>
        </div>
      </div>
    </main>
  );
}
