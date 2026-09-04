import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Package,
  PieChart,
  Smile,
  Store,
  Target,
  TrendingUp,
  Trophy,
  Users,
  WalletCards,
} from "lucide-react";
import type { DataPoint, StudentBusinessState } from "@/domain/business-state";
import { Card, CardContent, CardHeader, StatusIndicator } from "@/components/ui";
import { StudentPage } from "@/features/student/shell";
import { BusinessMetricCard, EmptyVisualization } from "./components";

function valueOrUnavailable<T>(data: DataPoint<T>, format: (value: T) => string = String) {
  return data.availability === "available" ? format(data.value) : "Unavailable";
}

const healthIcons = [CircleDollarSign, BarChart3, TrendingUp, Users, PieChart, Package, Smile, Users];

export function CompanyOverviewScreen({ state }: { state: StudentBusinessState }) {
  const { company, financials } = state;
  const companyName = valueOrUnavailable(company.name);

  const companyDetails = [
    [Store, "Industry", company.industry],
    [TrendingUp, "Business Model", company.businessModel],
    [MapPin, "Headquarters", company.headquarters],
    [Building2, "Company Size", company.companySize],
    [Users, "Employees", company.employees],
    [CalendarDays, "Established", company.establishedAt],
  ] as const;

  const snapshot = [
    ["Company Value (Est.)", financials.metrics.find((metric) => metric.id === "company-value")?.value],
    ["Current Cash", financials.metrics.find((metric) => metric.id === "cash")?.value],
    ["Total Assets", undefined],
    ["Total Liabilities", undefined],
    ["Net Worth", undefined],
  ] as const;

  return (
    <StudentPage title="Company Overview" description="Get to know your company before making this round’s decisions.">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,0.95fr)]">
        <div className="space-y-5">
          <Card className="relative min-h-64 overflow-hidden border-slate-800 bg-navy-900 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgb(0_185_87/0.16),transparent_36%),linear-gradient(110deg,rgb(3_21_35/0.98)_35%,rgb(6_39_52/0.82))]" />
            <CardContent className="relative flex min-h-64 flex-col justify-between p-6 sm:p-8">
              <div><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">{companyName}</h2><StatusIndicator tone="warning">Awaiting assignment</StatusIndicator></div><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300"><span className="flex items-center gap-2"><Store size={16} />{valueOrUnavailable(company.industry)}</span><span className="flex items-center gap-2"><CalendarDays size={16} />Established: {valueOrUnavailable(company.establishedAt)}</span></div><p className="mt-5 max-w-lg text-sm leading-6 text-slate-300">{company.description.availability === "available" ? company.description.value : company.description.reason}</p></div>
              <p className="mt-6 w-fit rounded-lg border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300">Company identity unavailable</p>
            </CardContent>
          </Card>

          <Card><CardHeader><h2 className="font-bold">Key Company Information</h2></CardHeader><CardContent><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{companyDetails.map(([Icon,label,data]) => <div className="flex min-w-0 gap-3" key={label}><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Icon size={19} /></span><div className="min-w-0"><p className="text-xs text-muted">{label}</p><p className="mt-1 truncate text-sm font-semibold">{valueOrUnavailable(data as DataPoint<string | number>)}</p></div></div>)}</div></CardContent></Card>

          <Card><CardHeader><div><h2 className="font-bold">Business Health</h2><p className="mt-1 text-sm text-muted">Current company metrics</p></div></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{financials.metrics.map((metric,index) => <BusinessMetricCard key={metric.id} metric={metric} icon={healthIcons[index] ?? BarChart3} />)}</div></CardContent></Card>

          <Card><CardHeader><h2 className="font-bold">Company Performance Summary</h2></CardHeader><CardContent><div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]"><EmptyVisualization icon={BarChart3} title="No performance summary" description={financials.summary.availability === "unavailable" ? financials.summary.reason : financials.summary.value} minHeight="min-h-40" /><div className="flex min-h-40 flex-col items-center justify-center rounded-lg bg-slate-50 text-center"><span className="flex size-20 items-center justify-center rounded-full border-8 border-slate-200 text-2xl font-extrabold text-slate-400">—</span><p className="mt-3 text-sm font-semibold">Overall rating unavailable</p></div></div></CardContent></Card>

          <div className="flex flex-col items-start justify-between gap-4 rounded-card border border-brand-100 bg-brand-50 p-5 sm:flex-row sm:items-center"><div><p className="font-bold text-brand-700">Continue your business orientation</p><p className="mt-1 text-sm text-muted">Review the dashboard structure and the current market environment.</p></div><Link href="/student/dashboard" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700">View Dashboard <ArrowRight size={17} /></Link></div>
        </div>

        <aside className="space-y-5">
          <Card><CardHeader><h2 className="font-bold">Company Snapshot</h2></CardHeader><CardContent className="divide-y divide-border">{snapshot.map(([label,data]) => <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"><span className="flex items-center gap-2 text-muted"><WalletCards size={16} />{label}</span><span className="font-semibold text-slate-400">{data?.availability === "available" ? data.value : "—"}</span></div>)}</CardContent></Card>
          <Card><CardHeader><h2 className="font-bold">Competitive Position</h2></CardHeader><CardContent><EmptyVisualization icon={Target} title="Position unavailable" description="Competitor data will appear when market state is available." minHeight="min-h-64" /></CardContent></Card>
          <Card><CardHeader><h2 className="font-bold">Recent Achievements</h2></CardHeader><CardContent><EmptyVisualization icon={Trophy} title="No achievements yet" description="Achievements will appear after completed simulation rounds." minHeight="min-h-36" /></CardContent></Card>
        </aside>
      </div>
    </StudentPage>
  );
}
