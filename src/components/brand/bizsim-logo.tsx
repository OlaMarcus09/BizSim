import Link from "next/link";

export function BizSimLogo({ href = "/", inverse = false }: { href?: string; inverse?: boolean }) {
  return (
    <Link href={href} aria-label="BizSim home" className="inline-flex flex-col">
      <span className={`text-[1.7rem] font-extrabold leading-none tracking-[-0.045em] ${inverse ? "text-white" : "text-ink"}`}>
        BizSim<span className="ml-1 text-brand-500">▮▮▮</span>
      </span>
      <span className={`mt-1 text-[0.52rem] font-semibold tracking-[0.16em] ${inverse ? "text-slate-300" : "text-muted"}`}>
        THE N10 MILLION CHALLENGE
      </span>
    </Link>
  );
}
