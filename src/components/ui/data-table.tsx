import type { ReactNode } from "react";

export function DataTable({ columns, rows, caption }: { columns: string[]; rows: ReactNode[][]; caption?: string }) {
  return <div className="overflow-x-auto rounded-card border border-border bg-white"><table className="w-full min-w-[42rem] border-collapse text-left text-sm">{caption && <caption className="sr-only">{caption}</caption>}<thead className="bg-slate-50 text-xs text-muted"><tr>{columns.map((column) => <th className="px-4 py-3 font-semibold" key={column}>{column}</th>)}</tr></thead><tbody className="divide-y divide-border">{rows.map((row, rowIndex) => <tr className="hover:bg-slate-50/70" key={rowIndex}>{row.map((cell, cellIndex) => <td className="px-4 py-3" key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
