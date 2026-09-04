# The ₦10 Million Challenge — MVP Simulation Specification

**Status:** Normative specification for future implementation

**Version:** 1.0-draft

**Scope:** One retail company, six rounds, deterministic MVP
**Not in scope:** UI behavior, persistence, authentication, realtime play, AI, or engine implementation

## 1. Purpose and normative language

This document defines the business rules for the first playable BizSim simulation. An implementation must not add unstated calculations or infer missing behavior.

The words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are normative. Values marked **calibration assumption** are valid MVP defaults but must be reviewed after classroom testing. Changing a calibrated value creates a new ruleset version; it must never silently change an existing simulation.

## 2. Simulation objective

Each student operates one retail company for six rounds. The company begins with ₦10,000,000 cash and an initial inventory holding. The objective is to create a financially healthy, competitive, and sustainable company by balancing:

- operating profit;
- cash health;
- customer demand and availability;
- market share;
- customer satisfaction;
- employee morale; and
- investment for future rounds.

Revenue alone does not determine the winner. The final score combines profitability, cash, market share, satisfaction, growth, and balanced execution.

## 3. MVP competition model

For the MVP, every student company competes in its own identical market against deterministic benchmark competitors. Student companies do not directly remove demand from one another. The class leaderboard compares their scores after each round.

This model is intentional because it:

- permits asynchronous submissions;
- ensures one student's submission time cannot affect another student's result;
- makes identical states and decisions produce identical outcomes; and
- keeps the first engine small enough to explain and calibrate.

All students in one simulation MUST use the same ruleset version, event schedule, and starting competitor states. A future shared classroom market is outside this MVP and would require simultaneous batch resolution.

## 4. Units, precision, and rounding

- Currency is stored and calculated in whole Nigerian naira (₦).
- Inventory, demand, capacity, and sales use whole units.
- Satisfaction, morale, market share, and score are displayed to one decimal place but retained internally to at least six decimal places.
- Multipliers are retained internally to at least six decimal places.
- Unless a rule says otherwise, rounding to an integer uses round-half-away-from-zero.
- Demand allocation uses the largest-remainder method described in Section 10; it does not independently round each company quota.
- Stable identifier ascending order breaks any exact allocation tie.
- Values are clamped before display rounding.

These conventions MUST be applied consistently on every platform.

## 5. State and variable dictionary

### 5.1 Company state at the start of a round

| Variable | Symbol | Unit | Meaning |
| --- | --- | --- | --- |
| Round number | `r` | integer | Current round, 1 through 6 |
| Opening cash | `cash_open` | ₦ | Cash available before continuity support and decisions |
| Opening inventory | `inv_open` | units | Saleable stock carried into the round |
| Opening inventory book value | `inv_value_open` | ₦ | Cost value of carried inventory |
| Previous selling price | `price_prev` | ₦/unit | Last valid price, used if the student does not submit |
| Employees | `employees_open` | people | Staff carried into the round |
| Customer satisfaction | `sat_open` | 0–100 | Satisfaction carried into demand and the next update |
| Employee morale | `morale_open` | 0–100 | Morale carried into productivity and the next update |
| Investment stock | `invest_stock_open` | ₦ | Prior investment capability remaining at round start |
| Prior market share | `share_prev` | percent | Previous round's actual-sales share |
| Cumulative revenue | `revenue_cum` | ₦ | Revenue through the previous round |
| Cumulative operating profit | `profit_cum` | ₦ | Operating profit through the previous round |
| Continuity support count | `support_count` | integer | Number of emergency top-ups previously received |

### 5.2 Market and competitor state

| Variable | Symbol | Unit | Meaning |
| --- | --- | --- | --- |
| Baseline market size | `market_base` | units | Category demand before the round event |
| Market demand multiplier | `market_mult` | multiplier | Event adjustment to category demand |
| Base supplier unit cost | `unit_cost_base` | ₦/unit | Normal acquisition cost |
| Supplier cost multiplier | `supplier_mult` | multiplier | Event adjustment to acquisition cost |
| Operating-cost multiplier | `opex_mult` | multiplier | Event adjustment to fixed operating expense |
| Purchase availability cap | `supply_cap` | units | Maximum stock purchasable in the round |
| Competitor state | `competitors[]` | records | Active deterministic competitor inputs |
| Ruleset version | `ruleset_id` | string | Exact formula and calibration version |
| Event identifier | `event_id` | string | Deterministic event applied in the round |

### 5.3 Student decisions

| Decision | Symbol | Unit | Allowed input |
| --- | --- | --- | --- |
| Selling price | `price` | ₦/unit | ₦3,500–₦7,500 in ₦100 increments |
| Marketing spend | `marketing` | ₦ | ₦0–₦2,000,000 in ₦100,000 increments |
| Inventory purchase | `purchase_qty` | units | 0–2,500 in 50-unit increments, also limited by `supply_cap` |
| Target workforce | `employees_target` | people | 10–40 whole employees |
| Investment spend | `investment` | ₦ | ₦0–₦2,000,000 in ₦100,000 increments |

All ranges and starting values in Sections 5 and 6 are **calibration assumptions**.

### 5.4 Round outputs

The engine MUST produce at least: validated decisions, potential demand, available inventory, operating capacity, units sold, lost sales, ending inventory and book value, revenue, COGS, each cash cost, operating profit, closing cash, satisfaction, morale, market share, investment stock, continuity flags, score components, total score, and an explanation record containing the inputs and formula contributions.

## 6. Common starting conditions

| Item | MVP starting value | Notes |
| --- | ---: | --- |
| Cash | ₦10,000,000 | The challenge's spending cash |
| Inventory | 1,000 units | Opening book cost is ₦3,000 per unit |
| Inventory book value | ₦3,000,000 | An opening business asset separate from the ₦10m cash budget |
| Base supplier unit cost | ₦3,000/unit | Used before supplier-event modifiers |
| Selling price | ₦5,000/unit | Also the fallback price for Round 1 |
| Baseline market size | 10,000 units/round | Shared by the student and benchmark competitors |
| Baseline student demand allocation | 2,000 units | 20% base attraction before decision effects |
| Base supplier unit cost | ₦3,000/unit | Before a supplier event multiplier |
| Employees | 20 | Base productivity is 75 units per employee |
| Wage | ₦75,000/employee/round | Fixed in the MVP |
| Fixed operating expense | ₦500,000/round | Before events and investment efficiency |
| Customer satisfaction | 60/100 | Neutral-positive starting position |
| Employee morale | 60/100 | Produces a 1.0 productivity multiplier |
| Initial reference market share | 20% | Replaced by actual-sales share after Round 1 |
| Investment stock | ₦0 | New investment helps from the following round |
| Cumulative revenue | ₦0 | Updated after each resolved round |
| Cumulative operating profit | ₦0 | May become negative |
| Continuity support count | 0 | Used for the disclosed final-score penalty |

The company therefore begins with ₦13,000,000 in combined cash and inventory book assets, while the named challenge budget refers specifically to its ₦10,000,000 available cash. This distinction MUST be visible in teaching material to avoid implying that the opening inventory was free cash.

The initial `ruleset_id` is `n10m-retail-mvp-v1`. In Round 1 the baseline event sets `market_mult = 1.00`, `supplier_mult = 1.00`, `opex_mult = 1.00`, and `supply_cap = 2,500` units.

The initial ruleset identifier is `n10m-retail-mvp-v1`. Unless the scheduled event states otherwise, `market_mult`, `supplier_mult`, and `opex_mult` equal 1.00 and `supply_cap` equals 2,500 units.

## 7. Round lifecycle and calculation order

### 7.1 Beginning of a round

1. Load the immutable prior closing state.
2. Apply emergency continuity support if required.
3. Activate the scheduled market event and its modifiers.
4. Load the deterministic competitor profiles for this round.
5. Present the opening company, market, event, and competitor information.
6. Accept one complete set of student decisions until the deadline.

### 7.2 Resolution order

The engine MUST calculate in exactly this order:

1. Normalize and validate decision syntax, ranges, and increments.
2. Calculate event-adjusted supplier cost, supply cap, and operating expense.
3. Calculate workforce change costs, wages, and the total upfront cash commitment.
4. Reject unaffordable decisions before changing state.
5. Apply inventory purchasing and workforce changes.
6. Calculate the benefit from opening investment stock.
7. Calculate employee-adjusted operating capacity.
8. Calculate total market demand and each active company's attraction score.
9. Allocate potential demand using the largest-remainder method.
10. Calculate units sold, lost sales, and ending inventory.
11. Calculate revenue, COGS, operating profit, and closing cash.
12. Update customer satisfaction and employee morale.
13. Decay prior investment stock and add the new investment.
14. Calculate actual-sales market share.
15. Update cumulative values and balanced-execution history.
16. Calculate the round and cumulative leaderboard score.
17. Produce results and traceable educational explanations.

### 7.3 End of a round

The complete closing state becomes the next round's opening state. Results MUST be immutable once published. After Round 6, the engine calculates the final score, applies deterministic tie-breakers, and closes the simulation.

## 8. Decision rules

### 8.1 Pricing

**Input:** one selling price within the range in Section 5.3.

**Effect:** price changes price attractiveness relative to the average active competitor price. It also affects revenue per unit and satisfaction's price-fairness update.

**Trade-off:** a lower price generally wins more potential demand but reduces unit margin. A higher price improves unit margin but can reduce demand and satisfaction.

**Dependencies:** active competitor prices, supplier cost, market demand, and available capacity/inventory.

**Edge cases:** zero and negative prices are invalid. Out-of-range or incorrect-increment values reject the complete submission. Price cannot be changed after resolution begins.

### 8.2 Marketing

**Input:** current-round spend within the range in Section 5.3.

**Cost:** paid from cash before sales in the current round and deducted from operating profit.

**Effect:**

```text
marketing_factor = 1 + min(0.30, marketing / 5,000,000)
```

Marketing has no carryover in the MVP.

**Trade-off:** it raises attraction but consumes cash regardless of inventory or capacity. Spending cannot create demand beyond total market demand.

**Edge cases:** marketing may produce little additional sales when inventory or capacity is already the constraint.

### 8.3 Inventory purchasing

**Input:** purchase quantity within the configured range and the event-adjusted supply cap.

```text
supplier_unit_cost = round(unit_cost_base × supplier_mult)
purchase_cost = purchase_qty × supplier_unit_cost
inv_available = inv_open + purchase_qty
```

Inventory is paid for before sales. Unsold units carry forward at their weighted-average book cost; they are not discarded.

```text
weighted_unit_cost =
  (inv_value_open + purchase_cost) / inv_available    when inv_available > 0
```

**Trade-off:** too little inventory creates lost sales and harms satisfaction; too much locks cash in stock.

**Edge cases:** if `inv_available = 0`, weighted cost and COGS are zero. A supply-shortage event may reduce `supply_cap` below 2,500.

### 8.4 Workforce

**Input:** target employee count within the range in Section 5.3.

```text
hires = max(0, employees_target − employees_open)
departures = max(0, employees_open − employees_target)
hire_cost = hires × ₦50,000
severance_cost = departures × ₦25,000
wages = employees_target × ₦75,000
```

All workforce costs are paid before sales and deducted from operating profit.

**Effect:** target employees determine current capacity. Morale modifies individual productivity.

**Trade-off:** more staff increases capacity but raises wages and hiring cost. Cutting staff reduces costs but can constrain sales and penalize morale.

**Edge cases:** staff cannot fall below 10 or exceed 40. Hiring is immediate for MVP simplicity.

### 8.5 Investment

**Input:** current-round capital investment within the range in Section 5.3.

Investment is paid from cash in the current round but does **not** reduce operating profit. It creates a simplified capability balance that benefits later rounds.

```text
investment_effect = min(0.10, invest_stock_open / 10,000,000)
invest_stock_close = round(0.80 × invest_stock_open) + investment
```

The opening `investment_effect`:

- multiplies capacity by `1 + investment_effect`;
- multiplies demand attraction by `1 + investment_effect` as a product-quality proxy;
- reduces event-adjusted fixed operating expense by `investment_effect`; and
- contributes to satisfaction and morale updates.

New investment does not benefit the current round. Twenty percent of prior capability expires each round before new spending is added.

Investment stock is a non-accounting operational capability measure, not cash, inventory, or a balance-sheet asset. Its decay is therefore not included as depreciation in the MVP operating-profit equation, and investment stock is excluded from net-asset growth scoring. This is a deliberate managerial-simulation simplification.

**Trade-off:** investment reduces current cash but can improve future capacity, quality, efficiency, satisfaction, and morale. Round 6 investment has no future operating benefit and is therefore strategically poor, though still valid.

## 9. Capacity and workforce productivity

```text
morale_factor = 0.75 + (morale_open / 240)
capacity = floor(
  employees_target
  × 75
  × morale_factor
  × (1 + investment_effect)
)
```

Morale is clamped to 0–100, so its productivity factor is bounded from 0.75 to approximately 1.166667. Capacity can never be negative.

## 10. Deterministic demand model

### 10.1 Total category demand

```text
market_mult = clamp(0.70, 1.30, event market multiplier)
total_market_demand = round(market_base × market_mult)
```

This is the hard category-demand ceiling before stock and capacity constraints.

### 10.2 Reference price

```text
reference_price = arithmetic mean of student price and all active competitor prices
```

### 10.3 Attraction score

For the student and every active competitor:

```text
price_factor = clamp(
  0.60,
  1.40,
  1 − 1.10 × ((company_price / reference_price) − 1)
)

marketing_factor = 1 + min(0.30, company_marketing / 5,000,000)
satisfaction_factor = 0.70 + company_satisfaction / 200
quality_factor = 1 + company_investment_effect

attraction_score =
  base_attraction_weight
  × price_factor
  × marketing_factor
  × satisfaction_factor
  × quality_factor
```

Every factor is bounded. Marketing and price therefore redistribute a fixed market rather than generating infinite demand.

### 10.4 Demand allocation

```text
raw_quota_i = total_market_demand
              × attraction_score_i
              / sum(all attraction scores)
```

The engine floors every raw quota, then distributes the remaining units one at a time to the largest fractional remainders. Exact ties use stable company identifier ascending order. The allocated potential demand across all companies MUST equal `total_market_demand` exactly.

Customer satisfaction affects demand through `satisfaction_factor`; market conditions affect the fixed total; competitor pricing affects both `reference_price` and competing attraction scores.

## 11. Sales, inventory, and revenue

```text
units_sold = min(potential_demand, inv_available, capacity)
lost_sales = potential_demand − units_sold
inv_close = inv_available − units_sold
revenue = units_sold × price
COGS = round(units_sold × weighted_unit_cost)
inv_value_close = round(inv_close × weighted_unit_cost)
fill_rate = units_sold / potential_demand    when potential_demand > 0
fill_rate = 1                               when potential_demand = 0
```

When demand exceeds stock or capacity, the unsatisfied amount is lost sales; it is not back-ordered. When inventory exceeds demand, unsold units and book value carry forward.

## 12. Cost, profit, and cash model

### 12.1 Event-adjusted operating expense

```text
operating_expense = round(
  ₦500,000 × clamp(0.80, 1.50, opex_mult) × (1 − investment_effect)
)
```

### 12.2 Operating profit

```text
workforce_cost = wages + hire_cost + severance_cost

operating_profit =
  revenue
  − COGS
  − marketing
  − workforce_cost
  − operating_expense
```

Investment expenditure is intentionally excluded from operating profit. `operating_profit` is the MVP's performance measure, not a complete statutory accounting statement.

### 12.3 Cash movement

```text
cash_close =
  cash_after_support
  + revenue
  − purchase_cost
  − marketing
  − workforce_cost
  − operating_expense
  − investment
```

COGS is not subtracted again from cash because the cash leaves when inventory is purchased. Cash carries forward unchanged except for explicit round cash flows and continuity support.

### 12.4 Affordability

Before accepting decisions:

```text
upfront_commitment =
  purchase_cost
  + marketing
  + workforce_cost
  + operating_expense
  + investment
```

`upfront_commitment` MUST NOT exceed `cash_after_support`. Expected sales revenue cannot fund an upfront decision. If unaffordable, the complete decision set is rejected without changing state; the student must revise it before the deadline.

The MVP has no borrowing, overdraft, interest, or debt.

### 12.5 State carried into the next round

After all calculations and score history are recorded:

```text
next.cash_open          = cash_close
next.inv_open           = inv_close
next.inv_value_open     = inv_value_close
next.price_prev         = validated price
next.employees_open     = employees_target
next.sat_open           = sat_close
next.morale_open        = morale_close
next.invest_stock_open  = invest_stock_close
next.share_prev         = student_market_share
next.revenue_cum        = revenue_cum + revenue
next.profit_cum         = profit_cum + operating_profit
next.support_count      = updated support_count
next.r                   = r + 1
```

No other calculated or display-only value carries forward unless a future ruleset explicitly adds it.

## 13. Customer satisfaction

Satisfaction affects demand in the current round and is then updated for the next round.

```text
price_delta = clamp(
  −6, 6,
  round(20 × (reference_price − price) / reference_price)
)

availability_delta = clamp(−8, 3, round(10 × (fill_rate − 0.90)))

workload = units_sold / capacity    when capacity > 0
workload = 1                        when capacity = 0 and potential_demand > 0
workload = 0                        otherwise

service_delta = clamp(−5, 3, round(8 × (0.85 − workload)))
quality_delta = round(20 × investment_effect)

sat_close = clamp(
  0, 100,
  sat_open + price_delta + availability_delta + service_delta + quality_delta
)
```

This represents price fairness, product availability, service pressure, and investment-supported quality. Stockouts reduce `fill_rate`; overpricing reduces `price_delta`.

## 14. Employee morale

```text
workload_morale_delta = clamp(−8, 3, round(10 × (0.80 − workload)))
layoff_delta = −min(6, ceil(departures / 2))
hire_disruption_delta = −min(2, ceil(hires / 5))
people_investment_delta = round(20 × investment_effect)

morale_close = clamp(
  0, 100,
  morale_open
  + workload_morale_delta
  + layoff_delta
  + hire_disruption_delta
  + people_investment_delta
)
```

Fixed wages mean there is no separate compensation decision in this MVP. Morale affects the next round's capacity through `morale_factor`.

## 15. Competitors

Benchmark competitors use the same attraction formula as the student. Their values are defined by ruleset and round; they do not react dynamically to student outcomes.

| Profile | Base weight | Price | Marketing | Satisfaction | Quality effect | Sales capacity | Positioning |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| ValueMart | 0.30 | ₦4,500 | ₦400,000 | 55 | 0% | 3,500 | Low price |
| CoreRetail | 0.28 | ₦5,000 | ₦500,000 | 65 | 0% | 3,300 | Balanced |
| PrimeChoice | 0.22 | ₦6,000 | ₦700,000 | 75 | 8% | 2,500 | Premium |

The student's base weight is 0.20. Competitor available inventory equals their sales capacity, so their actual sales are `min(potential_demand, sales_capacity)`.

An entrant event MAY activate a fourth predefined profile:

| Profile | Base weight | Price | Marketing | Satisfaction | Quality effect | Sales capacity |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| NewMarket | 0.12 | ₦4,700 | ₦600,000 | 60 | 0% | 1,800 |

Attraction scores are normalized, so weights need not sum to one after activation. All profile values are **calibration assumptions**.

## 16. Market share

```text
total_actual_sales = student_units_sold + sum(active competitor units sold)

student_market_share =
  student_units_sold / total_actual_sales × 100    when total_actual_sales > 0
  0                                                otherwise
```

Market share uses actual sales, not revenue or potential demand. Competitor prices and profiles affect their demand and therefore the student's share. Unsold category demand is not included in the denominator.

## 17. Market events

Events modify existing variables; they MUST NOT introduce separate hidden systems. Each event record contains an ID, title, explanation, round, and explicit modifiers.

Supported MVP modifiers are:

- `market_mult` for category demand;
- `supplier_mult` for inventory acquisition cost;
- `opex_mult` for fixed operating cost;
- `supply_cap` for maximum purchasable units; and
- competitor activation or explicit profile-field overrides.

If multiple configured modifiers affect one numeric variable, multiply them and then apply the variable's documented clamp. Explicit competitor overrides are applied once after the base profile loads.

Default six-round schedule (**calibration assumption**):

| Round | Event | Effect |
| ---: | --- | --- |
| 1 | Baseline market | All multipliers 1.00; supply cap 2,500 |
| 2 | Positive demand trend | `market_mult = 1.10` |
| 3 | Supplier price increase | `supplier_mult = 1.10` |
| 4 | New competitor entry | Activate `NewMarket` |
| 5 | Operating-cost pressure | `opex_mult = 1.15` |
| 6 | Strong category demand | `market_mult = 1.15` |

The event schedule is fixed when a simulation is created. Future randomized schedules MUST use a stored seed and deterministic generator version; the seed, generator version, and generated schedule must be persisted before Round 1.

## 18. Scoring and winner selection

The cumulative score is 0–100 before penalties. Every component uses fixed benchmarks, not class rank, so a student's score does not change when another student submits.

```text
profit_margin = profit_cum / revenue_cum    when revenue_cum > 0, else 0
profitability_score = 25 × clamp(0, 1, profit_margin / 0.15)

cash_score = 20 × clamp(0, 1, (cash_close / ₦10,000,000) / 1.25)

average_market_share = mean(end-of-round market share for resolved rounds)
market_share_score = 20 × clamp(0, 1, average_market_share / 25)

satisfaction_score = 15 × sat_close / 100

opening_net_assets = ₦10,000,000 + ₦3,000,000
closing_net_assets = cash_close + inv_value_close
net_asset_growth = closing_net_assets / opening_net_assets − 1
growth_score = 10 × clamp(0, 1, net_asset_growth / 0.20)
```

Balanced execution awards one check per resolved round for each condition:

1. operating profit is positive;
2. closing cash is at least ₦1,000,000;
3. satisfaction is at least 50;
4. morale is at least 50; and
5. fill rate is at least 75%.

```text
consistency_score = 10 × checks_earned / (5 × resolved_rounds)
```

For a six-round final:

```text
support_penalty = min(15, support_count × 5)

final_score = clamp(
  0, 100,
  profitability_score
  + cash_score
  + market_share_score
  + satisfaction_score
  + growth_score
  + consistency_score
  − support_penalty
)
```

Display component scores and total score to one decimal place. The highest final score wins. Ties are broken by, in order: higher cumulative operating profit, higher closing satisfaction, higher closing cash, then stable company identifier ascending. Revenue is not an independently weighted score component; it must translate into profitable, liquid, competitive, and sustainable outcomes.

## 19. Validation, missed submissions, and continuity

### 19.1 Invalid or partial submissions

The engine rejects the complete decision set if any field is missing, malformed, outside its range, on an invalid increment, above the supply cap, or unaffordable. No partial state change occurs. Validation errors MUST name the field and permitted correction.

### 19.2 Missed deadline

At the deadline, a company without a valid submission receives these deterministic defaults:

- price: `price_prev`;
- marketing: ₦0;
- inventory purchase: 0;
- target workforce: `employees_open`;
- investment: ₦0.

Mandatory wages and operating expenses still apply. The result is marked `auto_submitted` and remains scoreable.

### 19.3 Emergency continuity support

To keep the learning exercise playable for six rounds, the MVP uses a non-repayable, explicitly disclosed classroom continuity mechanism rather than debt.

At the beginning of a round:

```text
if cash_open < ₦2,000,000:
  continuity_support = ₦2,000,000 − cash_open
  cash_after_support = ₦2,000,000
  support_count += 1
else:
  continuity_support = 0
  cash_after_support = cash_open
```

Each use subtracts five final-score points, capped at 15. It is not revenue, profit, investment, or a loan. Results must visibly explain the top-up and penalty.

### 19.4 Required edge-case behavior

- **Cash reaches zero:** the round closes at zero; continuity support may apply next round.
- **Inventory reaches zero:** sales stop at available stock; lost sales and satisfaction effects still apply.
- **Extremely low demand:** sales may be zero; costs still occur and unsold inventory carries forward.
- **Student overspends:** reject the entire submission before resolution.
- **Cannot afford desired inventory:** require a lower purchase or other spending; do not auto-reduce one decision.
- **Too few employees:** capacity constrains sales and high workload reduces morale/service satisfaction.
- **Excess inventory:** it carries forward and ties up cash; there is no spoilage in this MVP.
- **Skipped decision set:** apply the complete deadline defaults above.
- **Invalid values:** reject with field-level errors and no state mutation.
- **Negative calculated cash:** this cannot follow a valid submission because upfront commitments are fully cash-covered and revenue is nonnegative. Treat it as an engine invariant failure, not a gameplay result.

There is no game-ending bankruptcy in this MVP.

## 20. Determinism and invariants

The same `ruleset_id + opening company state + validated decisions + event record + competitor state` MUST produce byte-equivalent numeric outputs and explanation values.

The engine MUST NOT use current time, unordered iteration, floating-point platform defaults, network data, or unstored randomness during resolution. A future implementation should use decimal or fixed-point arithmetic for monetary calculations.

After every round, these invariants MUST hold:

- `0 ≤ units_sold ≤ potential_demand`;
- `0 ≤ units_sold ≤ inv_available`;
- `0 ≤ units_sold ≤ capacity`;
- `inv_close = inv_available − units_sold` and is nonnegative;
- `lost_sales = potential_demand − units_sold` and is nonnegative;
- `cash_close ≥ 0`;
- `0 ≤ sat_close ≤ 100`;
- `0 ≤ morale_close ≤ 100`;
- `0 ≤ student_market_share ≤ 100`;
- allocated potential demand sums exactly to total market demand;
- operating-profit and cash equations reconcile exactly; and
- resolving a round never mutates its opening-state record.

## 21. Worked example — Round 2

The following values are illustrative calculations under this ruleset, not final calibration evidence.

### 21.1 Opening state and event

```text
cash_open          = ₦10,000,000
inv_open           = 1,000 units
inv_value_open     = ₦3,000,000
employees_open     = 20
sat_open           = 60
morale_open        = 60
invest_stock_open  = ₦0
market_base        = 10,000 units
event              = Positive demand trend (market_mult 1.10)
```

### 21.2 Student decisions

```text
price              = ₦5,000
marketing          = ₦500,000
purchase_qty       = 800 units
employees_target   = 20
investment         = ₦500,000
```

### 21.3 Validation and costs known before sales

```text
supplier_unit_cost = ₦3,000
purchase_cost      = 800 × ₦3,000 = ₦2,400,000
wages              = 20 × ₦75,000 = ₦1,500,000
hire/severance     = ₦0
operating_expense  = ₦500,000

upfront_commitment = 2,400,000 + 500,000 + 1,500,000
                     + 500,000 + 500,000
                   = ₦5,400,000
```

The decision is affordable because ₦5,400,000 ≤ ₦10,000,000.

### 21.4 Capacity

```text
morale_factor      = 0.75 + 60/240 = 1.00
investment_effect  = 0 because new investment starts next round
capacity           = floor(20 × 75 × 1.00 × 1.00)
                   = 1,500 units
```

### 21.5 Demand

Active prices are ₦5,000 student, ₦4,500 ValueMart, ₦5,000 CoreRetail, and ₦6,000 PrimeChoice.

```text
reference_price    = (5,000 + 4,500 + 5,000 + 6,000) / 4
                   = ₦5,125
total_market_demand = 10,000 × 1.10 = 11,000 units
```

Using the Section 10 formulas:

| Company | Attraction score | Raw quota | Allocated demand |
| --- | ---: | ---: | ---: |
| Student | 0.225902 | 2,170.539 | 2,171 |
| ValueMart | 0.358277 | 3,442.432 | 3,442 |
| CoreRetail | 0.324170 | 3,114.723 | 3,115 |
| PrimeChoice | 0.236494 | 2,272.306 | 2,272 |

Floors allocate 10,998 units. The two remaining units go to the largest remainders: CoreRetail, then Student. Allocated demand totals exactly 11,000.

### 21.6 Sales, profit, and cash

```text
inv_available      = 1,000 + 800 = 1,800 units
potential_demand   = 2,171 units
units_sold         = min(2,171, 1,800, 1,500) = 1,500
lost_sales         = 671 units
inv_close          = 300 units
revenue            = 1,500 × ₦5,000 = ₦7,500,000
weighted_unit_cost = ₦3,000
COGS               = 1,500 × ₦3,000 = ₦4,500,000
inv_value_close    = 300 × ₦3,000 = ₦900,000

operating_profit   = 7,500,000 − 4,500,000 − 500,000
                     − 1,500,000 − 500,000
                   = ₦500,000

cash_close         = 10,000,000 + 7,500,000 − 2,400,000
                     − 500,000 − 1,500,000 − 500,000 − 500,000
                   = ₦12,100,000
```

Profit and cash differ because cash paid for all 800 purchased units, while profit recognizes only the cost of the 1,500 units sold, including opening stock.

### 21.7 Satisfaction, morale, investment, and share

```text
fill_rate          = 1,500 / 2,171 = 0.690926
workload           = 1,500 / 1,500 = 1.00
price_delta        = round(20 × 125/5,125) = 0
availability_delta = round(10 × (0.690926 − 0.90)) = −2
service_delta      = round(8 × (0.85 − 1.00)) = −1
quality_delta      = 0
sat_close          = 60 − 2 − 1 = 57

workload_morale_delta = round(10 × (0.80 − 1.00)) = −2
morale_close       = 60 − 2 = 58
invest_stock_close = round(0.80 × 0) + ₦500,000 = ₦500,000
```

The benchmark competitors have enough capacity for their allocated demand, so total actual sales are:

```text
total_actual_sales = 1,500 + 3,442 + 3,115 + 2,272
                   = 10,329 units
student_market_share = 1,500 / 10,329 × 100
                     = 14.522218% (display 14.5%)
```

The explanation should state that capacity, not inventory, was the binding sales constraint; 671 potential sales were lost; investment reduced current cash but will begin helping in the next round.

## 22. Educational mapping

| Mechanic | Business Management connection |
| --- | --- |
| Pricing | Pricing strategy, elasticity, unit margin, competitive positioning |
| Marketing | Resource allocation, customer acquisition, diminishing returns |
| Inventory | Operations management, service level, working capital, stockouts |
| Workforce | Human resource planning, capacity, productivity, morale |
| Investment | Capital allocation, delayed returns, capability development |
| Competitors | Competitive strategy and market positioning |
| Market events | Environmental analysis, uncertainty, and risk response |
| Profit versus cash | Accrual thinking, liquidity, and working-capital management |
| Satisfaction | Customer value, availability, pricing fairness, service quality |
| Leaderboard score | Balanced performance rather than single-metric optimization |

Each result screen should explain which decisions and constraints produced the outcome. Explanations must be derived from recorded formula contributions, not generated guesses.

## 23. Design principles

1. The rules must be easy to understand.
2. The simulation should be difficult to master.
3. Multiple strategies must remain viable.
4. Every major decision must have a trade-off.
5. There must be no single guaranteed winning strategy.
6. Results must be explainable.
7. Results must be reproducible.
8. The model must suit university classroom use.
9. The model must later support other industries through versioned configuration.
10. The MVP must remain simple enough to calibrate after real student testing.

## 24. Calibration and versioning requirements

Classroom pilots must review at least: price elasticity, demand and marketing response, purchase and wage costs, capacity per employee, investment decay/effect, satisfaction and morale deltas, competitor parameters, event modifiers, continuity threshold/penalty, and score benchmarks.

Calibration MUST change configuration values, not formula behavior, unless a new `ruleset_id` is created. A simulation stores its ruleset and event schedule at creation and never adopts later changes mid-run.

## 25. Implementation acceptance tests

Before the future engine is considered conformant, it must demonstrate:

1. Re-resolving one saved input fixture produces identical outputs.
2. Invalid or unaffordable decisions leave state unchanged.
3. Demand allocations sum exactly to total market demand.
4. Sales never exceed demand, inventory, or capacity.
5. Profit, inventory book value, and cash independently reconcile.
6. New investment has no current-round benefit and affects the next round.
7. Deadline defaults resolve without manual input.
8. Continuity support keeps a cash-depleted company playable and applies its penalty.
9. Score components sum to the displayed score before clamping and rounding.
10. The worked example in Section 21 is reproduced exactly within the stated display precision.
