import {
  validateDecisions,
  type CompanySimulationState,
  type Decisions,
  type ValidationError,
} from "../../../domain/simulation";

export type PartialDecisions = Partial<Decisions>;

export interface DecisionSession {
  companyState: CompanySimulationState;
  decisions: PartialDecisions;
}

export const DECISION_FIELDS = [
  "price",
  "marketing",
  "purchase_qty",
  "employees_target",
  "investment",
] as const satisfies readonly (keyof Decisions)[];

export type DecisionField = (typeof DECISION_FIELDS)[number];

export type DecisionReview = {
  decisions?: Decisions;
  missingFields: DecisionField[];
  validationErrors: ValidationError[];
  valid: boolean;
};

export function missingDecisionFields(decisions: PartialDecisions): DecisionField[] {
  return DECISION_FIELDS.filter((field) => decisions[field] === undefined);
}

export function toCompleteDecisions(decisions: PartialDecisions): Decisions | undefined {
  const { price, marketing, purchase_qty, employees_target, investment } = decisions;
  if (
    price === undefined ||
    marketing === undefined ||
    purchase_qty === undefined ||
    employees_target === undefined ||
    investment === undefined
  ) return undefined;

  return {
    price,
    marketing,
    purchase_qty,
    employees_target,
    investment,
  };
}

export function reviewDecisions(decisions: PartialDecisions, supplyCap: number): DecisionReview {
  const missingFields = missingDecisionFields(decisions);
  const complete = toCompleteDecisions(decisions);
  const validationErrors = complete ? validateDecisions(complete, supplyCap) : [];

  return {
    decisions: complete,
    missingFields,
    validationErrors,
    valid: Boolean(complete) && validationErrors.length === 0,
  };
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

export const PURCHASE_QUANTITY_MIN = 0;
export const PURCHASE_QUANTITY_MAX = 2_500;
export const PURCHASE_QUANTITY_STEP = 50;

export function inventoryPurchaseLimit(supplyCap?: number): number {
  return Math.min(PURCHASE_QUANTITY_MAX, supplyCap ?? PURCHASE_QUANTITY_MAX);
}

export function purchaseQuantityError(quantity: number, supplyCap?: number): string | undefined {
  const limit = inventoryPurchaseLimit(supplyCap);
  if (!Number.isFinite(quantity)) return "Enter a purchase quantity.";
  if (quantity < PURCHASE_QUANTITY_MIN || quantity > limit) {
    return `Purchase quantity must be between 0 and ${limit.toLocaleString()} units.`;
  }
  if (quantity % PURCHASE_QUANTITY_STEP !== 0) {
    return "Purchase quantity must use 50-unit increments.";
  }
}

export function setDecisionPurchaseQuantity(
  session: DecisionSession,
  quantity: number,
  supplyCap?: number,
): DecisionSession {
  const error = purchaseQuantityError(quantity, supplyCap);
  if (error) throw new RangeError(error);
  return { ...session, decisions: { ...session.decisions, purchase_qty: quantity } };
}

export const WORKFORCE_TARGET_MIN = 10;
export const WORKFORCE_TARGET_MAX = 40;
export const WORKFORCE_TARGET_STEP = 1;

export function workforceTargetError(target: number): string | undefined {
  if (!Number.isFinite(target)) return "Enter a target workforce.";
  if (target < WORKFORCE_TARGET_MIN || target > WORKFORCE_TARGET_MAX) {
    return "Target workforce must be between 10 and 40 employees.";
  }
  if (!Number.isInteger(target)) {
    return "Target workforce must use whole employees.";
  }
}

export function setDecisionEmployeesTarget(session: DecisionSession, target: number): DecisionSession {
  const error = workforceTargetError(target);
  if (error) throw new RangeError(error);
  return { ...session, decisions: { ...session.decisions, employees_target: target } };
}

export const INVESTMENT_MIN = 0;
export const INVESTMENT_MAX = 2_000_000;
export const INVESTMENT_STEP = 100_000;

export function investmentDecisionError(investment: number): string | undefined {
  if (!Number.isFinite(investment)) return "Enter an investment amount.";
  if (investment < INVESTMENT_MIN || investment > INVESTMENT_MAX) {
    return "Investment must be between ₦0 and ₦2,000,000.";
  }
  if (investment % INVESTMENT_STEP !== 0) {
    return "Investment must use ₦100,000 increments.";
  }
}

export function setDecisionInvestment(session: DecisionSession, investment: number): DecisionSession {
  const error = investmentDecisionError(investment);
  if (error) throw new RangeError(error);
  return { ...session, decisions: { ...session.decisions, investment } };
}
