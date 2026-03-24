import { AreaData } from '@/lib/types/models';

export type AreaDataMode = 'live' | 'cache' | 'manual';

export interface NormalizedAreaPayload extends AreaData {}

export interface AreaProvider {
  mode: AreaDataMode;
  load(propertyId: string): Promise<NormalizedAreaPayload>;
}

export class ManualAreaProvider implements AreaProvider {
  mode: AreaDataMode = 'manual';
  constructor(private readonly area: AreaData) {}
  async load(): Promise<NormalizedAreaPayload> {
    return this.area;
  }
}

export const buildAreaNarrative = (area: AreaData): string => {
  return `The submarket is supported by ${area.population.toLocaleString()} residents, ${area.populationGrowth5yPct.toFixed(1)}% five-year population growth, and median household income near $${area.medianIncome.toLocaleString()}. Renter demand remains durable with occupancy around ${area.occupancyRate.toFixed(1)}% and a balanced renter-to-owner profile. Access to employment nodes and transportation corridors reinforces leasing depth and supports steady rent collections.`;
};
