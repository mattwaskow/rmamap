import { NextResponse } from 'next/server';
import { demoDallasPresentation } from '@/lib/data/demo';

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (token !== demoDallasPresentation.share.token) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, propertyId: demoDallasPresentation.property.id });
}
