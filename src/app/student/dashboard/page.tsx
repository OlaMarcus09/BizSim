import { BusinessDashboardScreen } from "@/features/student/business/business-dashboard-screen";
import { unavailableBusinessState } from "@/features/student/business/data/unavailable-business-state";

export const metadata = { title: "Business Dashboard" };

export default function BusinessDashboardPage() {
  return <BusinessDashboardScreen state={unavailableBusinessState} />;
}
