import type { LucideIcon } from "lucide-react";
import { Card } from "./card";

export function MetricCard({ label, value, detail, icon: Icon, tone = "green" }: { label: string; value: string; detail?: string; icon: LucideIcon; tone?: "green" | "blue" | "violet" | "amber" | "rose" }) {
  const tones = { green: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", violet: "bg-violet-50 text-violet-600", amber: "bg-amber-50 text-amber-600", rose: "bg-rose-50 text-rose-600" };
  return <Card className="min-w-0 p-4"><div className="flex gap-3"><span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}><Icon size={20} /></span><div className="min-w-0"><p className="text-xs font-medium text-muted">{label}</p><p className="truncate text-xl font-bold tracking-tight">{value}</p>{detail && <p className="mt-1 text-xs font-semibold text-emerald-600">{detail}</p>}</div></div></Card>;
}
