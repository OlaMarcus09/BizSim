import type { LucideIcon } from "lucide-react";
import type { BusinessMetric, MetricTone } from "@/domain/business-state";

const tones: Record<MetricTone, string> = {
  green: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

export function BusinessMetricCard({ metric, icon: Icon }: { metric: BusinessMetric; icon: LucideIcon }) {
  return (
    <div className="min-w-0 rounded-lg border border-border bg-white p-4 shadow-[0_1px_4px_rgb(15_23_42/0.04)]">
      <div className="flex items-center gap-2.5"><span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tones[metric.tone]}`}><Icon size={18} /></span><p className="truncate text-xs font-semibold text-muted">{metric.label}</p></div>
      <p className={`mt-4 text-xl font-extrabold tracking-tight ${metric.value.availability === "available" ? "text-ink" : "text-slate-400"}`}>{metric.value.availability === "available" ? metric.value.value : "—"}</p>
      <p className="mt-1 truncate text-xs text-muted" title={metric.value.availability === "unavailable" ? metric.value.reason : undefined}>{metric.trend.availability === "available" ? metric.trend.value : "Unavailable"}</p>
    </div>
  );
}
