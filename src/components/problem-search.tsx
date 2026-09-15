'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { problemCards } from "@/lib/content";

export function ProblemSearch() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return problemCards;

    return problemCards.filter((problem) =>
      [problem.title, problem.pattern, problem.topic, String(problem.id)]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-300">
        <Search size={16} className="text-cyan-300" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, topic, pattern, or id"
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((problem) => (
            <Link key={problem.id} href={problem.leetcodeUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 transition hover:border-cyan-500/50 hover:bg-slate-900">
              <div>
                <p className="font-medium text-white hover:text-cyan-300">{problem.title}</p>
                <p className="text-xs text-slate-400">{problem.topic} • {problem.pattern}</p>
              </div>
              <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-200">{problem.difficulty}</span>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-400">
            No results match your search yet.
          </div>
        )}
      </div>
    </div>
  );
}
