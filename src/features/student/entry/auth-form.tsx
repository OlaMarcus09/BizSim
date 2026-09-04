"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, User, UserPlus } from "lucide-react";
import { authService, type AuthMode } from "@/auth/auth-service";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm", string>>;

function validate(mode: AuthMode, form: FormData) {
  const errors: Errors = {};
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm") ?? "");

  if (mode === "signup" && name.length < 2) errors.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (mode === "signup" && confirm !== password) errors.confirm = "Passwords do not match.";

  return { errors, values: { name, email, password } };
}

function FieldError({ children }: { children?: string }) {
  return children ? <p className="mt-1.5 text-xs font-medium text-red-600">{children}</p> : null;
}

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrors({});
    setMessage("");
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { errors: validationErrors, values } = validate(mode, form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("Please check the highlighted fields.");
      setStatus("error");
      return;
    }

    setErrors({});
    setMessage("");
    setStatus("submitting");
    const result = await authService.submit({ mode, ...values });

    if (!result.ok) {
      setMessage(result.message);
      setStatus("error");
      return;
    }

    setStatus("success");
    setMessage(mode === "login" ? "Login UI completed." : "Account UI completed.");
    window.setTimeout(() => router.push("/student"), 450);
  }

  return (
    <div className="w-full max-w-[44rem] rounded-2xl border border-border bg-white p-5 shadow-[0_20px_60px_rgb(15_23_42/0.1)] sm:p-8 lg:p-12">
      <div className="grid grid-cols-2 border-b border-border">
        <button type="button" onClick={() => changeMode("login")} className={`flex items-center justify-center gap-2 border-b-2 px-3 py-4 font-semibold transition-colors ${mode === "login" ? "border-brand-500 text-brand-700" : "border-transparent text-muted hover:text-ink"}`}><User size={19} />Log In</button>
        <button type="button" onClick={() => changeMode("signup")} className={`flex items-center justify-center gap-2 border-b-2 px-3 py-4 font-semibold transition-colors ${mode === "signup" ? "border-brand-500 text-brand-700" : "border-transparent text-muted hover:text-ink"}`}><UserPlus size={19} />Create Account</button>
      </div>

      <div className="pt-8">
        <h1 className="text-2xl font-extrabold tracking-tight">{mode === "login" ? "Welcome back!" : "Create your account"}</h1>
        <p className="mt-1 text-sm text-muted">{mode === "login" ? "Log in to continue your business simulation." : "Sign up to begin your BizSim student experience."}</p>
      </div>

      <form className="mt-7 space-y-5" noValidate onSubmit={handleSubmit}>
        {mode === "signup" && <label className="block"><span className="mb-2 block text-sm font-semibold">Full Name</span><span className="relative block"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} /><input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} className="h-13 w-full rounded-lg border border-border bg-white pl-12 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100" placeholder="Enter your full name" /></span><FieldError>{errors.name}</FieldError></label>}
        <label className="block"><span className="mb-2 block text-sm font-semibold">Email Address</span><span className="relative block"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} /><input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} className="h-13 w-full rounded-lg border border-border bg-white pl-12 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100" placeholder="Enter your email address" /></span><FieldError>{errors.email}</FieldError></label>
        <label className="block"><span className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold"><span>Password</span>{mode === "login" && <span className="font-medium text-brand-700">Forgot password?</span>}</span><span className="relative block"><LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} /><input name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} aria-invalid={Boolean(errors.password)} className="h-13 w-full rounded-lg border border-border bg-white pl-12 pr-12 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 rounded text-slate-500 hover:text-ink">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></span><FieldError>{errors.password}</FieldError></label>
        {mode === "signup" && <label className="block"><span className="mb-2 block text-sm font-semibold">Confirm Password</span><span className="relative block"><LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} /><input name="confirm" type={showPassword ? "text" : "password"} autoComplete="new-password" aria-invalid={Boolean(errors.confirm)} className="h-13 w-full rounded-lg border border-border bg-white pl-12 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100" placeholder="Confirm your password" /></span><FieldError>{errors.confirm}</FieldError></label>}

        {status === "error" && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{message}</div>}
        {status === "success" && <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{message} Redirecting…</div>}

        <div className="flex items-center justify-between gap-3 text-sm text-muted"><label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-(--brand-600)" />Remember me</label><span className="text-brand-700">Need help?</span></div>
        <button disabled={status === "submitting" || status === "success"} className="flex h-13 w-full items-center justify-center gap-3 rounded-lg bg-brand-600 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-wait disabled:opacity-70">{status === "submitting" ? <><LoaderCircle className="animate-spin" size={20} />Please wait</> : <>{mode === "login" ? "Log In" : "Create Account"}<ArrowRight size={20} /></>}</button>
      </form>

      <div className="my-7 flex items-center gap-4 text-sm text-muted before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">Or continue with</div>
      <div className="grid gap-3 sm:grid-cols-3">{["Google", "Microsoft", "Apple"].map((provider) => <button type="button" disabled key={provider} className="h-11 rounded-lg border border-border bg-white text-sm font-semibold text-muted disabled:cursor-not-allowed">{provider}</button>)}</div>
    </div>
  );
}
