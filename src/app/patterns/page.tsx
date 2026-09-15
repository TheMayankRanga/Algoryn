import { PlatformShell } from "@/components/platform-shell";
import { ExamplePair } from "@/components/example-pair";
import { patternExamples, patterns } from "@/lib/content";

export default function PatternsPage() {
  return (
    <PlatformShell title="DSA Patterns">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Pattern recognition</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Recognize the idea before writing the code.</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            The best DSA learners don’t memorize templates. They identify a repeated structure, then apply a proven pattern at the right moment.
          </p>
        </section>

        <div className="space-y-5">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Pattern</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{pattern.title}</h3>
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-200">{pattern.complexity}</span>
              </div>

              <p className="mt-4 text-slate-300">{pattern.description}</p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Recognition</h4>
                  <p className="mt-2 text-sm text-slate-300">{pattern.whenToUse}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Template</h4>
                  <p className="mt-2 text-sm text-slate-300">Initialize the state, shrink or expand the search space, and maintain invariants until the answer is found.</p>
                </div>
              </div>

              <div className="mt-5">
                <ExamplePair examples={patternExamples[pattern.title]} eyebrow={`${pattern.title} examples`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </PlatformShell>
  );
}
