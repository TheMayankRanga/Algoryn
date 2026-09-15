'use client';

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { lessonLibrary } from "@/lib/content";

export function LessonLibrary() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const topics = ["All topics", ...Array.from(new Set(lessonLibrary.map((lesson) => lesson.topicTitle)))];
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return lessonLibrary.filter((lesson) => {
      const topicMatches = topic === "All topics" || lesson.topicTitle === topic;
      const queryMatches = !term || `${lesson.title} ${lesson.summary} ${lesson.format}`.toLowerCase().includes(term);
      return topicMatches && queryMatches;
    });
  }, [query, topic]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Lesson library</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{lessonLibrary.length}+ guided lessons</h3>
          <p className="mt-2 text-sm text-slate-300">Search by format, topic, or learning mode. Every result opens the relevant topic lesson and visualizer.</p>
        </div>
        <label className="flex min-w-64 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-300">
          <Search size={16} className="text-cyan-300" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 520 lessons" className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none" />
        </label>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {topics.map((item) => (
          <button key={item} type="button" onClick={() => setTopic(item)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${topic === item ? "bg-emerald-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:border-emerald-400/50"}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.slice(0, 24).map((lesson, index) => (
          <Link key={lesson.id} href={`/learn/${lesson.topicSlug}#visualizer`} className={`group rounded-2xl border border-slate-800 bg-slate-950/70 p-4 ${index % 3 === 0 ? "motion-float" : index % 3 === 1 ? "motion-pulse" : "motion-shimmer"}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-[0.14em] text-emerald-300">{lesson.format}</span>
              <span className="text-xs text-slate-500">{lesson.difficulty}</span>
            </div>
            <h4 className="mt-3 font-medium text-white group-hover:text-emerald-200">{lesson.title}</h4>
            <p className="mt-2 text-sm leading-5 text-slate-400">{lesson.summary}</p>
          </Link>
        ))}
      </div>
      <p className="mt-5 text-xs text-slate-500">Showing {Math.min(filtered.length, 24)} of {filtered.length} matching lessons.</p>
    </section>
  );
}
