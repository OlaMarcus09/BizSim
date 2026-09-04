import { LogIn } from "lucide-react";
import { StudentRoutePlaceholder } from "@/features/student/shell";

export const metadata = { title: "Join Simulation" };

export default function JoinSimulationPage() {
  return (
    <StudentRoutePlaceholder
      title="Join Simulation"
      description="Enter a lecturer-provided simulation when this experience is implemented."
      icon={LogIn}
    />
  );
}
