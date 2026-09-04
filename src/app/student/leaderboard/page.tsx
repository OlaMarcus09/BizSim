import { Trophy } from "lucide-react";
import { StudentRoutePlaceholder } from "@/features/student/shell";

export const metadata = { title: "Leaderboard" };

export default function LeaderboardPage() {
  return (
    <StudentRoutePlaceholder
      title="Leaderboard"
      description="Simulation rankings will be presented here when leaderboard functionality is implemented."
      icon={Trophy}
    />
  );
}
