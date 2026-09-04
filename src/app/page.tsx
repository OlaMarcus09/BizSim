import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Lightbulb,
  PlayCircle,
  SlidersHorizontal,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { BizSimLogo } from "@/components/brand/bizsim-logo";

const howItWorks = [
  [BarChart3, "Review", "Check your performance and market conditions."],
  [SlidersHorizontal, "Decide", "Make strategic decisions across key areas."],
  [CheckCircle2, "Submit", "Review your choices and submit your round."],
  [Clock3, "Simulate", "See the market process your decisions."],
  [Trophy, "See Results", "Understand the impact of your decisions."],
  [GraduationCap, "Learn", "Apply the insights to your next round."],
] as const;

export default function LandingPage() {
  return (
    <main className="bg-white text-ink">
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgb(20_115_230/0.2),transparent_30%),radial-gradient(circle_at_35%_58%,rgb(124_58_237/0.12),transparent_32%)]" />
        <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
          <header className="flex h-20 items-center justify-between gap-5">
            <BizSimLogo inverse />
            <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium text-slate-200 lg:flex"><a href="#how-it-works" className="hover:text-white">How It Works</a><a href="#features" className="hover:text-white">Features</a><span className="text-slate-400">For Lecturers</span><span className="text-slate-400">Pricing</span></nav>
            <div className="flex items-center gap-2 sm:gap-4"><Link href="/login" className="hidden px-3 py-2 text-sm font-semibold text-white hover:text-brand-500 sm:inline-flex">Log in</Link><Link href="/login" className="inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-semibold text-white hover:bg-brand-600">Sign Up</Link></div>
          </header>

          <div className="grid items-center gap-12 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:py-20">
            <div className="max-w-xl"><h1 className="text-4xl font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-5xl xl:text-6xl">Run Your Business.<br />Make Decisions.<br /><span className="text-brand-500">Own the Results.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">BizSim is an interactive business simulation where university students manage virtual companies, make strategic decisions, and experience real-world consequences.</p><div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/15 text-center text-xs text-slate-300"><div className="px-2"><Target className="mx-auto mb-2 text-white" size={27} /><span>Make Strategic Decisions</span></div><div className="px-2"><Trophy className="mx-auto mb-2 text-white" size={27} /><span>Compete with Classmates</span></div><div className="px-2"><BarChart3 className="mx-auto mb-2 text-white" size={27} /><span>Learn from Outcomes</span></div></div><div className="mt-8 flex flex-wrap gap-3"><Link href="/login" className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-500 px-6 font-semibold text-white hover:bg-brand-600">Join a Simulation <ArrowRight size={18} /></Link><a href="#how-it-works" className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/40 px-5 font-semibold text-white hover:bg-white/5"><PlayCircle size={18} />See how it works</a></div></div>

            <div className="relative mx-auto w-full max-w-3xl [perspective:1200px]"><div className="rounded-2xl border border-white/15 bg-[#07182c] p-3 shadow-[0_30px_90px_rgb(0_0_0/0.5)] lg:rotate-y-[-5deg] lg:rotate-z-[1deg]"><div className="rounded-xl border border-white/10 bg-[#091b31] p-4 sm:p-6"><div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="font-bold">Business Dashboard</p><p className="text-xs text-slate-400">Your company at a glance</p></div><span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-500">Ready</span></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{["Cash","Revenue","Profit","Market Share"].map((label) => <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-3 text-xl font-bold text-slate-300">—</p><p className="mt-1 text-[0.65rem] text-slate-500">Unavailable</p></div>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-[1.45fr_0.55fr]"><div className="relative h-52 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-4"><p className="text-sm font-semibold">Performance trend</p><svg aria-hidden="true" className="mt-7 h-28 w-full" viewBox="0 0 500 120" preserveAspectRatio="none"><path d="M0 100 C70 94 82 66 145 74 S230 88 285 52 S390 64 500 20" fill="none" stroke="#00b957" strokeWidth="3"/><path d="M0 110 C75 90 110 108 165 82 S250 92 310 70 S420 62 500 48" fill="none" stroke="#1473e6" strokeWidth="3"/></svg></div><div className="rounded-lg border border-white/10 bg-white/[0.03] p-4"><p className="text-sm font-semibold">Next step</p><p className="mt-4 text-sm text-slate-400">Join your class simulation to begin.</p><Link href="/login" className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold">Get started</Link></div></div></div></div></div>
          </div>

          <div id="features" className="mb-5 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-7"><h2 className="text-center text-xl font-bold">Designed for <span className="text-brand-500">Learning.</span> Built for <span className="text-blue-400">Impact.</span></h2><div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{[[GraduationCap,"Experiential Learning","Learn business concepts by doing."],[Users,"Competitive & Engaging","Compete in a realistic class market."],[BarChart3,"Realistic Simulation","Respond to dynamic market conditions."],[Lightbulb,"Built-in Insights","Learn from every completed round."]].map(([Icon,title,copy]) => {const FeatureIcon=Icon as typeof GraduationCap; return <div className="text-center" key={String(title)}><FeatureIcon className="mx-auto text-brand-500" size={31} /><h3 className="mt-3 font-semibold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{String(copy)}</p></div>;})}</div></div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-border bg-white px-5 py-14 sm:px-8"><div className="mx-auto max-w-[90rem]"><div className="text-center"><h2 className="text-3xl font-extrabold tracking-tight">How BizSim Works</h2><p className="mt-2 text-muted">A simple six-step loop that mirrors real business.</p></div><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">{howItWorks.map(([Icon,title,copy],index) => <div className="relative text-center" key={title}><span className="absolute left-[calc(50%+2.6rem)] top-7 hidden h-px w-[calc(100%-5rem)] border-t border-dashed border-slate-300 lg:block last:hidden" /><span className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-50 text-blue-700 ring-1 ring-border"><Icon size={27} /></span><span className="mx-auto -mt-1 flex size-5 items-center justify-center rounded-full bg-brand-600 text-[0.65rem] font-bold text-white">{index + 1}</span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted">{copy}</p></div>)}</div></div></section>

      <section className="bg-surface px-5 py-14 sm:px-8"><div className="mx-auto max-w-[90rem]"><h2 className="text-2xl font-extrabold">Why Students Love BizSim</h2><div className="mt-7 grid gap-4 md:grid-cols-[1.4fr_repeat(3,1fr)]"><div className="rounded-card border border-border bg-white p-6 shadow-card"><p className="text-lg font-medium leading-8">“BizSim makes business concepts click. It’s challenging, practical, and engaging.”</p><p className="mt-5 text-sm font-semibold">Student participant</p></div>{[[Users,"20K+","Students and growing"],[GraduationCap,"150+","Universities onboarded"],[Target,"1M+","Decisions made"]].map(([Icon,value,label]) => {const StatIcon=Icon as typeof Users; return <div key={String(value)} className="rounded-card border border-border bg-white p-6 text-center shadow-card"><StatIcon className="mx-auto text-brand-600" size={34} /><p className="mt-5 text-3xl font-extrabold">{String(value)}</p><p className="mt-2 text-sm text-muted">{String(label)}</p></div>;})}</div><div className="mt-9 flex flex-col items-center justify-between gap-5 rounded-xl bg-navy-900 px-6 py-6 text-white sm:flex-row"><div><h3 className="text-xl font-bold">Ready to take the <span className="text-brand-500">N10 Million Challenge?</span></h3><p className="mt-1 text-sm text-slate-300">Join a simulation and start building your business today.</p></div><Link href="/login" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-brand-500 px-6 font-semibold hover:bg-brand-600">Join Now <ArrowRight size={18} /></Link></div></div></section>

      <footer className="bg-navy-900 px-5 py-7 text-slate-300 sm:px-8"><div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-6 sm:flex-row"><BizSimLogo inverse /><div className="flex gap-6 text-xs"><span>About</span><span>Privacy Policy</span><span>Terms of Use</span><span>Contact</span></div></div></footer>
    </main>
  );
}
