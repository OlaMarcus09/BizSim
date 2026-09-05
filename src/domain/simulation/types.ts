export const RULESET_ID = "n10m-retail-mvp-v1";

export interface CompanySimulationState {
  r: number;
  cash_open: number;
  inv_open: number;
  inv_value_open: number;
  price_prev: number;
  employees_open: number;
  sat_open: number;
  morale_open: number;
  invest_stock_open: number;
  share_prev: number;
  revenue_cum: number;
  profit_cum: number;
  support_count: number;
  company_id: string;
  share_history?: number[];
  consistency_checks?: number;
}

export interface Decisions {
  price: number;
  marketing: number;
  purchase_qty: number;
  employees_target: number;
  investment: number;
}

export interface CompetitorProfile {
  id: string;
  base_attraction_weight: number;
  price: number;
  marketing: number;
  satisfaction: number;
  investment_effect: number;
  sales_capacity: number;
}

export interface MarketState {
  market_base: number;
  market_mult?: number;
  supplier_mult?: number;
  opex_mult?: number;
  supply_cap?: number;
  event_id: string;
  event_title: string;
  event_explanation: string;
  competitors?: CompetitorProfile[];
}

export interface ValidationError { field: string; message: string; }
export interface ValidationResult { valid: boolean; errors: ValidationError[]; }

export interface ScoreComponents {
  profitability_score: number;
  cash_score: number;
  market_share_score: number;
  satisfaction_score: number;
  growth_score: number;
  consistency_score: number;
  support_penalty: number;
  total_score: number;
}

export interface RoundResult {
  validated_decisions: Decisions;
  validation: ValidationResult;
  auto_submitted: boolean;
  opening_state: CompanySimulationState;
  next_state?: CompanySimulationState;
  market: MarketState;
  continuity_support: number;
  cash_after_support: number;
  supplier_unit_cost?: number;
  supply_cap?: number;
  operating_expense?: number;
  hires?: number;
  departures?: number;
  hire_cost?: number;
  severance_cost?: number;
  wages?: number;
  workforce_cost?: number;
  upfront_commitment?: number;
  investment_effect?: number;
  capacity?: number;
  total_market_demand?: number;
  reference_price?: number;
  attraction_scores?: Record<string, number>;
  potential_demand?: number;
  competitor_demand?: Record<string, number>;
  competitor_sales?: Record<string, number>;
  inv_available?: number;
  weighted_unit_cost?: number;
  units_sold?: number;
  lost_sales?: number;
  inv_close?: number;
  inv_value_close?: number;
  revenue?: number;
  cogs?: number;
  operating_profit?: number;
  cash_close?: number;
  fill_rate?: number;
  sat_close?: number;
  morale_close?: number;
  student_market_share?: number;
  invest_stock_close?: number;
  score?: ScoreComponents;
  explanation?: Record<string, number | string>;
}
