import { NextResponse } from 'next/server';
import { getRatesSnapshot } from '@/lib/services/rates';

export async function GET() {
  const data = await getRatesSnapshot();
  return NextResponse.json(data);
}
