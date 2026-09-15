"use client";

import { Code2, Lightbulb, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const tips = [
  { title: "Name the state", text: "Before writing DP, explain what dp[i] means in one sentence. If the sentence is fuzzy, the transition will be fuzzy too." },
  { title: "Shrink the search space", text: "Two pointers, binary search, and sliding windows are all ways to stop doing work that cannot change the answer." },
  { title: "Draw the pointer move", text: "For linked lists, write prev, current, and next above the nodes. One small drawing often beats ten minutes of staring at code." },
  { title: "Prove the greedy choice", text: "Ask whether a counterexample can break your local choice. If it can, greedy is probably not the right tool." },
  { title: "Track the invariant", text: "A good loop has a promise that stays true after every iteration. Write that promise in plain language." },
  { title: "Count before optimizing", text: "Estimate the work first. A simple O(n) scan is usually better than a complicated optimization you cannot verify." },
];

const jokes = [
  "Why did the array break up with the linked list? It needed more random access.",
  "A stack walks into a bar. The last call is the first one it forgets.",
  "Why was the developer calm during the graph interview? They knew every problem had a path.",
  "I told my recursion a joke. It went over and over until it finally got the base case.",
  "Dynamic programming is just remembering what you already solved, which is also how I survive meetings.",
  "The binary search engineer only tells half the story, but somehow finds the answer faster.",
];

export function DailyPulse() {
  const [index, setIndex] = useState(0);
  const [showJoke, setShowJoke] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % tips.length);
      setShowJoke((current) => !current);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  function shuffle() {
    setIndex((current) => (current + 1) % tips.length);
    setShowJoke((current) => !current);
  }

  const tip = tips[index];
  const joke = jokes[index];

  return (
    <section className="glass-surface rounded-3xl border border-lime-300/20 p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/15 text-lime-200">
            {showJoke ? <Code2 size={19} /> : <Lightbulb size={19} />}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-lime-200">Daily lab pulse</p>
            <p className="mt-1 text-sm text-slate-400">A new idea every few seconds</p>
          </div>
        </div>
        <button type="button" onClick={shuffle} className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-lime-300 hover:text-lime-200">
          <RefreshCw size={15} /> Shuffle
        </button>
      </div>
      <div key={`${index}-${showJoke}`} className="mt-5 animate-pulse-in">
        {showJoke ? (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-sky-300">Tech joke</p>
            <p className="mt-2 max-w-3xl text-xl font-medium leading-8 text-white">“{joke}”</p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-amber-300">Tip #{index + 1} · {tip.title}</p>
            <p className="mt-2 max-w-3xl text-lg leading-8 text-slate-200">{tip.text}</p>
          </>
        )}
      </div>
      <div className="mt-5 flex gap-1.5" aria-label="Daily pulse progress">
        {tips.map((item, itemIndex) => <span key={item.title} className={`h-1.5 flex-1 rounded-full transition-colors ${itemIndex === index ? "bg-lime-300" : "bg-slate-700"}`} />)}
      </div>
    </section>
  );
}
