"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  BriefcaseBusiness,
  CheckCircle2,
  Gauge,
  Info,
  Megaphone,
  Minus,
  PackageOpen,
  Plus,
  Scale,
  ShieldCheck,
  Smile,
  Tags,
  TrendingUp,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { Button, Card, CardContent, CardHeader, Input, MetricCard, StatusIndicator } from "@/components/ui";
import { marketForRound } from "@/domain/simulation";
import { StudentPage } from "@/features/student/shell";
import {
  WORKFORCE_TARGET_MAX,
  WORKFORCE_TARGET_MIN,
  WORKFORCE_TARGET_STEP,
  workforceTargetError,
} from "./decision-session";
import { useDecisionSession } from "./decision-session-context";

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function operatingCostSituation(multiplier = 1) {
  if (multiplier > 1) return "Fixed operating costs are above baseline this round.";
  if (multiplier < 1) return "Fixed operating costs are below baseline this round.";
  return "Standard fixed operating-cost conditions apply this round.";
}

function workforceChangeLabel(current: number, target: number) {
  const change = target - current;
  if (change > 0) return `Increase by ${change} employee${change === 1 ? "" : "s"}`;
  if (change < 0) return `Reduce by ${Math.abs(change)} employee${change === -1 ? "" : "s"}`;
  return "Maintain current workforce";
}

export function WorkforceDecisionScreen() {
  const { companyState, decisions, setEmployeesTarget } = useDecisionSession();
  const market = useMemo(() => marketForRound(companyState.r), [companyState.r]);
  const [draft, setDraft] = useState(decisions.employees_target ?? companyState.employees_open);
  const [saved, setSaved] = useState(decisions.employees_target !== undefined);
  const error = workforceTargetError(draft);
  const inventoryBeforeSales = companyState.inv_open + (decisions.purchase_qty ?? 0);

  function updateWorkforceTarget(target: number) {
    setDraft(target);
    const nextError = workforceTargetError(target);
    if (nextError) {
      setSaved(false);
      return;
    }
    setEmployeesTarget(target);
    setSaved(true);
  }

  function adjustWorkforce(change: number) {
    const next = Math.round(draft + change);
    updateWorkforceTarget(Math.min(WORKFORCE_TARGET_MAX, Math.max(WORKFORCE_TARGET_MIN, next)));
  }

  return (
    <StudentPage
      eyebrow={`Round ${companyState.r} decision`}
      title="Workforce Decision"
      description="Set the total number of employees your company will operate with this round."
    >
      <section className="mb-5 overflow-hidden rounded-card border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-brand-50 shadow-card">
        <div className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm"><UsersRound size={25} aria-hidden="true" /></div>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Build capacity without overcommitting payroll</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">A larger team can support more operational activity, but workforce costs become an upfront commitment before final sales are known.</p>
          </div>
          <div className="rounded-xl border border-emerald-200/80 bg-white/75 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">The decision</p>
            <p className="mt-2 text-sm leading-6 text-muted"><strong className="text-ink">Target workforce</strong> is your company&apos;s total employee count after this adjustment—not the number being hired.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="workforce-context-title" className="mb-5">
        <div className="mb-3 flex items-center gap-2"><Info size={19} className="text-blue-600" aria-hidden="true" /><h2 id="workforce-context-title" className="font-bold text-ink">Current workforce and business context</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Current employees" value={companyState.employees_open.toLocaleString()} icon={UsersRound} tone="blue" />
          <MetricCard label="Current morale" value={`${companyState.morale_open}/100`} icon={Smile} tone="amber" />
          <MetricCard label="Cash available" value={formatNaira(companyState.cash_open)} icon={WalletCards} tone="green" />
          <MetricCard label="Stock before sales" value={`${inventoryBeforeSales.toLocaleString()} units`} icon={Boxes} tone="violet" />
        </div>
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-amber-800">Round {companyState.r} operating context</p>
          <p className="mt-1 font-bold text-ink">{market.event_title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{market.event_explanation} {operatingCostSituation(market.opex_mult)}</p>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.55fr)]">
        <div className="space-y-5">
          <Card>
            <CardHeader className="flex-col sm:flex-row sm:items-center">
              <div><h2 className="text-lg font-bold">Set your target workforce</h2><p className="mt-1 text-sm text-muted">Choose the total workforce for this round.</p></div>
              <StatusIndicator tone={saved ? "success" : "warning"}>{saved ? "Decision staged" : "Choose a target"}</StatusIndicator>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-center sm:p-7">
                <p className="text-sm font-semibold text-brand-700">Target workforce</p>
                <output htmlFor="workforce-target workforce-target-input" className="mt-2 block text-3xl font-extrabold tracking-tight text-ink sm:text-4xl" aria-live="polite">{draft.toLocaleString()} employees</output>
                <p className="mt-2 text-sm font-medium text-muted">{workforceChangeLabel(companyState.employees_open, draft)}</p>
              </div>

              <div className="mt-7">
                <label htmlFor="workforce-target" className="text-sm font-bold text-ink">Adjust total workforce</label>
                <input id="workforce-target" type="range" min={WORKFORCE_TARGET_MIN} max={WORKFORCE_TARGET_MAX} step={WORKFORCE_TARGET_STEP} value={draft} onChange={(event) => updateWorkforceTarget(Number(event.target.value))} className="mt-4 h-3 w-full cursor-pointer accent-brand-600" />
                <div className="mt-2 flex justify-between text-xs font-medium text-muted"><span>10 employees</span><span>25 employees</span><span>40 employees</span></div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] sm:items-end">
                <div>
                  <label htmlFor="workforce-target-input" className="mb-2 block text-sm font-semibold">Exact target</label>
                  <div className="grid grid-cols-[3rem_minmax(0,1fr)_3rem] gap-2">
                    <Button variant="secondary" size="lg" aria-label="Decrease target workforce by one employee" onClick={() => adjustWorkforce(-WORKFORCE_TARGET_STEP)} disabled={draft <= WORKFORCE_TARGET_MIN}><Minus size={19} /></Button>
                    <Input id="workforce-target-input" type="number" inputMode="numeric" min={WORKFORCE_TARGET_MIN} max={WORKFORCE_TARGET_MAX} step={WORKFORCE_TARGET_STEP} value={draft} onChange={(event) => updateWorkforceTarget(Number(event.target.value))} aria-invalid={Boolean(error)} aria-describedby="workforce-target-help" className="h-12 text-center text-base font-bold" />
                    <Button variant="secondary" size="lg" aria-label="Increase target workforce by one employee" onClick={() => adjustWorkforce(WORKFORCE_TARGET_STEP)} disabled={draft >= WORKFORCE_TARGET_MAX}><Plus size={19} /></Button>
                  </div>
                </div>
                <p id="workforce-target-help" className={`text-sm leading-6 ${error ? "text-red-600" : "text-muted"}`}>{error ?? "Allowed range: 10–40 total employees in whole-employee increments."}</p>
              </div>

              <div className="mt-5 grid gap-3 rounded-xl border border-border bg-slate-50 p-4 sm:grid-cols-2 sm:items-center">
                <div><p className="text-xs font-semibold uppercase tracking-wide text-muted">Current workforce</p><p className="mt-1 text-lg font-bold">{companyState.employees_open.toLocaleString()} employees</p></div>
                <div className="sm:border-l sm:border-border sm:pl-5"><p className="text-xs font-semibold uppercase tracking-wide text-muted">After adjustment</p><p className="mt-1 text-lg font-bold">{draft.toLocaleString()} employees</p><p className="mt-1 text-xs text-muted">{workforceChangeLabel(companyState.employees_open, draft)}</p></div>
              </div>

              {saved && !error && <div role="status" className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><CheckCircle2 className="mt-0.5 shrink-0" size={18} /><span>Workforce target is staged. Pricing, Marketing, and Inventory remain unchanged.</span></div>}
              <Button type="button" size="lg" className="mt-5 w-full sm:w-auto" onClick={() => updateWorkforceTarget(draft)} disabled={Boolean(error)}>Save workforce decision</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><div><h2 className="text-lg font-bold">Understand the trade-off</h2><p className="mt-1 text-sm text-muted">Balance operational capacity with workforce commitment.</p></div><Scale className="shrink-0 text-violet-600" size={22} aria-hidden="true" /></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><TrendingUp size={19} className="text-blue-600" />Higher workforce target</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Can support greater operational capacity.</li><li>Increases workforce cost and upfront commitment.</li><li>May provide more ability to serve stronger demand.</li></ul></div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><ShieldCheck size={19} className="text-brand-600" />Lower workforce target</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Preserves cash and reduces payroll pressure.</li><li>May constrain operational capacity.</li><li>Can limit the company&apos;s ability to support demand.</li></ul></div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card>
            <CardHeader><h2 className="font-bold">Current round strategy</h2></CardHeader>
            <CardContent className="space-y-3">
              <StrategyRow label="Pricing" value={decisions.price === undefined ? "Not set" : `${formatNaira(decisions.price)} / unit`} icon={Tags} tone="text-blue-600" />
              <StrategyRow label="Marketing" value={decisions.marketing === undefined ? "Not set" : formatNaira(decisions.marketing)} icon={Megaphone} tone="text-violet-600" />
              <StrategyRow label="Inventory" value={decisions.purchase_qty === undefined ? "Not set" : `${decisions.purchase_qty.toLocaleString()} units`} icon={PackageOpen} tone="text-amber-600" />
              <StrategyRow label="Workforce" value={`${draft.toLocaleString()} employees`} icon={UsersRound} tone="text-brand-600" />
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-navy-900 text-white">
            <CardContent>
              <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500"><Gauge size={22} /></span><div><p className="text-xs uppercase tracking-wider text-slate-400">Capacity and cost</p><h2 className="mt-1 text-lg font-bold">Staffing shapes operations</h2></div></div>
              <p className="mt-5 text-sm leading-6 text-slate-300">Employee count contributes to capacity, while wages and staffing changes contribute to upfront workforce cost. Final capacity depends on other company conditions and is determined when the round resolves.</p>
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-violet-50/60">
            <CardContent className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700"><BriefcaseBusiness size={20} /></span><div><h2 className="font-bold text-ink">Workforce insight</h2><p className="mt-1 text-sm leading-6 text-muted">Hiring and workforce reductions can create adjustment pressure. Final morale also reflects workload and other round outcomes.</p></div></CardContent>
          </Card>
        </aside>
      </div>

      <nav aria-label="Decision navigation" className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/student/inventory" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 font-semibold text-ink transition-colors hover:bg-slate-50"><ArrowLeft size={18} />Back to Inventory</Link>
        <Link href="/student/investment" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-brand-600 bg-brand-600 px-5 font-semibold text-white transition-colors hover:bg-brand-700">Continue to Investment<ArrowRight size={18} /></Link>
      </nav>
    </StudentPage>
  );
}

function StrategyRow({ label, value, icon: Icon, tone }: { label: string; value: string; icon: typeof Tags; tone: string }) {
  return <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2 text-sm font-semibold text-muted"><Icon size={18} className={tone} />{label}</span><strong>{value}</strong></div>;
}
