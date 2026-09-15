import { PlatformShell } from "@/components/platform-shell";
import { InterviewMode } from "@/components/interview-mode";

export default function InterviewPage() {
  return <PlatformShell title="Interview Mode"><div className="space-y-8"><section className="rounded-3xl border border-amber-300/20 bg-slate-900/80 p-6"><p className="text-xs uppercase tracking-[0.2em] text-amber-300">Interview preparation</p><h2 className="mt-2 text-3xl font-semibold text-white">Think out loud. Reveal less. Learn more.</h2><p className="mt-3 max-w-2xl text-slate-300">A focused workspace for solving a problem before looking at hints or an approach.</p></section><InterviewMode /></div></PlatformShell>;
}
