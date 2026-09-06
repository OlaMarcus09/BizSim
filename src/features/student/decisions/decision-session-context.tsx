"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { initialState, type CompanySimulationState } from "@/domain/simulation";
import {
  setDecisionMarketing,
  setDecisionEmployeesTarget,
  setDecisionPrice,
  setDecisionPurchaseQuantity,
  type DecisionSession,
  type PartialDecisions,
} from "./decision-session";

type DecisionSessionContextValue = DecisionSession & {
  setPrice: (price: number) => void;
  setMarketing: (marketing: number) => void;
  setPurchaseQuantity: (quantity: number, supplyCap?: number) => void;
  setEmployeesTarget: (target: number) => void;
  setDecision: <K extends keyof PartialDecisions>(key: K, value: NonNullable<PartialDecisions[K]>) => void;
};

const DecisionSessionContext = createContext<DecisionSessionContextValue | null>(null);

export function DecisionSessionProvider({ children }: { children: ReactNode }) {
  const [companyState] = useState<CompanySimulationState>(() => initialState());
  const [decisions, setDecisions] = useState<PartialDecisions>({});
  const value = useMemo<DecisionSessionContextValue>(() => ({
    companyState,
    decisions,
    setPrice: (price) => setDecisions((current) => setDecisionPrice({ companyState, decisions: current }, price).decisions),
    setMarketing: (marketing) => setDecisions((current) => setDecisionMarketing({ companyState, decisions: current }, marketing).decisions),
    setPurchaseQuantity: (quantity, supplyCap) => setDecisions((current) => setDecisionPurchaseQuantity({ companyState, decisions: current }, quantity, supplyCap).decisions),
    setEmployeesTarget: (target) => setDecisions((current) => setDecisionEmployeesTarget({ companyState, decisions: current }, target).decisions),
    setDecision: (key, value) => setDecisions((current) => ({ ...current, [key]: value })),
  }), [companyState, decisions]);

  return <DecisionSessionContext.Provider value={value}>{children}</DecisionSessionContext.Provider>;
}

export function useDecisionSession() {
  const context = useContext(DecisionSessionContext);
  if (!context) throw new Error("useDecisionSession must be used within DecisionSessionProvider");
  return context;
}
