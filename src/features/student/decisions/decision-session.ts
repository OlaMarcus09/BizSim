import type { CompanySimulationState, Decisions } from "@/domain/simulation";

export type PartialDecisions = Partial<Decisions>;

export interface DecisionSession {
  companyState: CompanySimulationState;
  decisions: PartialDecisions;
}

export function setDecisionPrice(session: DecisionSession, price: number): DecisionSession {
  return { ...session, decisions: { ...session.decisions, price } };
}

export const MARKETING_MIN = 0;
export const MARKETING_MAX = 2_000_000;
export const MARKETING_STEP = 100_000;

export function marketingDecisionError(marketing: number): string | undefined {
  if (!Number.isFinite(marketing)) return "Enter a marketing budget.";
  if (marketing < MARKETING_MIN || marketing > MARKETING_MAX) {
    return "Marketing must be between ₦0 and ₦2,000,000.";
  }
  if (marketing % MARKETING_STEP !== 0) {
    return "Marketing must use ₦100,000 increments.";
  }
}

export function setDecisionMarketing(session: DecisionSession, marketing: number): DecisionSession {
  const error = marketingDecisionError(marketing);
  if (error) throw new RangeError(error);
  return { ...session, decisions: { ...session.decisions, marketing } };
}
