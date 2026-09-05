import type { CompetitorProfile, MarketState } from "./types";

export const BASE_COMPETITORS: CompetitorProfile[] = [
  { id: "valuemart", base_attraction_weight: 0.30, price: 4500, marketing: 400000, satisfaction: 55, investment_effect: 0, sales_capacity: 3500 },
  { id: "coreretail", base_attraction_weight: 0.28, price: 5000, marketing: 500000, satisfaction: 65, investment_effect: 0, sales_capacity: 3300 },
  { id: "primechoice", base_attraction_weight: 0.22, price: 6000, marketing: 700000, satisfaction: 75, investment_effect: 0.08, sales_capacity: 2500 },
];

export const NEW_MARKET: CompetitorProfile = { id: "newmarket", base_attraction_weight: 0.12, price: 4700, marketing: 600000, satisfaction: 60, investment_effect: 0, sales_capacity: 1800 };

export function marketForRound(round: number): MarketState {
  const base: MarketState = { market_base: 10000, event_id: "baseline", event_title: "Baseline market", event_explanation: "Normal market conditions." };
  if (round === 2) return { ...base, market_mult: 1.10, event_id: "positive-demand-trend", event_title: "Positive demand trend", event_explanation: "Category demand increases." };
  if (round === 3) return { ...base, supplier_mult: 1.10, event_id: "supplier-price-increase", event_title: "Supplier price increase", event_explanation: "Supplier acquisition costs increase." };
  if (round === 4) return { ...base, competitors: [...BASE_COMPETITORS, NEW_MARKET], event_id: "new-competitor-entry", event_title: "New competitor entry", event_explanation: "NewMarket enters the category." };
  if (round === 5) return { ...base, opex_mult: 1.15, event_id: "operating-cost-pressure", event_title: "Operating-cost pressure", event_explanation: "Fixed operating costs increase." };
  if (round === 6) return { ...base, market_mult: 1.15, event_id: "strong-category-demand", event_title: "Strong category demand", event_explanation: "Category demand is strong." };
  return { ...base, supply_cap: 2500 };
}
