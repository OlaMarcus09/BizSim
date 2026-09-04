import type { LucideIcon } from "lucide-react";
import { Card, CardContent, StatusIndicator } from "@/components/ui";
import { StudentPage } from "./student-page";

type StudentRoutePlaceholderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function StudentRoutePlaceholder({
  title,
  description,
  icon: Icon,
}: StudentRoutePlaceholderProps) {
  return (
    <StudentPage title={title} description={description} eyebrow="Student experience">
      <Card className="overflow-hidden">
        <CardContent className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
          <span className="mb-5 flex size-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <Icon size={26} strokeWidth={1.8} />
          </span>
          <StatusIndicator tone="neutral">Route established</StatusIndicator>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            Detailed page content will be implemented in a dedicated product pass.
          </p>
        </CardContent>
      </Card>
    </StudentPage>
  );
}
