import { ArrowRight, BarChart3, BookOpenCheck, GraduationCap, Plus, Users } from "lucide-react";
import { PageContainer } from "@/components/layout";
import { Button, Card, CardContent, CardHeader, DataTable, MetricCard, StatusIndicator } from "@/components/ui";

export const metadata = { title: "Lecturer dashboard" };

export default function LecturerDashboard() {
  return <PageContainer>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-brand-700">Lecturer workspace</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Dashboard</h1><p className="mt-1 text-muted">Manage simulations, classes, and student progress.</p></div><Button size="lg"><Plus size={18} />Create simulation</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Active simulations" value="—" icon={GraduationCap} /><MetricCard label="Students" value="—" icon={Users} tone="blue" /><MetricCard label="Completed rounds" value="—" icon={BookOpenCheck} tone="violet" /><MetricCard label="Average performance" value="—" icon={BarChart3} tone="amber" /></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]"><Card><CardHeader><div><h2 className="font-bold">Your simulations</h2><p className="mt-0.5 text-sm text-muted">Recently created and active classes</p></div><Button variant="ghost" size="sm">View all <ArrowRight size={16} /></Button></CardHeader><CardContent className="p-0"><DataTable caption="Your simulations" columns={["Simulation", "Class", "Status", "Round"]} rows={[[<span className="font-semibold" key="simulation">No simulations yet</span>, "—", <StatusIndicator key="status">Not started</StatusIndicator>, "—"]]} /></CardContent></Card><Card><CardHeader><h2 className="font-bold">Quick actions</h2></CardHeader><CardContent className="space-y-3"><Button className="w-full justify-start" variant="secondary"><Plus size={17} />Create simulation</Button><Button className="w-full justify-start" variant="secondary"><Users size={17} />View classes</Button><Button className="w-full justify-start" variant="secondary"><BarChart3 size={17} />Results & analytics</Button></CardContent></Card></div>
  </PageContainer>;
}
