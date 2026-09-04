import { Newspaper } from "lucide-react";
import { StudentRoutePlaceholder } from "@/features/student/shell";

export const metadata = { title: "Market & News" };

export default function MarketNewsPage() {
  return (
    <StudentRoutePlaceholder
      title="Market & News"
      description="Market conditions and news will be presented here in a later pass."
      icon={Newspaper}
    />
  );
}
