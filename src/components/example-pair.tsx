"use client";

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";
import type { LearningExample } from "@/lib/content";

export function ExamplePair({ examples, eyebrow = "Step-by-step examples" }: { examples: LearningExample[]; eyebrow?: string }) {
  const [steps, setSteps] = useState<number[]>(() => examples.map(() => 0));
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    if (playing === null) return;
    const timer = setInterval(() => {
      setSteps((current) => current.map((step, index) => index === playing ? Math.min(2, step + 1) : step));
    }, 1100);
    return () => clearInterval(timer);
  }, [playing]);

  function move(exampleIndex: number, direction: number) {
    setSteps((current) => current.map((step, index) => index === exampleIndex ? Math.max(0, Math.min(2, step + direction)) : step));
  }

  function reset(exampleIndex: number) {
    setPlaying(null);
    setSteps((current) => current.map((step, index) => index === exampleIndex ? 0 : step));
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">{eyebrow}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">See what happens now and what happens next</h3>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        {examples.map((example, exampleIndex) => {
          const step = steps[exampleIndex];
          const stepContent = [
            { label: "Observe", title: "What is in front of us?", text: `Start with ${example.input}. Identify the values, boundaries, and rule we need to preserve.` },
            { label: "Act", title: "What happens in this step?", text: example.currentStep },
            { label: "Advance", title: "What happens next?", text: `${example.nextStep} ${example.result}` },
          ][step];

          return (
          <article key={example.title} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${example.label === "Even example" ? "bg-cyan-500/15 text-cyan-200" : "bg-violet-500/15 text-violet-200"}`}>{example.label}</span>
              <span className="text-xs text-slate-500">Easy walkthrough</span>
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">{example.title}</h4>
            <p className="mt-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-sm text-cyan-200">Input: {example.input}</p>
            <div className="mt-5 flex items-center gap-2" aria-label={`Step ${step + 1} of 3`}>
              {["Observe", "Act", "Advance"].map((label, index) => <span key={label} className={`flex-1 border-t-2 pt-2 text-[10px] uppercase tracking-[0.16em] ${index <= step ? "border-lime-300 text-lime-200" : "border-slate-700 text-slate-500"}`}>{index + 1}. {label}</span>)}
            </div>
            <div className="mt-4 min-h-24 border-l-2 border-lime-300 pl-3 text-sm">
              <p className="font-semibold text-lime-300">{stepContent.title}</p>
              <p className="mt-1 text-slate-300">{stepContent.text}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-800 pt-4">
              <span className="text-xs text-slate-500">Step {step + 1} of 3</span>
              <div className="flex gap-1.5">
                <button type="button" onClick={() => move(exampleIndex, -1)} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-lime-300 hover:text-lime-200" aria-label="Previous example step" title="Previous step"><SkipBack size={14} /></button>
                <button type="button" onClick={() => setPlaying(playing === exampleIndex ? null : exampleIndex)} className="rounded-lg border border-lime-400/50 bg-lime-400/10 p-2 text-lime-200" aria-label={playing === exampleIndex ? "Pause example" : "Play example"} title={playing === exampleIndex ? "Pause example" : "Play example"}>{playing === exampleIndex ? <Pause size={14} /> : <Play size={14} />}</button>
                <button type="button" onClick={() => move(exampleIndex, 1)} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-lime-300 hover:text-lime-200" aria-label="Next example step" title="Next step"><SkipForward size={14} /></button>
                <button type="button" onClick={() => reset(exampleIndex)} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-lime-300 hover:text-lime-200" aria-label="Reset example" title="Reset example"><RotateCcw size={14} /></button>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
