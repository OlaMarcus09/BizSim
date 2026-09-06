import assert from "node:assert/strict";
import test from "node:test";
import { initialState } from "../../../domain/simulation";
import {
  MARKETING_MAX,
  MARKETING_MIN,
  MARKETING_STEP,
  marketingDecisionError,
  setDecisionMarketing,
  setDecisionPrice,
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
