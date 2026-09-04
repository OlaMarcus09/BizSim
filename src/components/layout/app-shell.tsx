import type { ReactNode } from "react";
import { Header } from "./header";
import { Sidebar, type Experience } from "./sidebar";

export function AppShell({ experience, children }: { experience: Experience; children: ReactNode }) {
  return <div className="min-h-screen bg-surface"><Sidebar experience={experience} /><Header experience={experience} /><div className="lg:ml-(--sidebar-width)">{children}</div></div>;
}
