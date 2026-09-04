import { Bell, CircleHelp } from "lucide-react";
import type { Experience } from "./sidebar";

export function Header({ experience }: { experience: Experience }) {
  const lecturer = experience === "lecturer";
  return <header className="sticky top-0 z-20 flex h-(--header-height) items-center justify-between border-b border-border bg-white/95 px-4 backdrop-blur sm:px-6 lg:ml-(--sidebar-width)">
    <div><p className="text-xs font-medium uppercase tracking-wider text-muted">BizSim</p><p className="font-semibold capitalize">{experience} experience</p></div>
    <div className="flex items-center gap-3 sm:gap-5"><button className="hidden items-center gap-2 text-sm font-medium text-brand-700 sm:flex" aria-label="How BizSim works"><CircleHelp size={18} />How it works</button><button className="relative rounded-full p-2 hover:bg-slate-100" aria-label="Notifications"><Bell size={20} /><span className="absolute right-1 top-1 size-2 rounded-full bg-red-500 ring-2 ring-white" /></button><div className="h-8 w-px bg-border" /><div className="text-right"><p className="text-sm font-semibold">{lecturer ? "Dr. Adebayo" : "Student"}</p><p className="text-xs text-muted">{lecturer ? "Lecturer" : "Participant"}</p></div><span className="flex size-9 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">{lecturer ? "DA" : "S"}</span></div>
  </header>;
}
