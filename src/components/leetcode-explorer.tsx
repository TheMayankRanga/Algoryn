'use client';

import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { neetcode250Categories, neetcode250Url } from "@/lib/content";
import { neetcode250Problems } from "@/lib/neetcode250";
import { progressStorageKey, readProgress, subscribeToProgress } from "@/lib/progress";

type View = "all" | "arrays" | "neetcode";

function ProblemTick({ id, checked, onToggle }: { id: number; checked: boolean; onToggle: (id: number) => void }) {
  return (
    <button type="button" onClick={() => onToggle(id)} className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${checked ? "border-lime-300/60 bg-lime-300/15 text-lime-200" : "border-slate-700 text-slate-400 hover:border-lime-300/50 hover:text-lime-200"}`} aria-label={checked ? "Mark problem as incomplete" : "Mark problem as solved"} title={checked ? "Mark incomplete" : "Mark solved"}>
      <span className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${checked ? "border-lime-300 bg-lime-300 text-slate-950" : "border-slate-500"}`}>{checked ? "✓" : ""}</span>
      {checked ? "Solved" : "Tick"}
    </button>
  );
}

export function LeetcodeExplorer() {
  const [view, setView] = useState<View>("all");
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("All topics");
  const progressSnapshot = useSyncExternalStore(subscribeToProgress, readProgress, () => "");
  const solvedIds = useMemo(() => new Set(progressSnapshot ? progressSnapshot.split(",").filter(Boolean).map(Number) : []), [progressSnapshot]);

  function toggleSolved(id: number) {
    const next = new Set(solvedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    window.localStorage.setItem(progressStorageKey, Array.from(next).sort((a, b) => a - b).join(","));
    window.dispatchEvent(new Event("visualizer-lab-progress"));
  }

  const filteredProblems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return neetcode250Problems.filter((problem) => {
      const matchesView = view === "all" || view === "arrays" && (problem.topic === "Arrays" || problem.topic === "Arrays & Hashing");
      const matchesTopic = topicFilter === "All topics" || problem.topic === topicFilter;
      const matchesQuery = !term || [problem.title, problem.pattern, problem.topic, String(problem.id)].join(" ").toLowerCase().includes(term);
      return matchesView && matchesTopic && matchesQuery;
    });
  }, [query, topicFilter, view]);

  const filteredNeetcodeProblems = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return neetcode250Problems;
    return neetcode250Problems.filter((problem) => [problem.title, problem.topic, problem.pattern, String(problem.id)].join(" ").toLowerCase().includes(term));
  }, [query]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Problem library</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Practice the patterns behind interview problems.</h2>
            <p className="mt-3 max-w-2xl text-slate-300">Browse all problems, focus on every Arrays question, or follow the complete NeetCode 250 category map.</p>
          </div>
          <a href={neetcode250Url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cyan-500 px-4 py-2.5 font-medium text-slate-950 transition hover:bg-cyan-300">
            Open NeetCode 250 <ExternalLink size={16} />
          </a>
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {([
            ["all", "All Problems"],
            ["arrays", "Arrays"],
            ["neetcode", "NeetCode 250"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button" onClick={() => { setView(value); setTopicFilter("All topics"); }} className={`rounded-full px-4 py-2 text-sm font-medium transition ${view === value ? "bg-cyan-500 text-slate-950" : "border border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500/50"}`}>
              {label}
            </button>
          ))}
        </div>
        <label className="flex min-w-64 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-300">
            <Search size={16} className="text-cyan-300" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, topic, pattern" className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none" />
        </label>
      </div>

      <section className="rounded-3xl border border-lime-300/20 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-300">Your saved progress</span>
          <span className="font-mono text-lime-200">{solvedIds.size} / 250 solved</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-lime-300 transition-all" style={{ width: `${Math.min(100, solvedIds.size / 2.5)}%` }} /></div>
        <p className="mt-2 text-xs text-slate-500">Ticks are stored locally in this browser on this computer.</p>
      </section>

      {view === "all" && (
        <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
          <span className="mr-1 self-center text-xs uppercase tracking-[0.16em] text-slate-500">Topics</span>
          <button type="button" onClick={() => setTopicFilter("All topics")} className={`rounded-full px-3 py-1.5 text-xs font-medium ${topicFilter === "All topics" ? "bg-cyan-500 text-slate-950" : "border border-slate-700 text-slate-300"}`}>All</button>
          {neetcode250Categories.map((category) => (
            <button key={category.name} type="button" onClick={() => setTopicFilter(category.name)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${topicFilter === category.name ? "bg-cyan-500 text-slate-950" : "border border-slate-700 text-slate-300 hover:border-cyan-500/50"}`}>
              {category.name}
            </button>
          ))}
        </div>
      )}

      {view === "neetcode" ? (
        <div className="space-y-6">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Complete study map</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">250 problems across 18 patterns</h3>
            </div>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-200">250 total</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {neetcode250Categories.map((category) => (
              <a key={category.name} href={neetcode250Url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-cyan-500/50 hover:bg-slate-900">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-white group-hover:text-cyan-200">{category.name}</span>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-300" />
                </div>
                <p className="mt-2 text-sm text-slate-400">{category.count} problems</p>
                <div className="mt-3 h-1.5 rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${Math.max(20, category.count / 30 * 100)}%` }} /></div>
              </a>
            ))}
          </div>
        </section>
        <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-400">Showing {filteredNeetcodeProblems.length} of 250 NeetCode problems</div>
          <div className="hidden grid-cols-6 border-b border-slate-800 bg-slate-950 px-4 py-3 text-xs uppercase tracking-[0.14em] text-slate-500 md:grid"><span>#</span><span>Question</span><span>Topic</span><span>Difficulty</span><span>Open</span><span>Done</span></div>
          {filteredNeetcodeProblems.map((problem) => (
            <div key={`${problem.id}-${problem.title}`} className="grid gap-2 border-b border-slate-800 px-4 py-3 text-sm last:border-b-0 md:grid-cols-6 md:items-center">
              <span className="text-cyan-300">{problem.id}</span>
              <Link href={`/problems/${problem.id}`} className="font-medium text-white hover:text-cyan-300">{problem.title}</Link>
              <span className="text-slate-300">{problem.topic}</span>
              <span className="text-slate-300">{problem.difficulty}</span>
              <a href={problem.leetcodeUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1 text-cyan-300 hover:text-cyan-200">LeetCode <ExternalLink size={13} /></a>
              <ProblemTick id={problem.id} checked={solvedIds.has(problem.id)} onToggle={toggleSolved} />
            </div>
          ))}
        </section>
        </div>
      ) : (
        <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-400">{view === "arrays" ? `${filteredProblems.length} Arrays questions` : `${filteredProblems.length} curated questions`}</div>
          <div className="hidden grid-cols-7 border-b border-slate-800 bg-slate-950 px-4 py-3 text-xs uppercase tracking-[0.14em] text-slate-500 md:grid">
            <span>#</span><span>Title</span><span>Difficulty</span><span>Pattern</span><span>Topic</span><span>Open</span><span>Done</span>
          </div>
          {filteredProblems.length > 0 ? filteredProblems.map((problem) => (
            <div key={problem.id} className="grid gap-2 border-b border-slate-800 px-4 py-4 text-sm last:border-b-0 md:grid-cols-7 md:items-center">
              <span className="font-medium text-cyan-300">{problem.id}</span>
              <Link href={`/problems/${problem.id}`} className="font-medium text-white hover:text-cyan-300">{problem.title}</Link>
              <span className="text-slate-300">{problem.difficulty}</span>
              <span className="text-slate-300">{problem.pattern}</span>
              <span className="text-slate-300">{problem.topic}</span>
              <a href={problem.leetcodeUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1 text-cyan-300 hover:text-cyan-200">LeetCode <ExternalLink size={13} /></a>
              <ProblemTick id={problem.id} checked={solvedIds.has(problem.id)} onToggle={toggleSolved} />
            </div>
          )) : <div className="p-8 text-center text-slate-400">No questions match this search.</div>}
        </section>
      )}
    </div>
  );
}
