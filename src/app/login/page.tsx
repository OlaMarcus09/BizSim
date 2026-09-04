import Link from "next/link";
import { BarChart3, GraduationCap, Trophy } from "lucide-react";
import { BizSimLogo } from "@/components/brand/bizsim-logo";
import { AuthForm } from "@/features/student/entry";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(22rem,0.85fr)_minmax(36rem,1.15fr)]">
      <section className="relative hidden min-h-screen overflow-hidden bg-navy-900 px-10 py-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_68%,rgb(20_115_230/0.22),transparent_36%),linear-gradient(to_top,rgb(0_185_87/0.1),transparent_45%)]" />
        <div className="relative"><BizSimLogo inverse /></div>
        <div className="relative my-auto max-w-lg py-12"><h2 className="text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">Log in to run.<br /><span className="text-brand-500">Decide to win.</span></h2><p className="mt-5 max-w-md text-lg leading-8 text-slate-300">Access your company, make strategic decisions, and compete with students across your class.</p><div className="mt-9 space-y-5">{[[BarChart3,"Real Business Simulation","Manage a virtual company in a dynamic market."],[Trophy,"Compete & Learn","See how your decisions compare to others."],[GraduationCap,"Insights That Stick","Learn business concepts through real outcomes."]].map(([Icon,title,copy]) => {const FeatureIcon=Icon as typeof BarChart3; return <div className="flex gap-4" key={String(title)}><span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-brand-500"><FeatureIcon size={23} /></span><div><p className="font-semibold">{String(title)}</p><p className="mt-1 text-sm text-slate-400">{String(copy)}</p></div></div>;})}</div></div>
        <div className="relative rounded-xl border border-white/15 bg-navy-900/70 p-5 text-sm text-slate-200"><p className="text-lg text-brand-500">“</p><p>Every decision is a chance to learn.</p><p className="mt-2 text-xs text-slate-400">BizSim student experience</p></div>
      </section>

      <section className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_95%_45%,rgb(20_115_230/0.05),transparent_30%)] px-4 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between lg:justify-end"><span className="lg:hidden"><BizSimLogo /></span><Link href="/" className="rounded-lg border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">Back home</Link></div>
        <div className="flex flex-1 items-center justify-center py-8"><AuthForm /></div>
        <p className="text-center text-xs text-muted">Authentication is not connected in this preview.</p>
      </section>
    </main>
  );
}
