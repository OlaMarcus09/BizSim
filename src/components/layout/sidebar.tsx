"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { BarChart3, BookOpen, Building2, CircleHelp, ClipboardCheck, Gauge, GraduationCap, Home, LayoutDashboard, Library, LineChart, Settings, Trophy, Users } from "lucide-react";

export type Experience = "student" | "lecturer";
type NavItem = { label: string; href: string; icon: LucideIcon };

const navigation: Record<Experience, NavItem[]> = {
  student: [
    { label: "Home", href: "/student", icon: Home },
    { label: "My Company", href: "/student/company", icon: Building2 },
    { label: "Market & News", href: "/student/market", icon: LineChart },
    { label: "Make Decisions", href: "/student/decisions", icon: ClipboardCheck },
    { label: "Results", href: "/student/results", icon: BarChart3 },
    { label: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
    { label: "Learning Hub", href: "/student/learning", icon: BookOpen },
  ],
  lecturer: [
    { label: "Dashboard", href: "/lecturer", icon: LayoutDashboard },
    { label: "Create Simulation", href: "/lecturer/simulations/new", icon: GraduationCap },
    { label: "Live Class", href: "/lecturer/live", icon: Gauge },
    { label: "My Simulations", href: "/lecturer/simulations", icon: Library },
    { label: "My Classes", href: "/lecturer/classes", icon: Users },
    { label: "Results & Analytics", href: "/lecturer/results", icon: BarChart3 },
  ],
};

export function Sidebar({ experience }: { experience: Experience }) {
  const pathname = usePathname();
  return <aside className="bg-navy-900 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-(--sidebar-width) lg:flex-col">
    <div className="flex h-(--header-height) shrink-0 items-center px-5"><Link href={`/${experience}`} aria-label="BizSim home" className="text-2xl font-extrabold tracking-tight">BizSim<span className="ml-1 text-brand-500">▮▮▮</span><span className="block text-[9px] font-medium tracking-[0.18em] text-slate-300">THE N10 MILLION CHALLENGE</span></Link></div>
    <nav aria-label={`${experience} navigation`} className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:py-4">
      {navigation[experience].map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return <Link key={href} href={href} className={`relative flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-white/10 text-white before:absolute before:inset-y-2 before:-left-3 before:w-0.5 before:bg-brand-500" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}><Icon size={19} className={active ? "text-brand-500" : ""} />{label}</Link>;
      })}
    </nav>
    <div className="hidden border-t border-white/10 p-3 lg:block"><Link href={`/${experience}/help`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"><CircleHelp size={19} />Help & Support</Link><Link href={`/${experience}/settings`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"><Settings size={19} />Settings</Link></div>
  </aside>;
}
