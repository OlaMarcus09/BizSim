import type { HTMLAttributes } from "react";

export function PageContainer({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <main className={`mx-auto w-full max-w-[96rem] p-4 sm:p-6 lg:p-7 ${className}`} {...props} />;
}
