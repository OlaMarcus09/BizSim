"use client";

import Link from "next/link";
import { useMemo, type ComponentType } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Landmark,
  Megaphone,
  PackageOpen,
  Pencil,
  Tags,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { Card, CardContent, CardHeader, MetricCard, StatusIndicator } from "@/components/ui";
import { marketForRound, type ValidationError } from "@/domain/simulation";
import { StudentPage } from "@/features/student/shell";
import { inventoryPurchaseLimit, reviewDecisions, type DecisionField } from "./decision-session";
import { useDecisionSession } from "./decision-session-context";

type ReviewItem = {
  field: DecisionField;
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  tone: string;
  value: string;
};

const fieldLabels: Record<DecisionField, string> = {
  price: "Pricing",
  marketing: "Marketing",
  purchase_qty: "Inventory",
  employees_target: "Workforce",
  investment: "Investment",
};

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function friendlyValidationMessage(error: ValidationError, supplyCap: number) {
  switch (error.field) {
    case "price": return "Selling price must be ₦3,500–₦7,500 in ₦100 increments.";
    case "marketing": return "Marketing must be ₦0–₦2,000,000 in ₦100,000 increments.";
    case "purchase_qty": return `Inventory purchases must be 0–${supplyCap.toLocaleString()} units in 50-unit increments for this round.`;
    case "employees_target": return "Target workforce must be 10–40 whole employees.";
    case "investment": return "Investment must be ₦0–₦2,000,000 in ₦100,000 increments.";
    default: return error.message;
  }
}

export function DecisionReviewScreen() {
  const { companyState, decisions } = useDecisionSession();
  const market = useMemo(() => marketForRound(companyState.r), [companyState.r]);
  const supplyCap = inventoryPurchaseLimit(market.supply_cap);
  const review = reviewDecisions(decisions, supplyCap);
  const errorsByField = new Map(review.validationErrors.map((error) => [error.field, error]));

  const items: ReviewItem[] = [
    { field: "price", label: "Pricing", description: "Selling price per unit", href: "/student/pricing", icon: Tags, tone: "bg-red-50 text-red-600", value: decisions.price === undefined ? "Not set" : `${formatNaira(decisions.price)} / unit` },
    { field: "marketing", label: "Marketing", description: "Budget committed to demand attraction", href: "/student/marketing", icon: Megaphone, tone: "bg-blue-50 text-blue-600", value: decisions.marketing === undefined ? "Not set" : formatNaira(decisions.marketing) },
    { field: "purchase_qty", label: "Inventory", description: "Additional units purchased this round", href: "/student/inventory", icon: PackageOpen, tone: "bg-emerald-50 text-emerald-700", value: decisions.purchase_qty === undefined ? "Not set" : `${decisions.purchase_qty.toLocaleString()} units` },
    { field: "employees_target", label: "Workforce", description: "Target team size after adjustment", href: "/student/workforce", icon: UsersRound, tone: "bg-violet-50 text-violet-700", value: decisions.employees_target === undefined ? "Not set" : `${decisions.employees_target.toLocaleString()} employees` },
    { field: "investment", label: "Investment", description: "Company-wide capability investment", href: "/student/investment", icon: Landmark, tone: "bg-amber-50 text-amber-700", value: decisions.investment === undefined ? "Not set" : formatNaira(decisions.investment) },
  ];

  return (
    <StudentPage
      eyebrow={`Round ${companyState.r} · Pre-submission checkpoint`}
      title="Decision Review"
      description="Check the five choices that make up your round strategy. Nothing on this page submits or resolves the round."
      actions={<StatusIndicator tone={review.valid ? "success" : "warning"}>{review.valid ? "Complete" : "Needs attention"}</StatusIndicator>}
    >
      <section className="mb-5 overflow-hidden rounded-card border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-brand-50 shadow-card">
        <div className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <span className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm"><ClipboardCheck size={25} aria-hidden="true" /></span>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Review the plan before you commit</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">Pricing, Marketing, Inventory, Workforce, and Investment work together as one strategy. Use the Edit actions to correct or reconsider any choice.</p>
          </div>
          <div className="rounded-xl border border-emerald-200/80 bg-white/80 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">Round {companyState.r} situation</p>
            <p className="mt-2 font-bold text-ink">{market.event_title}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{market.event_explanation}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(19rem,0.5fr)]">
        <Card>
          <CardHeader className="flex-col sm:flex-row sm:items-center">
            <div><h2 className="text-lg font-bold">Your decisions for Round {companyState.r}</h2><p className="mt-1 text-sm text-muted">Review each staged choice or return to its decision screen.</p></div>
            <StatusIndicator tone={review.valid ? "success" : "warning"}>{review.valid ? "5 of 5 valid" : `${review.missingFields.length} missing · ${review.validationErrors.length} invalid`}</StatusIndicator>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {items.map((item) => {
                const missing = decisions[item.field] === undefined;
                const error = errorsByField.get(item.field);
                const Icon = item.icon;
                return (
                  <article key={item.field} className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(10rem,0.65fr)_auto] sm:items-center sm:p-5">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.tone}`}><Icon size={22} aria-hidden /></span>
                      <div className="min-w-0"><h3 className="font-bold text-ink">{item.label}</h3><p className="mt-0.5 text-sm leading-5 text-muted">{item.description}</p></div>
                    </div>
                    <div>
                      <p className={`text-base font-extrabold sm:text-lg ${missing || error ? "text-amber-700" : "text-ink"}`}>{item.value}</p>
                      {missing && <p className="mt-1 text-xs font-semibold text-amber-700">This decision is required.</p>}
                      {error && <p className="mt-1 text-xs leading-5 text-red-700">{friendlyValidationMessage(error, supplyCap)}</p>}
                    </div>
                    <Link href={item.href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 sm:min-w-24" aria-label={`Edit ${item.label} decision`}><Pencil size={16} />Edit</Link>
                  </article>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-5">
          <Card className={review.valid ? "border-emerald-200" : "border-amber-200"}>
            <CardHeader><div><h2 className="font-bold">Pre-submission check</h2><p className="mt-1 text-sm text-muted">Completeness and engine validation</p></div>{review.valid ? <CheckCircle2 className="text-brand-600" size={23} /> : <AlertTriangle className="text-amber-600" size={23} />}</CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => {
                const ready = decisions[item.field] !== undefined && !errorsByField.has(item.field);
                return <div key={item.field} className="flex items-center gap-2 text-sm"><span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${ready ? "bg-brand-600 text-white" : "bg-amber-100 text-amber-700"}`}>{ready ? <Check size={13} /> : <AlertTriangle size={12} />}</span><span className={ready ? "text-ink" : "font-semibold text-amber-800"}>{fieldLabels[item.field]} {ready ? "is valid" : decisions[item.field] === undefined ? "is missing" : "needs correction"}</span></div>;
              })}
              <p className="border-t border-border pt-3 text-xs leading-5 text-muted">The real decision rules are checked here. Affordability is checked only when the round is submitted, so no cash-after-strategy forecast is shown.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-bold">Current company context</h2></CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <MetricCard label="Cash available" value={formatNaira(companyState.cash_open)} icon={WalletCards} tone="green" />
              <MetricCard label="Current inventory" value={`${companyState.inv_open.toLocaleString()} units`} icon={PackageOpen} tone="blue" />
              <MetricCard label="Current workforce" value={`${companyState.employees_open.toLocaleString()} employees`} icon={UsersRound} tone="violet" />
              <div className="rounded-xl border border-border bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Supplier limit</p><p className="mt-1 text-lg font-extrabold text-ink">{supplyCap.toLocaleString()} units</p><p className="mt-1 text-xs leading-5 text-muted">Maximum additional inventory purchase this round.</p></div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Card className="mt-5 border-blue-200 bg-blue-50/40">
        <CardContent className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div><h2 className="font-bold text-ink">One connected company plan</h2><p className="mt-1 max-w-4xl text-sm leading-6 text-muted">Price sets what customers pay; Marketing supports demand attraction; Inventory adds stock; Workforce sets operating team size; and Investment commits resources toward future capability. Review the commitments together without treating any one choice as an isolated answer.</p></div>
          <div className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-800">Review complete does not mean submitted</div>
        </CardContent>
      </Card>

      <nav aria-label="Decision review navigation" className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/student/investment" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 font-semibold text-ink transition-colors hover:bg-slate-50"><ArrowLeft size={18} />Back to Investment</Link>
        <button type="button" disabled className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-border bg-slate-100 px-5 font-semibold text-muted" title={review.valid ? "Round submission is introduced in the next pass" : "Complete and correct all five decisions first"}>{review.valid ? "Continue to Submit — next step" : "Resolve issues to continue"}<ArrowRight size={18} /></button>
      </nav>
    </StudentPage>
  );
}
