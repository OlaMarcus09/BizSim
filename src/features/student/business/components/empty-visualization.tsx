import type { LucideIcon } from "lucide-react";

export function EmptyVisualization({ icon: Icon, title, description, minHeight = "min-h-56" }: { icon: LucideIcon; title: string; description: string; minHeight?: string }) {
  return (
    <div className={`flex ${minHeight} flex-col items-center justify-center rounded-lg border border-dashed border-border bg-slate-50/70 px-6 text-center`}>
      <span className="flex size-11 items-center justify-center rounded-full bg-white text-slate-300 ring-1 ring-border"><Icon size={22} /></span>
      <p className="mt-3 text-sm font-semibold text-slate-600">{title}</p>
      <p className="mt-1 max-w-sm text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}
