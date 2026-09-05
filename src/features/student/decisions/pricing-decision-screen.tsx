"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleDollarSign, Info, Package, Store, Users } from "lucide-react";
import { marketForRound, BASE_COMPETITORS, validateDecisions } from "@/domain/simulation";
import { Button, Card, CardContent, CardHeader, Input, MetricCard, StatusIndicator } from "@/components/ui";
import { StudentPage } from "@/features/student/shell";
import { useDecisionSession } from "./decision-session-context";

const SUPPLY_CAP = 2500;

function priceError(price: number | undefined) {
  if (price === undefined || !Number.isFinite(price)) return "Enter a selling price.";
  const errors = validateDecisions({ price, marketing: 0, purchase_qty: 0, employees_target: 10, investment: 0 }, SUPPLY_CAP);
  return errors.find((error) => error.field === "price")?.message;
}

export function PricingDecisionScreen() {
  const { companyState, decisions, setPrice } = useDecisionSession();
  const market = useMemo(() => marketForRound(companyState.r), [companyState.r]);
  const [draft, setDraft] = useState(String(decisions.price ?? companyState.price_prev));
  const [saved, setSaved] = useState(Boolean(decisions.price));
  const error = priceError(draft === "" ? undefined : Number(draft));
  const competitorPrices = (market.competitors ?? BASE_COMPETITORS).map((competitor) => competitor.price);
  const averageCompetitorPrice = Math.round(competitorPrices.reduce((sum, price) => sum + price, 0) / competitorPrices.length);

  function savePrice() {
    const price = Number(draft);
    if (priceError(price)) {
      setSaved(false);
      return;
    }
    setPrice(price);
    setSaved(true);
  }

  return (
    <StudentPage title="Pricing Decision" description="Set the selling price your company will use for the current round.">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <div className="space-y-5">
          <Card>
            <CardHeader><div><h2 className="font-bold">Set your selling price</h2><p className="mt-1 text-sm text-muted">Choose a price that balances customer attraction with unit margin.</p></div><StatusIndicator tone={saved ? "success" : "warning"}>{saved ? "Saved" : "Not saved"}</StatusIndicator></CardHeader>
            <CardContent>
              <label className="block max-w-md"><span className="mb-2 block text-sm font-semibold">Selling price per unit</span><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">₦</span><Input type="number" inputMode="numeric" min={3500} max={7500} step={100} value={draft} onChange={(event) => { setDraft(event.target.value); setSaved(false); }} aria-invalid={Boolean(error)} className="h-12 pl-8 text-lg font-bold" /></div><p className={`mt-2 text-sm ${error ? "text-red-600" : "text-muted"}`}>{error ?? "Allowed range: ₦3,500 to ₦7,500 in ₦100 increments."}</p></label>
              {saved && <div role="status" className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><CheckCircle2 className="mt-0.5 shrink-0" size={18} /><span>Pricing decision saved. Marketing, inventory, workforce, and investment decisions are still required.</span></div>}
              <Button type="button" size="lg" className="mt-6" onClick={savePrice} disabled={Boolean(error)}>Save &amp; Continue</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><div className="flex items-center gap-2"><Info size={18} className="text-blue-600" /><div><h2 className="font-bold">Pricing context</h2><p className="mt-1 text-sm text-muted">Use the current market as a reference point.</p></div></div></CardHeader>
            <CardContent><div className="grid gap-3 sm:grid-cols-3"><MetricCard label="Previous price" value={`₦${companyState.price_prev.toLocaleString()}`} icon={CircleDollarSign} tone="blue" /><MetricCard label="Competitor average" value={`₦${averageCompetitorPrice.toLocaleString()}`} icon={Store} tone="violet" /><MetricCard label="Market demand" value={`${Math.round((market.market_base ?? 0) * (market.market_mult ?? 1)).toLocaleString()} units`} icon={Package} tone="green" /></div><div className="mt-5 rounded-lg border border-border bg-slate-50/70 p-4"><p className="text-sm font-semibold">{market.event_title}</p><p className="mt-1 text-sm leading-6 text-muted">{market.event_explanation}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"><span className="flex items-center gap-2"><Users size={16} />{(market.competitors ?? BASE_COMPETITORS).length} benchmark competitors</span><span>Round {companyState.r} of 6</span></div></div></CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card className="border-slate-800 bg-navy-900 text-white"><CardContent><div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500"><Store size={22} /></span><div><p className="text-xs uppercase tracking-wider text-slate-400">Decision goal</p><h2 className="mt-1 text-lg font-bold">Compete for demand</h2></div></div><p className="mt-5 text-sm leading-6 text-slate-300">A lower price can improve attraction, while a higher price can improve margin. Your price will be evaluated with your other decisions when the complete round is submitted.</p></CardContent></Card>
          <Card><CardHeader><h2 className="font-bold">Current company position</h2></CardHeader><CardContent className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1"><MetricCard label="Cash available" value={`₦${companyState.cash_open.toLocaleString()}`} icon={CircleDollarSign} tone="green" /><MetricCard label="Inventory" value={`${companyState.inv_open.toLocaleString()} units`} icon={Package} tone="amber" /><MetricCard label="Employees" value={companyState.employees_open.toLocaleString()} icon={Users} tone="blue" /></CardContent></Card>
        </aside>
      </div>
    </StudentPage>
  );
}
