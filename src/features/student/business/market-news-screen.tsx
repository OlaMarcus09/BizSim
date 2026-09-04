"use client";

import { useState } from "react";
import {
  AlertCircle,
  BarChart3,
  Building2,
  Filter,
  Landmark,
  Lightbulb,
  Newspaper,
  PackageSearch,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import type { DataPoint, MarketState } from "@/domain/business-state";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { StudentPage } from "@/features/student/shell";
import { EmptyVisualization } from "./components";

const tabs = ["All Updates", "Industry News", "Market Events", "Economic Indicators", "Competitor Moves"] as const;
type MarketTab = (typeof tabs)[number];

function shownValue(data: DataPoint<string>) {
  return data.availability === "available" ? data.value : "—";
}

export function MarketNewsScreen({ state }: { state: MarketState }) {
  const [activeTab, setActiveTab] = useState<MarketTab>("All Updates");
  const statusCards = [
    [Users, "Price Competition", state.priceCompetition, "text-blue-600", "bg-blue-50"],
    [ShoppingBag, "Demand Level", state.demandLevel, "text-emerald-600", "bg-emerald-50"],
    [ShieldCheck, "Market Stability", state.marketStability, "text-amber-600", "bg-amber-50"],
  ] as const;

  return (
    <StudentPage title="Market & News" description="Understand the current external environment before making business decisions.">
      <div className="mb-5 flex flex-col gap-4 rounded-card border border-border bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-slate-400 ring-1 ring-border"><AlertCircle size={24} /></span><div><p className="text-xs font-bold uppercase tracking-wider text-muted">Market alert</p><h2 className="mt-1 text-lg font-bold">No current market alert</h2><p className="mt-1 text-sm text-muted">Alerts will appear when an active simulation round provides market events.</p></div></div>
        <span className="shrink-0 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-400">Details unavailable</span>
      </div>

      <div className="mb-5 flex flex-col justify-between gap-3 rounded-card border border-border bg-white px-3 shadow-card lg:flex-row lg:items-center">
        <div role="tablist" aria-label="Market update categories" className="flex overflow-x-auto">{tabs.map((tab) => <button type="button" role="tab" aria-selected={activeTab === tab} key={tab} onClick={() => setActiveTab(tab)} className={`shrink-0 border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${activeTab === tab ? "border-brand-500 text-ink" : "border-transparent text-muted hover:text-ink"}`}>{tab}</button>)}</div>
        <div className="flex gap-2 pb-3 lg:pb-0 lg:pr-2"><button type="button" disabled className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold text-slate-400"><Filter size={15} />Filter</button><select aria-label="Market round" disabled className="h-9 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-slate-400"><option>No active round</option></select></div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.85fr)]">
        <div className="space-y-5">
          <Card><CardHeader><div><h2 className="font-bold">Latest Updates</h2><p className="mt-1 text-sm text-muted">{activeTab}</p></div></CardHeader><CardContent><EmptyVisualization icon={Newspaper} title="No market updates available" description="News and events are supplied by an active simulation round." minHeight="min-h-80" /></CardContent></Card>

          <Card><CardHeader><div><h2 className="font-bold">Competitor Information</h2><p className="mt-1 text-sm text-muted">External companies and market positioning</p></div></CardHeader><CardContent><EmptyVisualization icon={Building2} title="Competitor data unavailable" description={state.competitorSummary.availability === "unavailable" ? state.competitorSummary.reason : state.competitorSummary.value} minHeight="min-h-44" /></CardContent></Card>
        </div>

        <aside className="space-y-5">
          <Card><CardHeader><div><h2 className="font-bold">Market Snapshot</h2><p className="mt-1 text-sm text-muted">Current market conditions</p></div></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-3">{state.snapshot.map((indicator) => <div key={indicator.id} className="rounded-lg border border-border bg-slate-50/60 p-3"><p className="text-xs text-muted">{indicator.label}</p><p className="mt-2 text-lg font-bold text-slate-400">{shownValue(indicator.value)}</p><div className="mt-4 h-8 overflow-hidden"><svg aria-hidden="true" className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M0 24 L16 21 L32 23 L48 17 L64 20 L80 14 L100 18" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" /></svg></div></div>)}</div><div className="mt-3 grid gap-3 sm:grid-cols-3 xl:grid-cols-3">{statusCards.map(([Icon,label,data,color,bg]) => <div key={label} className="rounded-lg border border-border p-3 text-center"><span className={`mx-auto flex size-9 items-center justify-center rounded-full ${bg} ${color}`}><Icon size={18} /></span><p className="mt-2 text-xs text-muted">{label}</p><p className="mt-1 text-sm font-bold text-slate-400">{shownValue(data)}</p></div>)}</div></CardContent></Card>

          <Card><CardHeader><h2 className="font-bold">Key Economic Indicators</h2></CardHeader><CardContent className="divide-y divide-border">{state.economicIndicators.map((indicator,index) => {const icons=[Landmark,BarChart3,TrendingUp,PackageSearch]; const Icon=icons[index] ?? Landmark; return <div key={indicator.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"><Icon size={15} /></span><span className="min-w-0 flex-1 truncate text-sm text-muted">{indicator.label}</span><span className="text-sm font-semibold text-slate-400">{shownValue(indicator.value)}</span></div>;})}</CardContent></Card>
        </aside>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-4 rounded-card border border-violet-200 bg-violet-50/60 p-5 sm:flex-row sm:items-center"><div className="flex gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-violet-600"><Lightbulb size={20} /></span><div><p className="font-bold">How this affects your decisions</p><p className="mt-1 text-sm leading-6 text-muted">{state.decisionContext.availability === "unavailable" ? state.decisionContext.reason : state.decisionContext.value}</p></div></div><button type="button" disabled className="h-10 shrink-0 rounded-lg bg-violet-200 px-5 text-sm font-semibold text-violet-500">Decisions unavailable</button></div>
    </StudentPage>
  );
}
