import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  CircleDollarSign,
  Lightbulb,
  Newspaper,
  Package,
  PieChart,
  Store,
  Trophy,
  Users,
} from "lucide-react";
import type { StudentBusinessState } from "@/domain/business-state";
import { Card, CardContent, CardHeader, StatusIndicator } from "@/components/ui";
import { StudentPage } from "@/features/student/shell";
import { BusinessMetricCard, EmptyVisualization } from "./components";

const dashboardMetricIcons = [CircleDollarSign, BarChart3, Package, PieChart, Users];

export function BusinessDashboardScreen({ state }: { state: StudentBusinessState }) {
  const primaryMetrics = state.financials.metrics.slice(0, 5);

  return (
    <StudentPage title="Business Dashboard" description="Your central view of company performance, activity, and the current round.">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,0.82fr)]">
        <div className="space-y-5">
          <Card className="overflow-hidden border-slate-800 bg-navy-900 text-white"><CardContent className="relative flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center"><div className="absolute -right-16 -top-24 size-64 rounded-full bg-brand-500/10 blur-3xl" /><div className="relative flex items-center gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-500"><Store size={27} /></span><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold">Company not assigned</h2><StatusIndicator tone="warning">Unavailable</StatusIndicator></div><p className="mt-2 text-sm text-slate-300">Join an active simulation to receive your company.</p></div></div><div className="relative grid grid-cols-2 gap-5 border-white/10 text-sm sm:border-l sm:pl-6"><div><p className="text-xs text-slate-400">Current cash</p><p className="mt-1 text-lg font-bold text-slate-400">—</p></div><div><p className="text-xs text-slate-400">Round progress</p><p className="mt-1 text-lg font-bold text-slate-400">—</p></div></div></CardContent></Card>

          <Card><CardHeader><div><h2 className="font-bold">Company Overview</h2><p className="mt-1 text-sm text-muted">Key operating metrics</p></div><Link href="/student/company" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline">View Company <ArrowRight size={15} /></Link></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{primaryMetrics.map((metric,index) => <BusinessMetricCard key={metric.id} metric={metric} icon={dashboardMetricIcons[index] ?? BarChart3} />)}</div></CardContent></Card>

          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <Card><CardHeader><h2 className="font-bold">Performance Trend</h2></CardHeader><CardContent><EmptyVisualization icon={BarChart3} title="No performance trend" description="Complete a simulation round to populate this chart." minHeight="min-h-64" /></CardContent></Card>
            <Card><CardHeader><h2 className="font-bold">Key Highlights</h2></CardHeader><CardContent><EmptyVisualization icon={Lightbulb} title="No highlights available" description="Highlights are derived from completed simulation results." minHeight="min-h-64" /></CardContent></Card>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <Card><CardHeader><div><h2 className="font-bold">Your Recent Results</h2><p className="mt-1 text-sm text-muted">Latest completed round</p></div></CardHeader><CardContent><EmptyVisualization icon={BarChart3} title="No completed rounds" description="Recent results will appear after your first round is processed." minHeight="min-h-44" /></CardContent></Card>
            <Card><CardHeader><h2 className="font-bold">Upcoming Decisions</h2></CardHeader><CardContent><div className="flex min-h-44 flex-col items-center justify-center text-center"><CalendarClock className="text-slate-300" size={28} /><p className="mt-3 text-sm font-semibold">No active round</p><p className="mt-1 text-xs leading-5 text-muted">Decision areas and deadlines are unavailable.</p><button type="button" disabled className="mt-5 h-9 w-full rounded-lg border border-border bg-slate-50 text-sm font-semibold text-slate-400">Decisions unavailable</button></div></CardContent></Card>
          </div>
        </div>

        <aside className="space-y-5">
          <Card><CardHeader><h2 className="font-bold">Next Step</h2></CardHeader><CardContent><div className="rounded-lg bg-brand-50 p-4"><div className="flex gap-3"><CalendarClock className="shrink-0 text-brand-600" size={21} /><div><p className="font-semibold">No decision deadline</p><p className="mt-1 text-sm leading-6 text-muted">Round scheduling is unavailable.</p></div></div></div><Link href="/student/market" className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold hover:bg-slate-50">Review Market <ArrowRight size={16} /></Link></CardContent></Card>
          <Card><CardHeader><div className="flex items-center gap-2"><Newspaper className="text-blue-600" size={18} /><h2 className="font-bold">Market & News</h2></div><Link href="/student/market" className="text-xs font-semibold text-blue-700">View all</Link></CardHeader><CardContent><p className="text-sm leading-6 text-muted">No market updates are available for an active round.</p></CardContent></Card>
          <Card><CardHeader><div className="flex items-center gap-2"><Trophy className="text-amber-500" size={18} /><h2 className="font-bold">Class Leaderboard</h2></div></CardHeader><CardContent><EmptyVisualization icon={Trophy} title="Rankings unavailable" description="Join a simulation to see class standings." minHeight="min-h-36" /></CardContent></Card>
          <Card><CardHeader><div className="flex items-center gap-2"><Building2 className="text-violet-600" size={18} /><h2 className="font-bold">Activity</h2></div></CardHeader><CardContent><p className="text-sm leading-6 text-muted">There is no company activity to display.</p></CardContent></Card>
        </aside>
      </div>
    </StudentPage>
  );
}
