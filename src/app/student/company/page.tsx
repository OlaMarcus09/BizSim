import { CompanyOverviewScreen } from "@/features/student/business/company-overview-screen";
import { unavailableBusinessState } from "@/features/student/business/data/unavailable-business-state";

export const metadata = { title: "Company Overview" };

export default function CompanyOverviewPage() {
  return <CompanyOverviewScreen state={unavailableBusinessState} />;
}
