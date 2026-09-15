import Link from "next/link";
import { LessonLibrary } from "@/components/lesson-library";
import { PlatformShell } from "@/components/platform-shell";
import { curriculum, lessonLibrary } from "@/lib/content";

export default function LearnPage() {
  return (
    <PlatformShell title="Learning Path">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Curriculum</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">A complete roadmap from beginner to problem solving.</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Each topic follows the same flow: concept, intuition, motion, code, and real problem patterns to help you connect understanding to execution.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">{lessonLibrary.length}+ lessons</span>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-violet-200">60 visual modules</span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-200">10 core topics</span>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {curriculum.map((topic) => (
            <Link key={topic.slug} href={`/learn/${topic.slug}`} className="group block rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-cyan-500/50 hover:bg-slate-900">
              <article>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs uppercase tracking-[0.15em] text-cyan-200">
                    {topic.category}
                  </span>
                  <span className="text-xs text-slate-400">{topic.difficulty}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-cyan-200">{topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{topic.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">{tag}</span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>

        <LessonLibrary />
      </div>
    </PlatformShell>
  );
}
