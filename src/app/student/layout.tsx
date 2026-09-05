import { StudentShell } from "@/features/student/shell";
import { DecisionSessionProvider } from "@/features/student/decisions";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <DecisionSessionProvider><StudentShell>{children}</StudentShell></DecisionSessionProvider>;
}
