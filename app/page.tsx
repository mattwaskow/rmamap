import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-6 p-10 text-center">
      <p className="section-title">Proprietary Brokerage Presentation System</p>
      <h1 className="font-display text-5xl text-brand-900">Interactive BOV Platform MVP</h1>
      <p className="max-w-2xl text-slate-600">
        This workspace includes a broker admin console and owner-facing private link experience with
        premium tabbed presentation flow.
      </p>
      <div className="flex gap-4">
        <Link className="rounded-xl bg-brand-700 px-5 py-3 text-white" href="/admin">
          Open Admin
        </Link>
        <Link className="rounded-xl border border-brand-700 px-5 py-3 text-brand-700" href="/share/demo-dallas-token">
          Open Client View
        </Link>
      </div>
    </main>
  );
}
