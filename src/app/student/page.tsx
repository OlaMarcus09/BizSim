import { Home } from "lucide-react";
import { StudentRoutePlaceholder } from "@/features/student/shell";

export const metadata = { title: "Student dashboard" };

export default function StudentDashboardPage() {
  return (
    <StudentRoutePlaceholder
      title="Student Dashboard"
      description="Your starting point for the BizSim student experience."
      icon={Home}
    />
  );
}
