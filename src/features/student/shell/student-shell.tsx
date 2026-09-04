"use client";

import { useEffect, useState, type ReactNode } from "react";
import { StudentHeader } from "./student-header";
import { StudentSidebar } from "./student-sidebar";

export function StudentShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-surface">
      <StudentSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <StudentHeader onOpenNavigation={() => setMobileOpen(true)} />
      <div className="lg:ml-(--sidebar-width)">{children}</div>
    </div>
  );
}
