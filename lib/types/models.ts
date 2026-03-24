export type ValueBucketLabel = 'Market Price' | 'Strike Price' | 'Premium Price';

export interface BrokerProfile {
  id: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  logoUrl?: string;
}

export interface TeamBranding {
  primaryColor: string;
  accentColor: string;
  toneLabel: string;
  watermarkEnabled: boolean;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  submarket: string;
  units: number;
  yearBuilt: number;
  occupancyPct: number;
  avgRent: number;
  avgRentSf: number;
  heroImage: string;
  summary: string;
}

export interface ValueBucket {
  label: ValueBucketLabel;
  value: number;
  capRate: number;
  pricePerUnit: number;
  pricePerSf?: number;
}

export interface ValuationAssumptions {
  baselineNoi: number;
  capRateLow: number;
  capRateMid: number;
  capRateHigh: number;
  occupancyBaseline: number;
  occupancySensitivityPct: number;
  egiAtBaseline: number;
}

export interface DebtAssumptions {
  leveragePct: number;
  amortYears: number;
  dscrMin: number;
  debtConstant: number;
}

export interface UnderwritingSummary {
  currentNoi: number;
  proformaNoi: number;
  stabilizedNoi: number;
  t12Income: number;
  t12Expenses: number;
  cashFlow5Year: Array<{ year: number; noi: number; cashFlow: number }>;
}

export interface SaleComp {
  id: string;
  name: string;
  lat: number;
  lng: number;
  yearBuilt: number;
  units: number;
  salePrice: number;
  saleDate: string;
  pricePerUnit: number;
  pricePerSf: number;
  capRate?: number;
  distanceMiles: number;
  imageUrl: string;
}

export interface RentComp {
  id: string;
  name: string;
  lat: number;
  lng: number;
  yearBuilt: number;
  units: number;
  avgRent: number;
  avgRentSf: number;
  distanceMiles: number;
}

export interface AreaData {
  medianIncome: number;
  population: number;
  populationGrowth5yPct: number;
  renterPct: number;
  ownerPct: number;
  medianAge: number;
  occupancyRate: number;
  crimeScore: string;
  employmentCount: number;
  walkScore: number;
  transitScore: number;
  bikeScore?: number;
  trafficCount: number;
  ageCohorts: Array<{ label: string; value: number }>;
  incomeDistribution: Array<{ label: string; value: number }>;
  householdMix: Array<{ label: string; value: number }>;
  schools: Array<{ name: string; rating: number; distanceMiles: number }>;
  narrative: string;
  valueImplications: string[];
}

export interface ShareSettings {
  token: string;
  requiresPassword: boolean;
  expiresAt?: string;
  disabled: boolean;
  visibility: {
    financialDetails: 'detailed' | 'summary';
    showDebtMetrics: boolean;
    showPricePerSf: boolean;
  };
}

export interface BOVPresentation {
  broker: BrokerProfile;
  branding: TeamBranding;
  property: Property;
  valuationAssumptions: ValuationAssumptions;
  valueBuckets: ValueBucket[];
  debt?: DebtAssumptions;
  underwriting: UnderwritingSummary;
  salesComps: SaleComp[];
  rentComps: RentComp[];
  area: AreaData;
  share: ShareSettings;
}
