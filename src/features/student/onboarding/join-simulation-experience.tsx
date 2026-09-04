"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, BarChart3, CheckCircle2, Info, LoaderCircle, Store, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { StudentPage } from "@/features/student/shell";
import { joinSimulationService, SIMULATION_CODE_PATTERN, type JoinedSimulation } from "./join-simulation-service";
import { SimulationLobby } from "./simulation-lobby";

function formatCode(value: string) {
  const normalized = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  return normalized.length > 4 ? `${normalized.slice(0, 4)}-${normalized.slice(4)}` : normalized;
}

export function JoinSimulationExperience() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [joinedSimulation, setJoinedSimulation] = useState<JoinedSimulation | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!SIMULATION_CODE_PATTERN.test(code)) {
      setError("Enter a valid 7-character code in the format BZ74-KM8.");
      return;
    }

    setError("");
    setSubmitting(true);
    const result = await joinSimulationService.join(code);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setJoinedSimulation(result.simulation);
  }

  if (joinedSimulation) {
    return <SimulationLobby simulation={joinedSimulation} onLeave={() => setJoinedSimulation(null)} />;
  }

  return (
    <StudentPage title="Join Simulation" description="Enter a simulation code to join your class and start your BizSim experience.">
      <Card className="overflow-hidden border-slate-800 bg-navy-900 text-white">
        <CardContent className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:p-10">
          <div className="absolute -right-20 -top-28 size-80 rounded-full bg-brand-500/10 blur-3xl" />
          <form onSubmit={handleSubmit} noValidate className="relative">
            <h2 className="text-2xl font-bold">Have a Simulation Code?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Enter the code provided by your lecturer to join the simulation.</p>
            <label className="mt-7 block"><span className="mb-2 block text-sm font-medium text-slate-200">Simulation Code</span><input value={code} onChange={(event) => {setCode(formatCode(event.target.value)); setError("");}} inputMode="text" autoCapitalize="characters" autoComplete="off" spellCheck={false} aria-invalid={Boolean(error)} aria-describedby={error ? "simulation-code-error" : "simulation-code-help"} placeholder="BZ74-KM8" className="h-14 w-full max-w-md rounded-lg border border-white/25 bg-white/[0.04] px-5 font-mono text-2xl font-bold tracking-[0.3em] text-white uppercase outline-none placeholder:text-slate-600 focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15" /></label>
            <div id={error ? "simulation-code-error" : "simulation-code-help"} role={error ? "alert" : undefined} className={`mt-4 flex max-w-md items-start gap-3 rounded-lg border px-4 py-3 text-sm ${error ? "border-red-400/40 bg-red-500/10 text-red-200" : "border-white/10 bg-white/[0.04] text-slate-300"}`}>{error ? <Info className="mt-0.5 shrink-0 text-red-300" size={18} /> : <Info className="mt-0.5 shrink-0 text-brand-500" size={18} />}<span>{error || "Codes are case-insensitive. Enter all seven letters or numbers."}</span></div>
            <button disabled={submitting} className="mt-5 flex h-12 w-full max-w-md items-center justify-center gap-2 rounded-lg bg-brand-500 font-semibold text-white hover:bg-brand-600 disabled:cursor-wait disabled:opacity-70">{submitting ? <><LoaderCircle className="animate-spin" size={19} />Joining…</> : <>Join Simulation <ArrowRight size={19} /></>}</button>
          </form>

          <div className="relative hidden min-h-72 items-center justify-center rounded-xl border border-brand-500/25 bg-[linear-gradient(145deg,rgb(0_185_87/0.07),transparent)] lg:flex"><div className="text-center"><p className="text-sm font-bold tracking-wider text-brand-500">COMPETE. DECIDE. WIN.</p><div className="mt-8 flex items-end justify-center gap-2 text-brand-500"><Users size={58} strokeWidth={1.2} /><BarChart3 size={88} strokeWidth={1.1} /></div></div></div>
        </CardContent>
      </Card>

      <section className="mt-7"><h2 className="text-xl font-bold">How Joining Works</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[CheckCircle2,"Enter Code","Use the code provided by your lecturer."],[Users,"Join Class","Your place in the class simulation is confirmed."],[Store,"Get Your Company","Company information appears when assigned."],[BarChart3,"Start Competing","Begin when your lecturer opens the simulation."]].map(([Icon,title,copy],index) => {const StepIcon=Icon as typeof CheckCircle2; return <Card key={String(title)}><CardContent className="h-full"><div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-full bg-slate-50 text-blue-700"><StepIcon size={22} /></span><span className="flex size-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{index + 1}</span></div><h3 className="mt-5 font-bold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-muted">{String(copy)}</p></CardContent></Card>;})}</div></section>
    </StudentPage>
  );
}
