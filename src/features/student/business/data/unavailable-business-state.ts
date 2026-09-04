import type {
  BusinessMetric,
  CurrentRoundState,
  DataPoint,
  MarketIndicator,
  StudentBusinessState,
} from "@/domain/business-state";

export const unavailable = <T>(reason = "Simulation data is not available yet."): DataPoint<T> => ({
  availability: "unavailable",
  reason,
});

const currentRound: CurrentRoundState = {
  roundNumber: unavailable("No active round."),
  totalRounds: unavailable("Round configuration is not available."),
  periodLabel: unavailable("Simulation period is not available."),
  decisionDeadline: unavailable("No decision deadline has been scheduled."),
  status: unavailable("No active simulation."),
};

const metric = (id: string, label: string, tone: BusinessMetric["tone"]): BusinessMetric => ({
  id,
  label,
  tone,
  value: unavailable(),
  trend: unavailable("A prior round is required for comparison."),
});

const indicator = (id: string, label: string): MarketIndicator => ({
  id,
  label,
  value: unavailable("Market data is not available."),
  change: unavailable("Market movement is not available."),
});

export const unavailableBusinessState: StudentBusinessState = {
  company: {
    name: unavailable("A company has not been assigned."),
    industry: unavailable("Industry information is not available."),
    description: unavailable("A company profile has not been provided."),
    establishedAt: unavailable("Company history is not available."),
    businessModel: unavailable("Business model is not available."),
    headquarters: unavailable("Headquarters information is not available."),
    companySize: unavailable("Company size is not available."),
    employees: unavailable("Workforce information is not available."),
    currentRound,
  },
  financials: {
    metrics: [
      metric("cash", "Cash", "green"),
      metric("revenue", "Revenue", "blue"),
      metric("profit", "Profit", "amber"),
      metric("market-share", "Market Share", "violet"),
      metric("customers", "Customers", "rose"),
      metric("inventory", "Inventory Value", "green"),
      metric("satisfaction", "Customer Satisfaction", "amber"),
      metric("morale", "Employee Morale", "blue"),
    ],
    performanceSeries: [],
    summary: unavailable("Complete a round to receive a performance summary."),
    overallRating: unavailable("An overall rating requires simulation results."),
  },
  market: {
    headlineAlert: unavailable("There is no current market alert."),
    events: [],
    snapshot: [
      indicator("market-growth", "Market Growth"),
      indicator("average-price", "Avg. Market Price"),
      indicator("market-size", "Total Market Size"),
    ],
    priceCompetition: unavailable("Price competition has not been assessed."),
    demandLevel: unavailable("Demand data is not available."),
    marketStability: unavailable("Market stability has not been assessed."),
    economicIndicators: [
      indicator("inflation", "Inflation Rate"),
      indicator("interest", "Interest Rate"),
      indicator("confidence", "Consumer Confidence Index"),
      indicator("exchange", "Exchange Rate"),
    ],
    competitorSummary: unavailable("Competitor information is not available."),
    decisionContext: unavailable("Market guidance will appear when an active round is available."),
    currentRound,
  },
};
