export interface RatePoint {
  key: '5Y' | '7Y' | '10Y' | 'SOFR';
  value: number;
  source: string;
}

export interface RatesSnapshot {
  asOf: string;
  points: RatePoint[];
}

export interface RatesProvider {
  getSnapshot(): Promise<RatesSnapshot>;
}

class SeededRatesProvider implements RatesProvider {
  async getSnapshot(): Promise<RatesSnapshot> {
    return {
      asOf: new Date().toISOString(),
      points: [
        { key: '5Y', value: 3.94, source: 'Seeded (FRED adapter ready)' },
        { key: '7Y', value: 4.01, source: 'Seeded (FRED adapter ready)' },
        { key: '10Y', value: 4.08, source: 'Seeded (FRED adapter ready)' },
        { key: 'SOFR', value: 4.82, source: 'Seeded (FRED adapter ready)' }
      ]
    };
  }
}

const provider: RatesProvider = new SeededRatesProvider();

let cache: { expiresAt: number; data: RatesSnapshot } | null = null;

export async function getRatesSnapshot(): Promise<RatesSnapshot> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.data;
  const data = await provider.getSnapshot();
  cache = { expiresAt: now + 1000 * 60 * 30, data };
  return data;
}
