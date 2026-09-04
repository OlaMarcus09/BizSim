import { Building2 } from "lucide-react";
import { StudentRoutePlaceholder } from "@/features/student/shell";

export const metadata = { title: "Company Overview" };

export default function CompanyOverviewPage() {
  return (
    <StudentRoutePlaceholder
      title="Company Overview"
      description="Your assigned company profile will be presented here."
      icon={Building2}
    />
  );
}
