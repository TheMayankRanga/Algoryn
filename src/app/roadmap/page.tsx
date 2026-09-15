import Link from "next/link";
import { PlatformShell } from "@/components/platform-shell";
import { roadmapSteps } from "@/lib/content";

export default function RoadmapPage() {
  return (
    <PlatformShell title="Roadmap">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Progression</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">A path from fundamentals to advanced interviews.</h2>
        </section>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="space-y-4">
            {roadmapSteps.map((step, index) => (
              <Link key={`${step.title}-${index}`} href={`/learn/${step.slug}`} className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-cyan-500/50 hover:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-semibold text-cyan-200">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-white group-hover:text-cyan-200">{step.title}</p>
                  <p className="text-sm text-slate-400">Lessons, patterns, and problem links are organized around this stage.</p>
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Next</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PlatformShell>
  );
}
