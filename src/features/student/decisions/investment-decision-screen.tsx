"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDot,
  Clock3,
  Coins,
  Info,
  Landmark,
  Megaphone,
  PackageOpen,
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
  INVESTMENT_MAX,
  INVESTMENT_MIN,
  INVESTMENT_STEP,
  investmentDecisionError,
} from "./decision-session";
import { useDecisionSession } from "./decision-session-context";

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function InvestmentDecisionScreen() {
  const { companyState, decisions, setInvestment } = useDecisionSession();
  const market = useMemo(() => marketForRound(companyState.r), [companyState.r]);
  const [draft, setDraft] = useState(decisions.investment ?? INVESTMENT_MIN);
  const [saved, setSaved] = useState(decisions.investment !== undefined);
  const error = investmentDecisionError(draft);

  function updateInvestment(investment: number) {
    setDraft(investment);
    const nextError = investmentDecisionError(investment);
    if (nextError) {
      setSaved(false);
      return;
    }
    setInvestment(investment);
    setSaved(true);
  }

  return (
    <StudentPage
      eyebrow={`Round ${companyState.r} · Final decision area`}
      title="Investment Decision"
      description="Choose how much cash to commit to strengthening future company capability."
    >
      <section className="mb-5 overflow-hidden rounded-card border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-brand-50 shadow-card">
        <div className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm"><Landmark size={25} aria-hidden="true" /></div>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Strengthen tomorrow without losing sight of today</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">Investment builds persistent company capability for future rounds, while the full amount is committed from cash today.</p>
          </div>
          <div className="rounded-xl border border-emerald-200/80 bg-white/75 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">Timing matters</p>
            <p className="mt-2 text-sm leading-6 text-muted">Existing investment stock supports this round. Your new Investment is added to the capability carried into the next round.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="investment-context-title" className="mb-5">
        <div className="mb-3 flex items-center gap-2"><Info size={19} className="text-blue-600" aria-hidden="true" /><h2 id="investment-context-title" className="font-bold text-ink">Investment and company context</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Existing investment stock" value={formatNaira(companyState.invest_stock_open)} icon={Coins} tone="violet" />
          <MetricCard label="Cash available" value={formatNaira(companyState.cash_open)} icon={WalletCards} tone="green" />
          <MetricCard label="Current workforce" value={`${companyState.employees_open.toLocaleString()} employees`} icon={UsersRound} tone="blue" />
          <MetricCard label="Current morale" value={`${companyState.morale_open}/100`} icon={Smile} tone="amber" />
        </div>
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-amber-800">Round {companyState.r} market context</p>
          <p className="mt-1 font-bold text-ink">{market.event_title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{market.event_explanation} Consider the immediate environment alongside the longer-term capability you want to carry forward.</p>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.55fr)]">
        <div className="space-y-5">
          <Card>
            <CardHeader className="flex-col sm:flex-row sm:items-center">
              <div><h2 className="text-lg font-bold">Set your Investment</h2><p className="mt-1 text-sm text-muted">Choose one company-wide investment amount for this round.</p></div>
              <StatusIndicator tone={saved ? "success" : "warning"}>{saved ? "Decision staged" : "Choose an amount"}</StatusIndicator>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-center sm:p-7">
                <p className="text-sm font-semibold text-brand-700">Investment this round</p>
                <output htmlFor="investment-amount investment-amount-input" className="mt-2 block text-3xl font-extrabold tracking-tight text-ink sm:text-4xl" aria-live="polite">{formatNaira(draft)}</output>
                <p className="mt-2 text-sm text-muted">Committed upfront · Added to future investment stock</p>
              </div>

              <div className="mt-7">
                <label htmlFor="investment-amount" className="text-sm font-bold text-ink">Adjust Investment</label>
                <input id="investment-amount" type="range" min={INVESTMENT_MIN} max={INVESTMENT_MAX} step={INVESTMENT_STEP} value={draft} onChange={(event) => updateInvestment(Number(event.target.value))} className="mt-4 h-3 w-full cursor-pointer accent-brand-600" />
                <div className="mt-2 flex justify-between text-xs font-medium text-muted"><span>₦0</span><span>₦1,000,000</span><span>₦2,000,000</span></div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-end">
                <label htmlFor="investment-amount-input">
                  <span className="mb-2 block text-sm font-semibold">Exact amount</span>
                  <div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-muted">₦</span><Input id="investment-amount-input" type="number" inputMode="numeric" min={INVESTMENT_MIN} max={INVESTMENT_MAX} step={INVESTMENT_STEP} value={draft} onChange={(event) => updateInvestment(Number(event.target.value))} aria-invalid={Boolean(error)} aria-describedby="investment-amount-help" className="h-12 pl-8 text-base font-bold" /></div>
                </label>
                <p id="investment-amount-help" className={`text-sm leading-6 ${error ? "text-red-600" : "text-muted"}`}>{error ?? "Allowed range: ₦0–₦2,000,000 in ₦100,000 increments."}</p>
              </div>

              {saved && !error && <div role="status" className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><CheckCircle2 className="mt-0.5 shrink-0" size={18} /><span>Investment is staged. Your complete five-part strategy is ready for a later review step; the round has not been submitted.</span></div>}
              <Button type="button" size="lg" className="mt-5 w-full sm:w-auto" onClick={() => updateInvestment(draft)} disabled={Boolean(error)}>Save investment decision</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><div><h2 className="text-lg font-bold">Balance today and tomorrow</h2><p className="mt-1 text-sm text-muted">Investment is a different commitment from day-to-day operating choices.</p></div><Scale className="shrink-0 text-violet-600" size={22} aria-hidden="true" /></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><TrendingUp size={19} className="text-blue-600" />Higher Investment</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Builds more capability stock for future rounds.</li><li>Requires a greater cash commitment now.</li><li>Leaves less financial flexibility for other commitments.</li></ul></div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><ShieldCheck size={19} className="text-brand-600" />Lower Investment</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Preserves more cash today.</li><li>Maintains greater financial flexibility.</li><li>Adds less capability stock for future rounds.</li></ul></div>
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-violet-50/60">
            <CardContent className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]"><span className="flex size-11 items-center justify-center rounded-lg bg-violet-100 text-violet-700"><Clock3 size={22} /></span><div><h2 className="font-bold text-ink">How investment carries forward</h2><p className="mt-1 text-sm leading-6 text-muted">Existing investment stock can support operating capability, cost efficiency, morale, and satisfaction. At the round transition, part of existing stock rolls off and this round&apos;s Investment is added for future use.</p><p className="mt-2 text-sm font-semibold text-violet-800">Investment can strengthen the company beyond this round, but the cash is committed today.</p></div></CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card>
            <CardHeader><div><h2 className="font-bold">Decision progress</h2><p className="mt-1 text-sm text-muted">Five parts form one round strategy.</p></div></CardHeader>
            <CardContent className="space-y-3">
              <ProgressRow label="Pricing" complete={decisions.price !== undefined} />
              <ProgressRow label="Marketing" complete={decisions.marketing !== undefined} />
              <ProgressRow label="Inventory" complete={decisions.purchase_qty !== undefined} />
              <ProgressRow label="Workforce" complete={decisions.employees_target !== undefined} />
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-brand-700"><span className="flex items-center gap-2"><CircleDot size={18} />Investment</span><span>{saved ? "Staged" : "Current"}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-bold">Complete round strategy</h2></CardHeader>
            <CardContent className="space-y-3">
              <StrategyRow label="Pricing" value={decisions.price === undefined ? "Not set" : `${formatNaira(decisions.price)} / unit`} icon={Tags} />
              <StrategyRow label="Marketing" value={decisions.marketing === undefined ? "Not set" : formatNaira(decisions.marketing)} icon={Megaphone} />
              <StrategyRow label="Inventory" value={decisions.purchase_qty === undefined ? "Not set" : `${decisions.purchase_qty.toLocaleString()} units`} icon={PackageOpen} />
              <StrategyRow label="Workforce" value={decisions.employees_target === undefined ? "Not set" : `${decisions.employees_target.toLocaleString()} employees`} icon={UsersRound} />
              <StrategyRow label="Investment" value={formatNaira(draft)} icon={Landmark} />
            </CardContent>
          </Card>
        </aside>
      </div>

      <nav aria-label="Decision navigation" className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/student/workforce" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 font-semibold text-ink transition-colors hover:bg-slate-50"><ArrowLeft size={18} />Back to Workforce</Link>
        <button type="button" disabled className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-border bg-slate-100 px-5 font-semibold text-muted" title="Decision Review is not available yet">Review coming next<ArrowRight size={18} /></button>
      </nav>
    </StudentPage>
  );
}

function ProgressRow({ label, complete }: { label: string; complete: boolean }) {
  return <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm font-semibold"><span className="flex items-center gap-2"><span className={`flex size-5 items-center justify-center rounded-full ${complete ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-500"}`}>{complete ? <Check size={13} /> : null}</span>{label}</span><span className={complete ? "text-brand-700" : "text-muted"}>{complete ? "Staged" : "Not set"}</span></div>;
}

function StrategyRow({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ size?: number; className?: string }> }) {
  return <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2 text-sm font-semibold text-muted"><Icon size={18} className="text-brand-600" />{label}</span><strong>{value}</strong></div>;
}
