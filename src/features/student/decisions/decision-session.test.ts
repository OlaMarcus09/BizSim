import assert from "node:assert/strict";
import test from "node:test";
import { initialState } from "../../../domain/simulation";
import {
  MARKETING_MAX,
  MARKETING_MIN,
  MARKETING_STEP,
  INVESTMENT_MAX,
  INVESTMENT_MIN,
  INVESTMENT_STEP,
  PURCHASE_QUANTITY_MAX,
  PURCHASE_QUANTITY_MIN,
  PURCHASE_QUANTITY_STEP,
  WORKFORCE_TARGET_MAX,
  WORKFORCE_TARGET_MIN,
  WORKFORCE_TARGET_STEP,
  inventoryPurchaseLimit,
  investmentDecisionError,
  marketingDecisionError,
  purchaseQuantityError,
  setDecisionMarketing,
  setDecisionEmployeesTarget,
  setDecisionInvestment,
  setDecisionPrice,
  setDecisionPurchaseQuantity,
  workforceTargetError,
  type DecisionSession,
} from "./decision-session";

test("stores a pricing decision without requiring other decisions", () => {
  const session: DecisionSession = { companyState: initialState(), decisions: {} };
  const updated = setDecisionPrice(session, 5200);

  assert.equal(updated.decisions.price, 5200);
  assert.equal(updated.decisions.marketing, undefined);
  assert.equal(updated.decisions.purchase_qty, undefined);
  assert.equal(updated.decisions.employees_target, undefined);
  assert.equal(updated.decisions.investment, undefined);
  assert.equal(updated.companyState.r, 1);
});

test("preserves a saved price when another decision session update occurs", () => {
  const session: DecisionSession = { companyState: initialState(), decisions: {} };
  const priced = setDecisionPrice(session, 5200);
  const updated: DecisionSession = { ...priced, decisions: { ...priced.decisions, marketing: 500000 } };

  assert.deepEqual(updated.decisions, { price: 5200, marketing: 500000 });
});

test("stores valid Marketing while preserving Pricing and leaving future decisions undefined", () => {
  const session: DecisionSession = { companyState: initialState(), decisions: { price: 5200 } };
  const updated = setDecisionMarketing(session, 900000);

  assert.equal(updated.decisions.purchase_qty, undefined);
  assert.equal(updated.decisions.employees_target, undefined);
  assert.equal(updated.decisions.investment, undefined);
  assert.deepEqual(updated.decisions, { price: 5200, marketing: 900000 });
  assert.equal(updated.companyState, session.companyState);
});

test("accepts Marketing contract boundaries and increments", () => {
  assert.equal(marketingDecisionError(MARKETING_MIN), undefined);
  assert.equal(marketingDecisionError(MARKETING_STEP), undefined);
  assert.equal(marketingDecisionError(MARKETING_MAX), undefined);
});

test("rejects out-of-range or off-increment Marketing without changing staged decisions", () => {
  const session: DecisionSession = { companyState: initialState(), decisions: { price: 5200 } };

  assert.match(marketingDecisionError(-MARKETING_STEP) ?? "", /between/);
  assert.match(marketingDecisionError(MARKETING_MAX + MARKETING_STEP) ?? "", /between/);
  assert.match(marketingDecisionError(150000) ?? "", /increments/);
  assert.throws(() => setDecisionMarketing(session, -MARKETING_STEP), RangeError);
  assert.throws(() => setDecisionMarketing(session, 150000), RangeError);
  assert.deepEqual(session.decisions, { price: 5200 });
});

test("later valid Marketing updates replace only the staged Marketing amount", () => {
  const session: DecisionSession = { companyState: initialState(), decisions: { price: 5200 } };
  const first = setDecisionMarketing(session, 500000);
  const updated = setDecisionMarketing(first, 1200000);

  assert.deepEqual(updated.decisions, { price: 5200, marketing: 1200000 });
});

test("stages a valid Inventory purchase while preserving Pricing and Marketing", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000 },
  };
  const updated = setDecisionPurchaseQuantity(session, 800, 2500);

  assert.equal(updated.decisions.employees_target, undefined);
  assert.equal(updated.decisions.investment, undefined);
  assert.deepEqual(updated.decisions, { price: 5200, marketing: 900000, purchase_qty: 800 });
});

test("accepts Inventory minimum and effective supply-cap boundaries", () => {
  assert.equal(purchaseQuantityError(PURCHASE_QUANTITY_MIN, 1200), undefined);
  assert.equal(purchaseQuantityError(1200, 1200), undefined);
  assert.equal(purchaseQuantityError(PURCHASE_QUANTITY_MAX, 3000), undefined);
  assert.equal(inventoryPurchaseLimit(1200), 1200);
  assert.equal(inventoryPurchaseLimit(3000), PURCHASE_QUANTITY_MAX);
});

test("rejects Inventory quantities outside the supply cap or 50-unit increment", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000 },
  };

  assert.match(purchaseQuantityError(-PURCHASE_QUANTITY_STEP, 2500) ?? "", /between/);
  assert.match(purchaseQuantityError(1250, 1200) ?? "", /between/);
  assert.match(purchaseQuantityError(125, 2500) ?? "", /50-unit/);
  assert.throws(() => setDecisionPurchaseQuantity(session, 2550, 2500), RangeError);
  assert.throws(() => setDecisionPurchaseQuantity(session, 125, 2500), RangeError);
  assert.deepEqual(session.decisions, { price: 5200, marketing: 900000 });
});

test("repeated Inventory staging replaces only purchase_qty", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000 },
  };
  const first = setDecisionPurchaseQuantity(session, 500, 2500);
  const updated = setDecisionPurchaseQuantity(first, 1500, 2500);

  assert.deepEqual(updated.decisions, { price: 5200, marketing: 900000, purchase_qty: 1500 });
});

test("Inventory staging does not resolve the round or mutate company state", () => {
  const companyState = initialState();
  const session: DecisionSession = { companyState, decisions: { price: 5200, marketing: 900000 } };
  const updated = setDecisionPurchaseQuantity(session, 1000, 2500);

  assert.equal(updated.companyState, companyState);
  assert.equal(updated.companyState.r, 1);
  assert.equal(updated.decisions.employees_target, undefined);
  assert.equal(updated.decisions.investment, undefined);
});

test("stages a valid Workforce target while preserving prior decisions", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800 },
  };
  const updated = setDecisionEmployeesTarget(session, 24);

  assert.equal(updated.decisions.investment, undefined);
  assert.deepEqual(updated.decisions, {
    price: 5200,
    marketing: 900000,
    purchase_qty: 800,
    employees_target: 24,
  });
});

test("accepts Workforce minimum, maximum, and whole-employee increments", () => {
  assert.equal(workforceTargetError(WORKFORCE_TARGET_MIN), undefined);
  assert.equal(workforceTargetError(WORKFORCE_TARGET_MIN + WORKFORCE_TARGET_STEP), undefined);
  assert.equal(workforceTargetError(WORKFORCE_TARGET_MAX), undefined);
});

test("rejects out-of-range and fractional Workforce targets without corrupting staged state", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800 },
  };

  assert.match(workforceTargetError(WORKFORCE_TARGET_MIN - 1) ?? "", /between/);
  assert.match(workforceTargetError(WORKFORCE_TARGET_MAX + 1) ?? "", /between/);
  assert.match(workforceTargetError(20.5) ?? "", /whole employees/);
  assert.throws(() => setDecisionEmployeesTarget(session, 9), RangeError);
  assert.throws(() => setDecisionEmployeesTarget(session, 20.5), RangeError);
  assert.deepEqual(session.decisions, { price: 5200, marketing: 900000, purchase_qty: 800 });
});

test("repeated Workforce staging replaces only employees_target", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800 },
  };
  const first = setDecisionEmployeesTarget(session, 22);
  const updated = setDecisionEmployeesTarget(first, 18);

  assert.deepEqual(updated.decisions, {
    price: 5200,
    marketing: 900000,
    purchase_qty: 800,
    employees_target: 18,
  });
});

test("Workforce staging does not resolve the round or populate Investment", () => {
  const companyState = initialState();
  const session: DecisionSession = {
    companyState,
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800 },
  };
  const updated = setDecisionEmployeesTarget(session, 20);

  assert.equal(updated.companyState, companyState);
  assert.equal(updated.companyState.r, 1);
  assert.equal(updated.decisions.investment, undefined);
});

test("stages Investment while preserving all four previous decisions", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800, employees_target: 24 },
  };
  const updated = setDecisionInvestment(session, 700000);

  assert.deepEqual(updated.decisions, {
    price: 5200,
    marketing: 900000,
    purchase_qty: 800,
    employees_target: 24,
    investment: 700000,
  });
});

test("accepts Investment boundaries and ₦100,000 increments", () => {
  assert.equal(investmentDecisionError(INVESTMENT_MIN), undefined);
  assert.equal(investmentDecisionError(INVESTMENT_STEP), undefined);
  assert.equal(investmentDecisionError(INVESTMENT_MAX), undefined);
});

test("rejects invalid Investment without corrupting the staged strategy", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800, employees_target: 24 },
  };

  assert.match(investmentDecisionError(-INVESTMENT_STEP) ?? "", /between/);
  assert.match(investmentDecisionError(INVESTMENT_MAX + INVESTMENT_STEP) ?? "", /between/);
  assert.match(investmentDecisionError(150000) ?? "", /increments/);
  assert.throws(() => setDecisionInvestment(session, -INVESTMENT_STEP), RangeError);
  assert.throws(() => setDecisionInvestment(session, 150000), RangeError);
  assert.deepEqual(session.decisions, {
    price: 5200,
    marketing: 900000,
    purchase_qty: 800,
    employees_target: 24,
  });
});

test("repeated Investment staging replaces only investment", () => {
  const session: DecisionSession = {
    companyState: initialState(),
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800, employees_target: 24 },
  };
  const first = setDecisionInvestment(session, 500000);
  const updated = setDecisionInvestment(first, 1200000);

  assert.deepEqual(updated.decisions, {
    price: 5200,
    marketing: 900000,
    purchase_qty: 800,
    employees_target: 24,
    investment: 1200000,
  });
});

test("Investment staging neither resolves nor submits the round", () => {
  const companyState = initialState();
  const session: DecisionSession = {
    companyState,
    decisions: { price: 5200, marketing: 900000, purchase_qty: 800, employees_target: 24 },
  };
  const updated = setDecisionInvestment(session, 0);

  assert.equal(updated.companyState, companyState);
  assert.equal(updated.companyState.r, 1);
  assert.equal(updated.decisions.investment, 0);
});
