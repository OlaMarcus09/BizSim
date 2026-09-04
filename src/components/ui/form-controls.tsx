import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`h-10 w-full rounded-lg border border-border bg-white px-3 text-sm placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`h-10 rounded-lg border border-border bg-white px-3 text-sm focus:border-blue-500 focus:outline-none ${className}`} {...props}>{children}</select>;
}
