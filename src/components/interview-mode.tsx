"use client";

import { Clock3, Eye, EyeOff, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const prompts = [
  { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", hint: "Ask what information would let you find the complement in one pass.", approach: "Track values already seen in a map. For each value, check whether target - value exists before storing the current value." },
  { title: "Number of Islands", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/", hint: "Treat each unvisited land cell as the start of one exploration.", approach: "Scan the grid. When land is found, run DFS/BFS to mark its connected component and increment the island count." },
  { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", hint: "The answer is a contiguous range with a validity rule.", approach: "Use a sliding window and move the left boundary past a repeated character while tracking the best length." },
];

export function InterviewMode() {
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const prompt = prompts[index];

  useEffect(() => {
    const timer = setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => clearInterval(timer);
  }, [index]);

  function nextPrompt() {
    setIndex((current) => (current + 1) % prompts.length);
    setSeconds(0);
    setRevealed(false);
  }

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return (
    <section className="rounded-3xl border border-amber-300/20 bg-slate-900/80 p-6">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-start md:justify-between">
        <div><p className="text-xs uppercase tracking-[0.2em] text-amber-300">Interview mode</p><h2 className="mt-2 text-3xl font-semibold text-white">Solve before you reveal</h2><p className="mt-2 text-slate-300">Use the timer, write your approach, then reveal a hint or compare with the approach.</p></div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-amber-200"><Clock3 size={15} /> {minutes}:{remainingSeconds}</div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3"><span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs text-amber-200">{prompt.difficulty}</span><a href={prompt.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-lime-200 hover:text-lime-100">Open problem <ExternalLink size={14} /></a></div>
      <h3 className="mt-4 text-2xl font-semibold text-white">{prompt.title}</h3>
      <textarea placeholder="Write your approach here..." className="mt-5 min-h-32 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-lime-300 focus:outline-none" />
      <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setRevealed((current) => !current)} className="inline-flex items-center gap-2 rounded-lg bg-amber-300 px-3 py-2 text-sm font-medium text-slate-950">{revealed ? <EyeOff size={15} /> : <Eye size={15} />}{revealed ? "Hide approach" : "Reveal hint and approach"}</button><button type="button" onClick={nextPrompt} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-lime-300 hover:text-lime-200">Next prompt</button></div>
      {revealed && <div className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-4"><p className="text-sm font-semibold text-amber-200">Hint</p><p className="mt-2 text-sm text-slate-300">{prompt.hint}</p></div><div className="rounded-xl border border-lime-300/20 bg-lime-300/5 p-4"><p className="text-sm font-semibold text-lime-200">Approach</p><p className="mt-2 text-sm text-slate-300">{prompt.approach}</p></div></div>}
    </section>
  );
}
