import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "./card";

export function ChartFrame({ title, description, legend, children }: { title: string; description?: string; legend?: ReactNode; children: ReactNode }) {
  return <Card><CardHeader><div><h2 className="font-bold">{title}</h2>{description && <p className="mt-0.5 text-sm text-muted">{description}</p>}</div>{legend}</CardHeader><CardContent>{children}</CardContent></Card>;
}
