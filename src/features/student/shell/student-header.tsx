import { Bell, CircleHelp, Menu } from "lucide-react";

export function StudentHeader({ onOpenNavigation }: { onOpenNavigation: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-(--header-height) items-center justify-between border-b border-border bg-white/95 px-4 backdrop-blur sm:px-6 lg:ml-(--sidebar-width)">
      <button
        type="button"
        onClick={onOpenNavigation}
        aria-controls="student-navigation"
        aria-label="Open navigation"
        className="rounded-lg p-2 text-ink hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Student workspace</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 sm:flex"
        >
          <CircleHelp size={18} />
          How it works
        </button>
        <button
          type="button"
          className="relative rounded-full p-2 text-ink hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
        <span className="hidden h-8 w-px bg-border sm:block" />
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">Student</p>
          <p className="text-xs text-muted">Participant</p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
          S
        </span>
      </div>
    </header>
  );
}
