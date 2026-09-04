import { MarketNewsScreen } from "@/features/student/business/market-news-screen";
import { unavailableBusinessState } from "@/features/student/business/data/unavailable-business-state";

export const metadata = { title: "Market & News" };

export default function MarketNewsPage() {
  return <MarketNewsScreen state={unavailableBusinessState.market} />;
}
