import assert from "node:assert/strict";
import test from "node:test";
import { initialState, resolveRound } from "./engine";
import type { CompanySimulationState, Decisions } from "./types";

const normal: Decisions = { price: 5000, marketing: 500000, purchase_qty: 800, employees_target: 20, investment: 500000 };

test("worked Round 2 example", () => {
  const state: CompanySimulationState = { ...initialState(), r: 2 };
  const result = resolveRound(state, normal);
  assert.equal(result.validation.valid, true);
  assert.equal(result.total_market_demand, 11000);
  assert.equal(result.capacity, 1500);
  assert.equal(result.units_sold, 1500);
  assert.equal(result.lost_sales, 671);
  assert.equal(result.revenue, 7500000);
  assert.equal(result.cogs, 4500000);
  assert.equal(result.operating_profit, 500000);
  assert.equal(result.cash_close, 12100000);
  assert.equal(result.inv_close, 300);
  assert.equal(result.sat_close, 57);
  assert.equal(result.morale_close, 58);
  assert.equal(Number(result.student_market_share?.toFixed(1)), 14.5);
});

test("deterministic and skipped submissions", () => {
  const state = initialState();
  const a = resolveRound(state, normal);
  const b = resolveRound(state, normal);
  assert.deepEqual(a, b);
  const skipped = resolveRound(state, undefined);
  assert.equal(skipped.auto_submitted, true);
  assert.equal(skipped.validation.valid, true);
});

test("invalid and unaffordable decisions do not mutate state", () => {
  const state = initialState();
  const invalid = resolveRound(state, { ...normal, price: 3550 });
  assert.equal(invalid.validation.valid, false);
  assert.deepEqual(state, initialState());
  const poor = resolveRound({ ...state, cash_open: 1000000 }, { ...normal, purchase_qty: 2500, marketing: 2000000, investment: 2000000 });
  assert.equal(poor.validation.valid, false);
});

test("sales, inventory, satisfaction, morale, and share invariants hold", () => {
  const result = resolveRound(initialState(), { price: 7500, marketing: 0, purchase_qty: 0, employees_target: 10, investment: 0 });
  assert.equal(result.validation.valid, true);
  assert.ok((result.units_sold ?? 0) <= (result.potential_demand ?? 0));
  assert.ok((result.units_sold ?? 0) <= (result.inv_available ?? 0));
  assert.ok((result.units_sold ?? 0) <= (result.capacity ?? 0));
  assert.ok((result.inv_close ?? -1) >= 0);
  assert.ok((result.sat_close ?? -1) >= 0 && (result.sat_close ?? 101) <= 100);
  assert.ok((result.morale_close ?? -1) >= 0 && (result.morale_close ?? 101) <= 100);
  assert.ok((result.student_market_share ?? -1) >= 0 && (result.student_market_share ?? 101) <= 100);
});
