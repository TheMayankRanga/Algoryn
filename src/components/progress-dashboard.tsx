"use client";

import Link from "next/link";
import { CheckCircle2, RotateCcw, Target } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import { neetcode250Problems } from "@/lib/neetcode250";
import { progressStorageKey, readProgress, subscribeToProgress } from "@/lib/progress";

export function ProgressDashboard() {
  const snapshot = useSyncExternalStore(subscribeToProgress, readProgress, () => "");
  const solved = useMemo(() => new Set(snapshot ? snapshot.split(",").filter(Boolean).map(Number) : []), [snapshot]);
  const topicCounts = useMemo(() => neetcode250Problems.reduce<Record<string, { total: number; solved: number }>>((result, problem) => {
    const current = result[problem.topic] ?? { total: 0, solved: 0 };
    current.total += 1;
    if (solved.has(problem.id)) current.solved += 1;
    result[problem.topic] = current;
    return result;
  }, {}), [solved]);

  function resetProgress() {
    window.localStorage.removeItem(progressStorageKey);
    window.dispatchEvent(new Event("visualizer-lab-progress"));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-lime-300/25 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-lime-200">Local progress</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Your practice history</h2>
            <p className="mt-2 max-w-2xl text-slate-300">This dashboard reads the problem ticks saved in this browser. No account or server storage is required.</p>
          </div>
          <button type="button" onClick={resetProgress} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-rose-300 hover:text-rose-200"><RotateCcw size={15} /> Reset local progress</button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><CheckCircle2 className="text-lime-200" size={19} /><p className="mt-4 text-3xl font-semibold text-white">{solved.size}</p><p className="mt-1 text-sm text-slate-400">Problems completed</p></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><Target className="text-sky-300" size={19} /><p className="mt-4 text-3xl font-semibold text-white">{Math.round(solved.size / neetcode250Problems.length * 100)}%</p><p className="mt-1 text-sm text-slate-400">Library completion</p></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><p className="text-xs uppercase tracking-[0.16em] text-amber-300">Next move</p><p className="mt-4 text-lg font-semibold text-white">{solved.size ? "Keep the streak going" : "Start with one problem"}</p><Link href="/leetcode" className="mt-2 inline-block text-sm text-lime-200 hover:text-lime-100">Open problem library →</Link></div>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Topic progress</p>
        <div className="mt-5 space-y-4">
          {Object.entries(topicCounts).map(([topic, counts]) => (
            <div key={topic}>
              <div className="mb-1 flex justify-between text-sm"><span className="text-slate-300">{topic}</span><span className="font-mono text-slate-500">{counts.solved}/{counts.total}</span></div>
              <div className="h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-lime-300 transition-all" style={{ width: `${counts.solved / counts.total * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
