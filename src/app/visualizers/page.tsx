import { BinarySearchVisualizer, PatternTrainer, SortingVisualizer } from "@/components/visualizers";
import { PlatformShell } from "@/components/platform-shell";
import Link from "next/link";
import { visualModules } from "@/lib/content";

export default function VisualizersPage() {
  return (
    <PlatformShell title="Visualizers">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950/40 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Algorithm execution</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">See the logic move, not just the final answer.</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Every major algorithm should make a run-time state visible: comparisons, pointer movement, queue changes, and decision points all become visible in the same flow.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <SortingVisualizer />
          <BinarySearchVisualizer />
        </div>

        <div className="max-w-2xl">
          <PatternTrainer />
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Visual module library</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{visualModules.length}+ ways to see DSA move</h3>
              <p className="mt-2 text-sm text-slate-300">Every module opens the matching topic lesson and its interactive visualizer.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visualModules.map((visual, index) => (
              <Link key={visual.id} href={`/learn/${visual.topicSlug}#visualizer`} className={`group rounded-2xl border border-slate-800 bg-slate-950/70 p-4 ${visual.animation}`} style={{ animationDelay: `${(index % 6) * 90}ms` }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-[0.14em] text-violet-300">{visual.kind}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
                </div>
                <h4 className="mt-3 font-medium text-white group-hover:text-cyan-200">{visual.title}</h4>
                <p className="mt-2 text-sm leading-5 text-slate-400">{visual.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
