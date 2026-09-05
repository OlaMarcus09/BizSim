import assert from "node:assert/strict";
import test from "node:test";
import { initialState } from "../../../domain/simulation";
import { setDecisionPrice, type DecisionSession } from "./decision-session";

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
