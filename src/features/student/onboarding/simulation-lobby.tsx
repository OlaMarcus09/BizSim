import Link from "next/link";
import { ArrowRight, BarChart3, CalendarClock, CheckCircle2, Clock3, LogOut, Store, Users } from "lucide-react";
import { Card, CardContent, CardHeader, StatusIndicator } from "@/components/ui";
import { StudentPage } from "@/features/student/shell";
import type { JoinedSimulation } from "./join-simulation-service";

export function SimulationLobby({ simulation, onLeave }: { simulation: JoinedSimulation; onLeave: () => void }) {
  return (
    <StudentPage
      title="Simulation Lobby"
      description="You’ve joined the class simulation. Your lecturer will make the remaining details available."
      actions={<button type="button" onClick={onLeave} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={17} />Leave Simulation</button>}
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,0.8fr)]">
        <div className="space-y-5">
          <Card className="overflow-hidden border-slate-800 bg-navy-900 text-white">
            <CardContent className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)]">
              <div className="absolute -right-24 -top-28 size-72 rounded-full bg-brand-500/10 blur-3xl" />
              <div className="relative"><div className="flex items-start gap-4"><span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-500 ring-1 ring-brand-500/20"><Store size={30} /></span><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">{simulation.name}</h2><StatusIndicator tone="warning">Waiting</StatusIndicator></div><p className="mt-2 text-sm text-slate-300">Simulation code: <span className="font-semibold text-white">{simulation.code}</span></p></div></div><div className="mt-7 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">{[[CalendarClock,"Rounds","Not announced"],[BarChart3,"Industry","Unavailable"],[Users,"Participants","Unavailable"]].map(([Icon,label,value]) => {const ItemIcon=Icon as typeof CalendarClock; return <div className="flex gap-3" key={String(label)}><ItemIcon size={20} className="text-brand-500" /><div><p className="text-xs text-slate-400">{String(label)}</p><p className="mt-1 text-sm font-semibold">{String(value)}</p></div></div>;})}</div></div>
              <div className="relative rounded-xl border border-white/15 bg-white/[0.04] p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Simulation status</p><p className="mt-3 text-xl font-bold">Waiting to begin</p><p className="mt-2 text-sm leading-6 text-slate-300">Start time and round details have not been announced.</p></div>
            </CardContent>
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <Card><CardHeader><h2 className="font-bold">Participation Status</h2></CardHeader><CardContent><div className="flex items-center gap-4"><span className="flex size-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={23} /></span><div><p className="font-semibold">You’ve joined successfully</p><p className="mt-1 text-sm text-muted">Your place in this simulation is confirmed locally.</p></div></div></CardContent></Card>
            <Card><CardHeader><h2 className="font-bold">Ready to Begin?</h2></CardHeader><CardContent><div className="flex items-center gap-4"><span className="flex size-11 items-center justify-center rounded-full bg-amber-50 text-amber-600"><Clock3 size={23} /></span><div><p className="font-semibold">Waiting for your lecturer</p><p className="mt-1 text-sm text-muted">The simulation is not ready to begin yet.</p></div></div></CardContent></Card>
          </div>

          <Card><CardHeader><h2 className="font-bold">Before the Simulation Starts</h2></CardHeader><CardContent><div className="grid gap-5 sm:grid-cols-3">{["Review the simulation information when it becomes available.","Wait for your lecturer to open the first round.","Return to this lobby to check the start status."].map((copy,index) => <div className="flex gap-3" key={copy}><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{index + 1}</span><p className="text-sm leading-6 text-muted">{copy}</p></div>)}</div></CardContent></Card>
          <div className="flex flex-col items-start justify-between gap-4 rounded-card border border-brand-100 bg-brand-50 p-5 sm:flex-row sm:items-center"><div><p className="font-bold text-brand-700">Continue your orientation</p><p className="mt-1 text-sm text-muted">Company information may remain unavailable until assignment.</p></div><Link href="/student/company" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700">Company Overview <ArrowRight size={17} /></Link></div>
        </div>

        <aside className="space-y-5">
          <Card><CardHeader><h2 className="font-bold">Simulation Information</h2></CardHeader><CardContent className="divide-y divide-border">{[["Current round","Not announced"],["Total rounds","Not announced"],["Start time","Not announced"],["Class size","Unavailable"]].map(([label,value]) => <div className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0" key={label}><span className="text-muted">{label}</span><span className="font-semibold">{value}</span></div>)}</CardContent></Card>
          <Card className="border-brand-100 bg-brand-50"><CardContent><p className="font-semibold text-brand-700">Lobby preview</p><p className="mt-2 text-sm leading-6 text-muted">This local lobby does not include realtime participant updates.</p></CardContent></Card>
        </aside>
      </div>
    </StudentPage>
  );
}
