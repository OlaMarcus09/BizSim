import Link from "next/link";
import { ArrowRight, BarChart3, Building2, CalendarClock, CircleDollarSign, Newspaper, Package, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, StatusIndicator } from "@/components/ui";
import { StudentPage } from "@/features/student/shell";

export const metadata = { title: "Student Home" };

const unavailableMetrics = [
  [CircleDollarSign, "Cash"],
  [BarChart3, "Revenue"],
  [Package, "Profit"],
  [Users, "Market Share"],
] as const;

export default function StudentHomePage() {
  return (
    <StudentPage title="Good morning!" description="Welcome to BizSim. Join your class simulation to begin managing a company.">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,0.8fr)]">
        <div className="space-y-5">
          <Card className="overflow-hidden border-slate-800 bg-navy-900 text-white">
            <CardContent className="relative flex min-h-48 flex-col justify-between gap-7 overflow-hidden p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="absolute -right-16 -top-24 size-72 rounded-full bg-brand-500/10 blur-3xl" />
              <div className="relative max-w-xl"><StatusIndicator tone="neutral" className="bg-white/10 text-slate-200 ring-white/15">No active simulation</StatusIndicator><h2 className="mt-4 text-2xl font-bold">Join your class to get started</h2><p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">Use the simulation code provided by your lecturer. Your company and round information will appear after joining.</p></div>
              <Link href="/student/join" className="relative inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 font-semibold text-white hover:bg-brand-600">Join Simulation <ArrowRight size={18} /></Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><div><h2 className="font-bold">Company Overview</h2><p className="mt-1 text-sm text-muted">Business metrics become available after you join a simulation.</p></div></CardHeader>
            <CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{unavailableMetrics.map(([Icon,label]) => <div key={label} className="rounded-lg border border-border bg-slate-50/70 p-4"><span className="flex size-9 items-center justify-center rounded-lg bg-white text-slate-400 ring-1 ring-border"><Icon size={18} /></span><p className="mt-4 text-xs font-medium text-muted">{label}</p><p className="mt-1 text-xl font-bold text-slate-400">—</p><p className="mt-1 text-xs text-muted">Unavailable</p></div>)}</div></CardContent>
          </Card>

          <Card>
            <CardHeader><div><h2 className="font-bold">Performance Trend</h2><p className="mt-1 text-sm text-muted">Round results will appear here.</p></div></CardHeader>
            <CardContent><div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-slate-50/70 px-6 text-center"><BarChart3 className="text-slate-300" size={34} /><p className="mt-3 font-semibold text-slate-600">No performance data</p><p className="mt-1 text-sm text-muted">Complete a simulation round to see your trend.</p></div></CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card><CardHeader><h2 className="font-bold">Next Step</h2></CardHeader><CardContent><div className="flex gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><CalendarClock size={20} /></span><div><p className="font-semibold">Join a simulation</p><p className="mt-1 text-sm leading-6 text-muted">You need a lecturer-provided code to continue.</p></div></div><Link href="/student/join" className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">Enter a Code</Link></CardContent></Card>
          <Card><CardHeader><div className="flex items-center gap-2"><Newspaper size={18} className="text-blue-600" /><h2 className="font-bold">Market & News</h2></div></CardHeader><CardContent className="text-center"><p className="text-sm text-muted">Market updates are unavailable until you join a simulation.</p></CardContent></Card>
          <Card><CardHeader><div className="flex items-center gap-2"><Trophy size={18} className="text-amber-500" /><h2 className="font-bold">Class Leaderboard</h2></div></CardHeader><CardContent className="text-center"><p className="text-sm text-muted">Class rankings are not available yet.</p></CardContent></Card>
          <Card><CardHeader><div className="flex items-center gap-2"><Building2 size={18} className="text-violet-600" /><h2 className="font-bold">Recent Activity</h2></div></CardHeader><CardContent className="text-center"><p className="text-sm text-muted">There is no recent simulation activity.</p></CardContent></Card>
        </aside>
      </div>
    </StudentPage>
  );
}
