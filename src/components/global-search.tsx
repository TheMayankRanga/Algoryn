"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { curriculum, lessonLibrary, patterns } from "@/lib/content";
import { neetcode250Problems } from "@/lib/neetcode250";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const topics = curriculum.filter((item) => `${item.title} ${item.category} ${item.tags.join(" ")}`.toLowerCase().includes(term)).slice(0, 5).map((item) => ({ type: "Topic", title: item.title, detail: item.category, href: `/learn/${item.slug}` }));
    const matchedPatterns = patterns.filter((item) => `${item.title} ${item.description} ${item.whenToUse}`.toLowerCase().includes(term)).map((item) => ({ type: "Pattern", title: item.title, detail: item.complexity, href: "/patterns" }));
    const lessons = lessonLibrary.filter((item) => `${item.title} ${item.topicTitle} ${item.format}`.toLowerCase().includes(term)).slice(0, 5).map((item) => ({ type: "Lesson", title: item.title, detail: item.topicTitle, href: `/learn/${item.topicSlug}#visualizer` }));
    const problems = neetcode250Problems.filter((item) => `${item.title} ${item.topic} ${item.pattern} ${item.id}`.toLowerCase().includes(term)).slice(0, 8).map((item) => ({ type: "Problem", title: item.title, detail: `${item.topic} · ${item.difficulty}`, href: item.leetcodeUrl }));
    return [...topics, ...matchedPatterns, ...lessons, ...problems];
  }, [query]);

  return <div className="space-y-6"><section className="rounded-3xl border border-lime-300/20 bg-slate-900/80 p-6"><p className="text-xs uppercase tracking-[0.2em] text-lime-200">Global search</p><h2 className="mt-2 text-3xl font-semibold text-white">Find the next useful thing.</h2><label className="mt-5 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300"><Search size={18} className="text-lime-200" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try binary, sliding, graph, Two Sum..." className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none" /></label></section>{query && <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5"><p className="text-sm text-slate-500">{results.length} results</p><div className="mt-4 space-y-2">{results.length ? results.map((result, index) => <Link key={`${result.type}-${result.title}-${index}`} href={result.href} target={result.type === "Problem" ? "_blank" : undefined} className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 hover:border-lime-300/40"><div><p className="font-medium text-white">{result.title}</p><p className="mt-1 text-sm text-slate-400">{result.detail}</p></div><span className="text-xs uppercase tracking-[0.14em] text-lime-200">{result.type}</span></Link>) : <p className="py-8 text-center text-slate-400">No content matches that search.</p>}</div></section>}</div>;
}
