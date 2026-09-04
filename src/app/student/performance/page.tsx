import { History } from "lucide-react";
import { StudentRoutePlaceholder } from "@/features/student/shell";

export const metadata = { title: "Performance History" };

export default function PerformanceHistoryPage() {
  return (
    <StudentRoutePlaceholder
      title="Performance History"
      description="Completed-round performance history will be presented here."
      icon={History}
    />
  );
}
