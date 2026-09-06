"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  Info,
  Megaphone,
  Scale,
  ShieldCheck,
  Store,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { Button, Card, CardContent, CardHeader, Input, MetricCard, StatusIndicator } from "@/components/ui";
import { BASE_COMPETITORS, marketForRound } from "@/domain/simulation";
import { StudentPage } from "@/features/student/shell";
import {
  MARKETING_MAX,
  MARKETING_MIN,
  MARKETING_STEP,
  marketingDecisionError,
} from "./decision-session";
import { useDecisionSession } from "./decision-session-context";

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function MarketingDecisionScreen() {
  const { companyState, decisions, setMarketing } = useDecisionSession();
  const market = useMemo(() => marketForRound(companyState.r), [companyState.r]);
  const [draft, setDraft] = useState(decisions.marketing ?? MARKETING_MIN);
  const [saved, setSaved] = useState(decisions.marketing !== undefined);
  const error = marketingDecisionError(draft);
  const cashAfterMarketing = companyState.cash_open - draft;
  const competitorCount = (market.competitors ?? BASE_COMPETITORS).length;

  function updateMarketing(value: number) {
    setDraft(value);
    const nextError = marketingDecisionError(value);
    if (nextError) {
      setSaved(false);
      return;
    }
    setMarketing(value);
    setSaved(true);
  }

  return (
    <StudentPage
      eyebrow={`Round ${companyState.r} decision`}
      title="Marketing Decision"
      description="Decide how much to spend supporting customer attraction this round."
    >
      <section className="mb-5 overflow-hidden rounded-card border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-brand-50 shadow-card">
        <div className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
              <Megaphone size={25} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Build attention without losing sight of cash</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">Marketing can improve your ability to attract available demand, but the full amount is paid before sales and does not carry into the next round.</p>
          </div>
          <div className="rounded-xl border border-emerald-200/80 bg-white/75 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">Same-round strategy</p>
            <p className="mt-2 text-sm leading-6 text-muted">Treat Marketing and Pricing as connected choices. Neither decision works in isolation.</p>
          </div>
        </div>
      </section>

      <Card className="mb-5 border-amber-200 bg-amber-50/60">
        <CardContent className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700"><Info size={20} aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-amber-800">Current market situation</p>
            <h2 className="mt-1 font-bold text-ink">{market.event_title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted">{market.event_explanation} Consider this alongside the {competitorCount} active competitor profiles in this round.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.55fr)]">
        <div className="space-y-5">
          <Card>
            <CardHeader className="flex-col sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold">Set your marketing budget</h2>
                <p className="mt-1 text-sm text-muted">Choose one total commitment for this round.</p>
              </div>
              <StatusIndicator tone={saved ? "success" : "warning"}>{saved ? "Decision staged" : "Choose an amount"}</StatusIndicator>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-center sm:p-7">
                <p className="text-sm font-semibold text-brand-700">Marketing this round</p>
                <output htmlFor="marketing-budget marketing-budget-input" className="mt-2 block text-3xl font-extrabold tracking-tight text-ink sm:text-4xl" aria-live="polite">{formatNaira(draft)}</output>
                <p className="mt-2 text-sm text-muted">Paid upfront · No carryover</p>
              </div>

              <div className="mt-7">
                <label htmlFor="marketing-budget" className="text-sm font-bold text-ink">Adjust marketing commitment</label>
                <input
                  id="marketing-budget"
                  type="range"
                  min={MARKETING_MIN}
                  max={MARKETING_MAX}
                  step={MARKETING_STEP}
                  value={draft}
                  onChange={(event) => updateMarketing(Number(event.target.value))}
                  className="mt-4 h-3 w-full cursor-pointer accent-brand-600"
                />
                <div className="mt-2 flex justify-between text-xs font-medium text-muted"><span>₦0</span><span>₦1,000,000</span><span>₦2,000,000</span></div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-end">
                <label htmlFor="marketing-budget-input">
                  <span className="mb-2 block text-sm font-semibold">Exact budget</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-muted">₦</span>
                    <Input id="marketing-budget-input" type="number" inputMode="numeric" min={MARKETING_MIN} max={MARKETING_MAX} step={MARKETING_STEP} value={draft} onChange={(event) => updateMarketing(Number(event.target.value))} aria-invalid={Boolean(error)} className="h-12 pl-8 text-base font-bold" />
                  </div>
                </label>
                <p className={`text-sm leading-6 ${error ? "text-red-600" : "text-muted"}`}>{error ?? "Allowed range: ₦0–₦2,000,000 in ₦100,000 increments."}</p>
              </div>

              {saved && !error && <div role="status" className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><CheckCircle2 className="mt-0.5 shrink-0" size={18} /><span>Marketing is staged for this round. Your Pricing decision and company state remain unchanged.</span></div>}
              <Button type="button" size="lg" className="mt-5 w-full sm:w-auto" onClick={() => updateMarketing(draft)} disabled={Boolean(error)}>Save marketing decision</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><div><h2 className="text-lg font-bold">Understand the trade-off</h2><p className="mt-1 text-sm text-muted">There is no universally correct budget.</p></div><Scale className="shrink-0 text-violet-600" size={22} aria-hidden="true" /></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><TrendingUp size={19} className="text-blue-600" />Higher marketing</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Can improve your ability to attract available demand.</li><li>Raises upfront spending and operating-cost pressure.</li><li>Leaves less cash for other commitments.</li></ul></div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><ShieldCheck size={19} className="text-brand-600" />Lower marketing</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Preserves more cash for other commitments.</li><li>Reduces upfront spending.</li><li>Provides less marketing support for demand attraction.</li></ul></div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card>
            <CardHeader><h2 className="font-bold">Current strategy</h2></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4"><span className="flex items-center gap-2 text-sm font-semibold text-muted"><Store size={18} className="text-blue-600" />Pricing</span><strong>{decisions.price === undefined ? "Not set" : `${formatNaira(decisions.price)} / unit`}</strong></div>
              <div className="flex items-center justify-between gap-4 rounded-lg bg-emerald-50 p-4"><span className="flex items-center gap-2 text-sm font-semibold text-brand-700"><Megaphone size={18} />Marketing</span><strong>{formatNaira(draft)}</strong></div>
              {decisions.price === undefined && <p className="text-sm leading-6 text-amber-700">Set Pricing before completing the round strategy.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-bold">Cash commitment</h2></CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <MetricCard label="Cash available" value={formatNaira(companyState.cash_open)} icon={WalletCards} tone="green" />
              <MetricCard label="Cash after marketing only" value={formatNaira(cashAfterMarketing)} icon={Banknote} tone="amber" />
            </CardContent>
          </Card>
        </aside>
      </div>

      <nav aria-label="Decision navigation" className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/student/pricing" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 font-semibold text-ink transition-colors hover:bg-slate-50"><ArrowLeft size={18} />Back to Pricing</Link>
        <Link href="/student/inventory" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-brand-600 bg-brand-600 px-5 font-semibold text-white transition-colors hover:bg-brand-700">Continue to Inventory<ArrowRight size={18} /></Link>
      </nav>
    </StudentPage>
  );
}
