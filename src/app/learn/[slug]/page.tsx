import { notFound } from "next/navigation";
import { curriculum, lessonBySlug, topicExamples, topicKnowledge } from "@/lib/content";
import { PlatformShell } from "@/components/platform-shell";
import { TopicVisualizer } from "@/components/visualizers";
import { ExamplePair } from "@/components/example-pair";
import { TopicQuiz } from "@/components/topic-quiz";
import { topicQuizData } from "@/lib/quiz-data";
import { TopicSidebar } from "@/components/topic-sidebar";

export function generateStaticParams() {
  return curriculum.map((topic) => ({ slug: topic.slug }));
}

export default async function TopicLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessonBySlug[slug];

  if (!lesson) {
    notFound();
  }

  const knowledge = topicKnowledge[lesson.slug];

  return (
    <PlatformShell title={lesson.title}>
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <TopicSidebar activeSlug={lesson.slug} />
        <div className="space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{lesson.category}</p>
              <h2 className="mt-2 text-4xl font-semibold text-white">{lesson.title}</h2>
            </div>
            <span className="inline-flex w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
              {lesson.difficulty}
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{lesson.description}</p>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Why it matters</p>
            <p className="mt-3 text-slate-300">{lesson.whyItMatters}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Intuition</p>
            <p className="mt-3 text-slate-300">{lesson.intuition}</p>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Topic reference</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{lesson.title} in brief</h3>
          <p className="mt-3 max-w-4xl text-slate-300">{knowledge.definition}</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-cyan-300">Key concepts</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">{knowledge.keyConcepts.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-300">Core operations</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">{knowledge.operations.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-300">Where it appears</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">{knowledge.useCases.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-300">Study checklist</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">{knowledge.checklist.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          </div>
        </section>

        <ExamplePair examples={topicExamples[lesson.slug]} eyebrow="Topic examples" />

        <TopicQuiz questions={topicQuizData[lesson.slug]} />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Visual example</p>
          <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950 p-5 text-lg text-slate-100">
            {lesson.visualExample}
          </div>
        </div>

        <div id="visualizer">
          <TopicVisualizer slug={lesson.slug} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Algorithm</p>
            <p className="mt-3 text-slate-300">{lesson.algorithm}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-300">Code</p>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-cyan-200">
              <code>{lesson.code}</code>
            </pre>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Complexity</p>
            <p className="mt-3 text-lg font-medium text-white">{lesson.complexity}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Tips</p>
            <ul className="mt-3 space-y-2 text-slate-300">
              {lesson.tips.map((tip) => <li key={tip}>• {tip}</li>)}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Common mistakes</p>
            <ul className="mt-3 space-y-2 text-slate-300">
              {lesson.mistakes.map((mistake) => <li key={mistake}>• {mistake}</li>)}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Related patterns</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {lesson.relatedPatterns.map((pattern) => (
              <span key={pattern} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-200">
                {pattern}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </PlatformShell>
  );
}
