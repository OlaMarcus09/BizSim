export type AvailableData<T> = {
  availability: "available";
  value: T;
};

export type UnavailableData = {
  availability: "unavailable";
  reason: string;
};

export type DataPoint<T> = AvailableData<T> | UnavailableData;

export type BusinessStatus = "active" | "waiting" | "completed";

export interface CurrentRoundState {
  roundNumber: DataPoint<number>;
  totalRounds: DataPoint<number>;
  periodLabel: DataPoint<string>;
  decisionDeadline: DataPoint<string>;
  status: DataPoint<BusinessStatus>;
}

export interface CompanyState {
  name: DataPoint<string>;
  industry: DataPoint<string>;
  description: DataPoint<string>;
  establishedAt: DataPoint<string>;
  businessModel: DataPoint<string>;
  headquarters: DataPoint<string>;
  companySize: DataPoint<string>;
  employees: DataPoint<number>;
  currentRound: CurrentRoundState;
}

export type MetricTone = "green" | "blue" | "violet" | "amber" | "rose";

export interface BusinessMetric {
  id: string;
  label: string;
  value: DataPoint<string>;
  trend: DataPoint<string>;
  tone: MetricTone;
}

export interface FinancialState {
  metrics: BusinessMetric[];
  performanceSeries: Array<{
    label: string;
    values: number[];
  }>;
  summary: DataPoint<string>;
  overallRating: DataPoint<string>;
}

export type MarketEventCategory =
  | "market-event"
  | "supplier-update"
  | "demand-trend"
  | "industry-news";

export interface MarketEvent {
  id: string;
  category: MarketEventCategory;
  title: string;
  summary: string;
  occurredAt: string;
}

export interface MarketIndicator {
  id: string;
  label: string;
  value: DataPoint<string>;
  change: DataPoint<string>;
}

export interface MarketState {
  headlineAlert: DataPoint<MarketEvent>;
  events: MarketEvent[];
  snapshot: MarketIndicator[];
  priceCompetition: DataPoint<string>;
  demandLevel: DataPoint<string>;
  marketStability: DataPoint<string>;
  economicIndicators: MarketIndicator[];
  competitorSummary: DataPoint<string>;
  decisionContext: DataPoint<string>;
  currentRound: CurrentRoundState;
}

export interface StudentBusinessState {
  company: CompanyState;
  financials: FinancialState;
  market: MarketState;
}
