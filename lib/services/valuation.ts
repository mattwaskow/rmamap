import { ValuationAssumptions, ValueBucket } from '@/lib/types/models';

interface ValueInputs {
  noi: number;
  capLow: number;
  capMid: number;
  capHigh: number;
  units: number;
  totalSf?: number;
}

const calculateBucket = (
  label: ValueBucket['label'],
  noi: number,
  capRate: number,
  units: number,
  totalSf?: number
): ValueBucket => {
  const value = (noi / (capRate / 100));
  return {
    label,
    value,
    capRate,
    pricePerUnit: value / units,
    pricePerSf: totalSf ? value / totalSf : undefined
  };
};

export const computeBuckets = (input: ValueInputs): ValueBucket[] => [
  calculateBucket('Strike Price', input.noi, input.capLow, input.units, input.totalSf),
  calculateBucket('Market Price', input.noi, input.capMid, input.units, input.totalSf),
  calculateBucket('Premium Price', input.noi, input.capHigh, input.units, input.totalSf)
];

export const occupancyAdjustedNoi = (
  assumptions: ValuationAssumptions,
  occupancy: number,
  currentNoi: number
) => {
  const delta = occupancy - assumptions.occupancyBaseline;
  const adjustment = assumptions.egiAtBaseline * (delta / 100) * assumptions.occupancySensitivityPct;
  return Math.max(currentNoi + adjustment, 0);
};
