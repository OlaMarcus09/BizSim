import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout";

type StudentPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function StudentPage({
  title,
  description,
  eyebrow,
  actions,
  children,
}: StudentPageProps) {
  return (
    <PageContainer className="px-4 py-5 sm:px-6 sm:py-7 lg:px-7">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl font-extrabold tracking-[-0.025em] text-ink sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted sm:text-base">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </PageContainer>
  );
}
