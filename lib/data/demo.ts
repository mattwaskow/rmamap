import { BOVPresentation } from '@/lib/types/models';

export const demoDallasPresentation: BOVPresentation = {
  broker: {
    id: 'broker-1',
    fullName: 'Jordan Mercer',
    title: 'Senior Managing Director',
    email: 'jmercer@rmadvisors.com',
    phone: '(214) 555-0128',
    company: 'RMA Multifamily Advisors'
  },
  branding: {
    primaryColor: '#2d3c55',
    accentColor: '#b6915f',
    toneLabel: 'Data-Driven Value Advisory',
    watermarkEnabled: true
  },
  property: {
    id: 'property-1',
    name: 'Lakeside Reserve',
    address: '8124 Meadow Park Dr',
    city: 'Dallas',
    state: 'TX',
    submarket: 'North Dallas / Richardson Corridor',
    units: 228,
    yearBuilt: 2001,
    occupancyPct: 94.2,
    avgRent: 1485,
    avgRentSf: 1.68,
    heroImage:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80',
    summary:
      'Lakeside Reserve is a 228-unit garden-style asset positioned in a high-liquidity North Dallas corridor with resilient renter demand and durable wage support.'
  },
  valuationAssumptions: {
    baselineNoi: 2450000,
    capRateLow: 4.95,
    capRateMid: 5.2,
    capRateHigh: 5.45,
    occupancyBaseline: 94.2,
    occupancySensitivityPct: 0.65,
    egiAtBaseline: 5250000
  },
  valueBuckets: [
    { label: 'Market Price', value: 47100000, capRate: 5.2, pricePerUnit: 206579, pricePerSf: 234 },
    { label: 'Strike Price', value: 49500000, capRate: 4.95, pricePerUnit: 217105, pricePerSf: 246 },
    {
      label: 'Premium Price',
      value: 44950000,
      capRate: 5.45,
      pricePerUnit: 197149,
      pricePerSf: 223
    }
  ],
  debt: {
    leveragePct: 62,
    amortYears: 30,
    dscrMin: 1.3,
    debtConstant: 0.079
  },
  underwriting: {
    currentNoi: 2310000,
    proformaNoi: 2450000,
    stabilizedNoi: 2535000,
    t12Income: 5410000,
    t12Expenses: 3100000,
    cashFlow5Year: [
      { year: 1, noi: 2450000, cashFlow: 870000 },
      { year: 2, noi: 2500000, cashFlow: 910000 },
      { year: 3, noi: 2550000, cashFlow: 948000 },
      { year: 4, noi: 2600000, cashFlow: 990000 },
      { year: 5, noi: 2660000, cashFlow: 1042000 }
    ]
  },
  salesComps: [
    {
      id: 'sc1',
      name: 'Creekview Commons',
      lat: 32.942,
      lng: -96.74,
      yearBuilt: 1999,
      units: 240,
      salePrice: 51200000,
      saleDate: '2025-10-18',
      pricePerUnit: 213333,
      pricePerSf: 252,
      capRate: 5.05,
      distanceMiles: 2.1,
      imageUrl:
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'sc2',
      name: 'Summit at Campbell',
      lat: 32.946,
      lng: -96.78,
      yearBuilt: 2004,
      units: 264,
      salePrice: 55800000,
      saleDate: '2025-06-02',
      pricePerUnit: 211364,
      pricePerSf: 248,
      capRate: 5.2,
      distanceMiles: 3.3,
      imageUrl:
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
    }
  ],
  rentComps: [
    {
      id: 'rc1',
      name: 'Northpoint Residences',
      lat: 32.934,
      lng: -96.73,
      yearBuilt: 2008,
      units: 310,
      avgRent: 1612,
      avgRentSf: 1.78,
      distanceMiles: 1.6
    },
    {
      id: 'rc2',
      name: 'The Ashford at Spring Valley',
      lat: 32.93,
      lng: -96.76,
      yearBuilt: 2002,
      units: 198,
      avgRent: 1538,
      avgRentSf: 1.71,
      distanceMiles: 2.4
    }
  ],
  area: {
    medianIncome: 86500,
    population: 312400,
    populationGrowth5yPct: 7.4,
    renterPct: 58,
    ownerPct: 42,
    medianAge: 34.8,
    occupancyRate: 95.1,
    crimeScore: 'B+',
    employmentCount: 185000,
    walkScore: 62,
    transitScore: 48,
    bikeScore: 54,
    trafficCount: 188000,
    ageCohorts: [
      { label: '20-29', value: 23 },
      { label: '30-39', value: 26 },
      { label: '40-54', value: 28 },
      { label: '55+', value: 23 }
    ],
    incomeDistribution: [
      { label: '<$50k', value: 21 },
      { label: '$50k-$100k', value: 39 },
      { label: '$100k-$150k', value: 24 },
      { label: '$150k+', value: 16 }
    ],
    householdMix: [
      { label: 'Single', value: 38 },
      { label: 'Couples', value: 34 },
      { label: 'Families', value: 28 }
    ],
    schools: [
      { name: 'Merriman Park Elementary', rating: 8.1, distanceMiles: 1.2 },
      { name: 'Lake Highlands JH', rating: 7.4, distanceMiles: 2.1 },
      { name: 'Richardson HS', rating: 7.8, distanceMiles: 2.8 },
      { name: 'Northrich Elementary', rating: 8.4, distanceMiles: 3.0 },
      { name: 'Apollo JH', rating: 7.2, distanceMiles: 3.4 }
    ],
    narrative:
      'The North Dallas / Richardson corridor continues to exhibit durable renter demand, supported by above-metro household incomes, steady population gains, and broad employment access along US-75 and the telecom corridor. The area’s balanced renter profile and stable occupancy trends provide an attractive backdrop for sustained collections and measured rent growth.',
    valueImplications: [
      'Consistent occupancy in the mid-90% range supports NOI durability across market cycles.',
      'Above-average household income levels improve rent affordability and renewal resilience.',
      'Employment density and commuter access underpin long-term renter demand depth.'
    ]
  },
  share: {
    token: 'demo-dallas-token',
    requiresPassword: false,
    disabled: false,
    visibility: {
      financialDetails: 'summary',
      showDebtMetrics: true,
      showPricePerSf: true
    }
  }
};
