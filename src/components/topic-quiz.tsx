"use client";

import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { QuizQuestion } from "@/lib/quiz-data";

export function TopicQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const question = questions[0];
  const answered = selected !== null;

  return <section className="rounded-3xl border border-sky-300/20 bg-slate-900/80 p-6"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-300/15 text-sky-200"><Check size={18} /></div><div><p className="text-xs uppercase tracking-[0.2em] text-sky-300">Knowledge check</p><h3 className="mt-1 text-xl font-semibold text-white">Can you predict the next move?</h3></div></div><p className="mt-5 text-slate-200">{question.question}</p><div className="mt-4 grid gap-2 md:grid-cols-3">{question.options.map((option) => { const correct = option === question.answer; const chosen = option === selected; return <button key={option} type="button" onClick={() => setSelected(option)} className={`rounded-xl border p-3 text-left text-sm transition ${!answered ? "border-slate-700 bg-slate-950 text-slate-300 hover:border-sky-300" : correct ? "border-lime-300/60 bg-lime-300/10 text-lime-200" : chosen ? "border-rose-300/60 bg-rose-300/10 text-rose-200" : "border-slate-800 bg-slate-950 text-slate-500"}`}>{option}</button>; })}</div>{answered && <div className="mt-4 rounded-xl border border-sky-300/20 bg-sky-300/5 p-4 text-sm"><p className="font-semibold text-sky-200">{selected === question.answer ? "Correct." : "Not quite."}</p><p className="mt-1 text-slate-300">{question.explanation}</p></div>}<button type="button" onClick={() => setSelected(null)} className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><RotateCcw size={14} /> Try again</button></section>;
}
