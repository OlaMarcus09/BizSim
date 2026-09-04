import { BarChart3 } from "lucide-react";
import { StudentRoutePlaceholder } from "@/features/student/shell";

export const metadata = { title: "Business Dashboard" };

export default function BusinessDashboardPage() {
  return (
    <StudentRoutePlaceholder
      title="Main Business Dashboard"
      description="Business performance information will appear here once its product pass is complete."
      icon={BarChart3}
    />
  );
}
