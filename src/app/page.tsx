import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, Code2, Layers3, Sparkles } from "lucide-react";
import { DashboardWidgets } from "@/components/dashboard-widgets";
import { DailyPulse } from "@/components/daily-pulse";
import { LessonDetail } from "@/components/lesson-detail";
import { ProblemSearch } from "@/components/problem-search";
import { DataPoints, PatternTrainer, SortingVisualizer } from "@/components/visualizers";
import { lessonSamples } from "@/lib/content";
import { PlatformShell } from "@/components/platform-shell";
import { UserGreeting } from "@/components/user-profile";

export default function HomePage() {
  return (
    <PlatformShell title="Understand DSA by watching it happen.">
      <div className="space-y-10">
        <section className="border-b border-slate-800 bg-slate-900/40 px-1 pb-8 pt-2 md:pb-10">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                <Sparkles size={12} />
                Algoryn · Interactive DSA learning
              </span>
              <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                See DSA. Understand DSA. Solve DSA.
              </h2>
              <UserGreeting />
              <p className="mt-4 max-w-xl text-lg text-slate-300">
                A practical workspace for learning concepts, watching algorithms execute, recognizing patterns, and practicing the problems that matter.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/learn" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950">
                  Start Learning <ArrowRight size={16} />
                </Link>
                <Link href="/visualizers" className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 font-medium text-white">
                  Explore Visualizers
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
              <SortingVisualizer />
            </div>
          </div>
        </section>

        <DataPoints />

        <DailyPulse />

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Suggested curriculum</p>
            <div className="mt-5 space-y-3">
              {lessonSamples.map((lesson, index) => (
                <Link key={lesson.slug} href={`/learn/${lesson.slug}`} className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-cyan-500/50 hover:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-semibold text-cyan-200">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-cyan-200">{lesson.title}</p>
                      <p className="text-sm text-slate-400">{lesson.summary}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">{lesson.difficulty}</span>
                </Link>
              ))}
            </div>
          </div>

          <PatternTrainer />
        </section>

        <LessonDetail />

        <DashboardWidgets />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <ProblemSearch />
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-300">Practice engine</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Interview-ready drills</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Move from recognition to execution with timed prompts, pattern hints, and after-the-fact reflection on the solution path.
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">• Pattern recognition quiz</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">• Daily interview prompt</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">• Mistake review and hints</div>
            </div>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Arrays & Pointers", icon: Layers3, description: "Move from index logic to optimized search and comparison patterns." },
            { title: "Trees & Graphs", icon: BrainCircuit, description: "Understand traversal, connectedness, shortest paths, and structure." },
            { title: "Dynamic Programming", icon: BarChart3, description: "Visualize state, transitions, and the optimization thinking behind DP." },
            { title: "Code + Visualization", icon: Code2, description: "Pair every line of logic with a visible state change and explanation." },
          ].map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            </div>
          ))}
        </section>
      </div>
    </PlatformShell>
  );
}
