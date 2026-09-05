import type { CompanySimulationState, Decisions } from "@/domain/simulation";

export type PartialDecisions = Partial<Decisions>;

export interface DecisionSession {
  companyState: CompanySimulationState;
  decisions: PartialDecisions;
}

export function setDecisionPrice(session: DecisionSession, price: number): DecisionSession {
  return { ...session, decisions: { ...session.decisions, price } };
}
