"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Boxes,
  CheckCircle2,
  Info,
  Megaphone,
  Minus,
  PackageOpen,
  PackagePlus,
  Plus,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Tags,
  TrendingUp,
} from "lucide-react";
import { Button, Card, CardContent, CardHeader, Input, MetricCard, StatusIndicator } from "@/components/ui";
import { marketForRound } from "@/domain/simulation";
import { StudentPage } from "@/features/student/shell";
import {
  PURCHASE_QUANTITY_MIN,
  PURCHASE_QUANTITY_STEP,
  inventoryPurchaseLimit,
  purchaseQuantityError,
} from "./decision-session";
import { useDecisionSession } from "./decision-session-context";

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function supplierSituation(multiplier = 1) {
  if (multiplier > 1) return "Supplier acquisition costs are above baseline this round.";
  if (multiplier < 1) return "Supplier acquisition costs are below baseline this round.";
  return "Standard supplier acquisition conditions apply this round.";
}

export function InventoryDecisionScreen() {
  const { companyState, decisions, setPurchaseQuantity } = useDecisionSession();
  const market = useMemo(() => marketForRound(companyState.r), [companyState.r]);
  const supplyCap = inventoryPurchaseLimit(market.supply_cap);
  const [draft, setDraft] = useState(decisions.purchase_qty ?? PURCHASE_QUANTITY_MIN);
  const [saved, setSaved] = useState(decisions.purchase_qty !== undefined);
  const error = purchaseQuantityError(draft, market.supply_cap);
  const stockBeforeSales = companyState.inv_open + draft;

  function updatePurchaseQuantity(quantity: number) {
    setDraft(quantity);
    const nextError = purchaseQuantityError(quantity, market.supply_cap);
    if (nextError) {
      setSaved(false);
      return;
    }
    setPurchaseQuantity(quantity, market.supply_cap);
    setSaved(true);
  }

  function adjustPurchaseQuantity(change: number) {
    updatePurchaseQuantity(Math.min(supplyCap, Math.max(PURCHASE_QUANTITY_MIN, draft + change)));
  }

  return (
    <StudentPage
      eyebrow={`Round ${companyState.r} decision`}
      title="Inventory Decision"
      description="Choose how many new units to purchase for the current round."
    >
      <section className="mb-5 overflow-hidden rounded-card border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-brand-50 shadow-card">
        <div className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm"><PackageOpen size={25} aria-hidden="true" /></div>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Plan enough stock while protecting your cash</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">New purchases join your existing inventory before sales. More stock can support fulfilment, while excess stock keeps cash tied up in inventory.</p>
          </div>
          <div className="rounded-xl border border-emerald-200/80 bg-white/75 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">The decision</p>
            <p className="mt-2 text-sm leading-6 text-muted"><strong className="text-ink">Purchase quantity</strong> means units bought this round—not your total inventory or guaranteed ending stock.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="inventory-context-title" className="mb-5">
        <div className="mb-3 flex items-center gap-2"><Info size={19} className="text-blue-600" aria-hidden="true" /><h2 id="inventory-context-title" className="font-bold text-ink">Current stock and supplier situation</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Current inventory" value={`${companyState.inv_open.toLocaleString()} units`} icon={Boxes} tone="violet" />
          <MetricCard label="Inventory book value" value={formatNaira(companyState.inv_value_open)} icon={Banknote} tone="blue" />
          <MetricCard label="Supplier purchase limit" value={`${supplyCap.toLocaleString()} units`} icon={PackagePlus} tone="amber" />
          <MetricCard label="Cash available" value={formatNaira(companyState.cash_open)} icon={Banknote} tone="green" />
        </div>
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-amber-800">Round {companyState.r} market context</p>
          <p className="mt-1 font-bold text-ink">{market.event_title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{market.event_explanation} {supplierSituation(market.supplier_mult)}</p>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.55fr)]">
        <div className="space-y-5">
          <Card>
            <CardHeader className="flex-col sm:flex-row sm:items-center">
              <div><h2 className="text-lg font-bold">Set your purchase quantity</h2><p className="mt-1 text-sm text-muted">Select only the new units to buy this round.</p></div>
              <StatusIndicator tone={saved ? "success" : "warning"}>{saved ? "Decision staged" : "Choose a quantity"}</StatusIndicator>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-center sm:p-7">
                <p className="text-sm font-semibold text-brand-700">Units being purchased</p>
                <output htmlFor="inventory-purchase inventory-purchase-input" className="mt-2 block text-3xl font-extrabold tracking-tight text-ink sm:text-4xl" aria-live="polite">{draft.toLocaleString()} units</output>
                <p className="mt-2 text-sm text-muted">Maximum available from supplier: {supplyCap.toLocaleString()} units</p>
              </div>

              <div className="mt-7">
                <label htmlFor="inventory-purchase" className="text-sm font-bold text-ink">Adjust purchase quantity</label>
                <input id="inventory-purchase" type="range" min={PURCHASE_QUANTITY_MIN} max={supplyCap} step={PURCHASE_QUANTITY_STEP} value={draft} onChange={(event) => updatePurchaseQuantity(Number(event.target.value))} className="mt-4 h-3 w-full cursor-pointer accent-brand-600" />
                <div className="mt-2 flex justify-between text-xs font-medium text-muted"><span>0 units</span><span>{Math.floor(supplyCap / 2).toLocaleString()} units</span><span>{supplyCap.toLocaleString()} units</span></div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] sm:items-end">
                <div>
                  <label htmlFor="inventory-purchase-input" className="mb-2 block text-sm font-semibold">Exact quantity</label>
                  <div className="grid grid-cols-[3rem_minmax(0,1fr)_3rem] gap-2">
                    <Button variant="secondary" size="lg" aria-label="Decrease purchase quantity by 50 units" onClick={() => adjustPurchaseQuantity(-PURCHASE_QUANTITY_STEP)} disabled={draft <= PURCHASE_QUANTITY_MIN}><Minus size={19} /></Button>
                    <Input id="inventory-purchase-input" type="number" inputMode="numeric" min={PURCHASE_QUANTITY_MIN} max={supplyCap} step={PURCHASE_QUANTITY_STEP} value={draft} onChange={(event) => updatePurchaseQuantity(Number(event.target.value))} aria-invalid={Boolean(error)} aria-describedby="inventory-purchase-help" className="h-12 text-center text-base font-bold" />
                    <Button variant="secondary" size="lg" aria-label="Increase purchase quantity by 50 units" onClick={() => adjustPurchaseQuantity(PURCHASE_QUANTITY_STEP)} disabled={draft >= supplyCap}><Plus size={19} /></Button>
                  </div>
                </div>
                <p id="inventory-purchase-help" className={`text-sm leading-6 ${error ? "text-red-600" : "text-muted"}`}>{error ?? `Allowed range: 0–${supplyCap.toLocaleString()} units in 50-unit increments.`}</p>
              </div>

              <div className="mt-5 grid gap-3 rounded-xl border border-border bg-slate-50 p-4 sm:grid-cols-2 sm:items-center">
                <div><p className="text-xs font-semibold uppercase tracking-wide text-muted">Current inventory</p><p className="mt-1 text-lg font-bold">{companyState.inv_open.toLocaleString()} units</p></div>
                <div className="sm:border-l sm:border-border sm:pl-5"><p className="text-xs font-semibold uppercase tracking-wide text-muted">Stock before sales</p><p className="mt-1 text-lg font-bold">{stockBeforeSales.toLocaleString()} units</p><p className="mt-1 text-xs text-muted">Current inventory + this purchase</p></div>
              </div>

              {saved && !error && <div role="status" className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><CheckCircle2 className="mt-0.5 shrink-0" size={18} /><span>Inventory purchase is staged. Pricing and Marketing remain unchanged.</span></div>}
              <Button type="button" size="lg" className="mt-5 w-full sm:w-auto" onClick={() => updatePurchaseQuantity(draft)} disabled={Boolean(error)}>Save inventory decision</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><div><h2 className="text-lg font-bold">Understand the trade-off</h2><p className="mt-1 text-sm text-muted">Balance availability, cash, and inventory exposure.</p></div><Scale className="shrink-0 text-violet-600" size={22} aria-hidden="true" /></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><TrendingUp size={19} className="text-blue-600" />Higher purchasing</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Provides more stock that may be available to meet demand.</li><li>Requires greater upfront cash.</li><li>Increases exposure to unsold inventory.</li></ul></div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4"><div className="flex items-center gap-2 font-bold text-ink"><ShieldCheck size={19} className="text-brand-600" />Lower purchasing</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted"><li>Preserves more cash for other commitments.</li><li>Reduces exposure to unsold inventory.</li><li>Increases stockout and lost-sales risk.</li></ul></div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card>
            <CardHeader><h2 className="font-bold">Current round strategy</h2></CardHeader>
            <CardContent className="space-y-3">
              <StrategyRow label="Pricing" value={decisions.price === undefined ? "Not set" : `${formatNaira(decisions.price)} / unit`} icon={Tags} tone="text-blue-600" />
              <StrategyRow label="Marketing" value={decisions.marketing === undefined ? "Not set" : formatNaira(decisions.marketing)} icon={Megaphone} tone="text-violet-600" />
              <StrategyRow label="Inventory purchase" value={`${draft.toLocaleString()} units`} icon={ShoppingCart} tone="text-brand-600" />
              {(decisions.price === undefined || decisions.marketing === undefined) && <p className="text-sm leading-6 text-amber-700">Complete Pricing and Marketing before the round is submitted.</p>}
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-navy-900 text-white">
            <CardContent>
              <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500"><Banknote size={22} /></span><div><p className="text-xs uppercase tracking-wider text-slate-400">Affordability</p><h2 className="mt-1 text-lg font-bold">Purchases are paid upfront</h2></div></div>
              <p className="mt-5 text-sm leading-6 text-slate-300">Inventory purchasing shares available cash with Marketing, workforce costs, operating costs, and Investment. The complete affordability check happens when all round decisions are submitted.</p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <nav aria-label="Decision navigation" className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/student/marketing" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 font-semibold text-ink transition-colors hover:bg-slate-50"><ArrowLeft size={18} />Back to Marketing</Link>
        <Link href="/student/workforce" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-brand-600 bg-brand-600 px-5 font-semibold text-white transition-colors hover:bg-brand-700">Continue to Workforce<ArrowRight size={18} /></Link>
      </nav>
    </StudentPage>
  );
}

function StrategyRow({ label, value, icon: Icon, tone }: { label: string; value: string; icon: typeof Tags; tone: string }) {
  return <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2 text-sm font-semibold text-muted"><Icon size={18} className={tone} />{label}</span><strong>{value}</strong></div>;
}
