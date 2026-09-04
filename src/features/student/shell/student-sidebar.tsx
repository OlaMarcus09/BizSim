"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, CircleHelp, Settings, X } from "lucide-react";
import {
  joinSimulationNavigation,
  studentNavigation,
  type StudentNavigationItem,
} from "./student-navigation";

type StudentSidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

function isActive(pathname: string, item: StudentNavigationItem) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function StudentNavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: StudentNavigationItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isActive(pathname, item);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-[0.9375rem] font-medium transition-colors ${
        active
          ? "bg-white/10 text-white before:absolute before:inset-y-2 before:-left-3 before:w-0.5 before:rounded-full before:bg-brand-500"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={19} strokeWidth={1.8} className={active ? "text-brand-500" : ""} />
      <span>{item.label}</span>
    </Link>
  );
}

export function StudentSidebar({ mobileOpen, onClose }: StudentSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-[1px] transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="student-navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-(--sidebar-width) flex-col overflow-hidden bg-navy-900 text-white shadow-2xl transition-transform duration-200 ease-out lg:z-30 lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-(--header-height) shrink-0 items-center justify-between px-5">
          <Link href="/student" onClick={onClose} aria-label="BizSim student home">
            <span className="text-[1.7rem] font-extrabold tracking-[-0.04em]">
              BizSim<span className="ml-1 text-brand-500">▮▮▮</span>
            </span>
            <span className="block text-[0.55rem] font-semibold tracking-[0.17em] text-slate-300">
              THE N10 MILLION CHALLENGE
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Student navigation" className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {studentNavigation.map((item) => (
              <StudentNavLink key={item.href} item={item} pathname={pathname} onNavigate={onClose} />
            ))}
          </div>

          <div className="my-5 border-t border-white/10" />

          <StudentNavLink
            item={joinSimulationNavigation}
            pathname={pathname}
            onNavigate={onClose}
          />
        </nav>

        <div className="border-t border-white/10 p-3">
          <div
            aria-disabled="true"
            className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-slate-400"
          >
            <CircleHelp size={18} />
            Help & Support
          </div>
          <div
            aria-disabled="true"
            className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-slate-400"
          >
            <Settings size={18} />
            Settings
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
              S
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Student</p>
              <p className="truncate text-xs text-slate-400">Participant</p>
            </div>
            <ChevronRight size={17} className="text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
