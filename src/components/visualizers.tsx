'use client';

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw, SkipBack, SkipForward } from "lucide-react";

const createRandomArray = (size = 9) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 24) + 5);

export function SortingVisualizer() {
  const [values, setValues] = useState<number[]>(() => [12, 7, 18, 5, 9, 3, 15, 11, 8]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const bubbleSortSteps = useMemo(() => {
    const arr = [...values];
    const steps: { values: number[]; compared: number[]; swapped: boolean }[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps.push({ values: [...arr], compared: [j, j + 1], swapped: false });
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({ values: [...arr], compared: [j, j + 1], swapped: true });
        }
      }
    }
    return steps;
  }, [values]);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStep((current) => (current + 1) % (bubbleSortSteps.length || 1));
    }, 500);
    return () => clearInterval(timer);
  }, [playing, bubbleSortSteps.length]);

  const current = bubbleSortSteps[step] ?? { values, compared: [], swapped: false };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Bubble sort preview</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Sorting Visualizer</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPlaying((v) => !v)} className="rounded-full bg-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950">
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={() => setValues(createRandomArray())} className="rounded-full border border-slate-700 px-3 py-1.5 text-sm text-slate-200">
            Randomize
          </button>
        </div>
      </div>

      <div className="mt-6 flex h-52 items-end gap-2">
        {current.values.map((value, index) => {
          const highlight = current.compared.includes(index);
          return (
            <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-2">
              <div
                className={`w-full rounded-t-xl transition-all ${highlight ? "bg-cyan-400" : current.swapped ? "bg-emerald-400" : "bg-slate-600"}`}
                style={{ height: `${value * 8}px` }}
              />
              <span className="text-xs text-slate-400">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
        <span>Step {Math.min(step + 1, bubbleSortSteps.length || 1)}/{bubbleSortSteps.length || 1}</span>
        <div className="flex gap-2">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-full border border-slate-700 p-2"><SkipBack size={14} /></button>
          <button onClick={() => setStep((s) => Math.min(bubbleSortSteps.length - 1, s + 1))} className="rounded-full border border-slate-700 p-2"><SkipForward size={14} /></button>
          <button onClick={() => { setStep(0); setPlaying(false); }} className="rounded-full border border-slate-700 p-2"><RotateCcw size={14} /></button>
        </div>
      </div>
    </div>
  );
}

export function BinarySearchVisualizer() {
  const values = [2, 4, 7, 11, 18, 23, 29, 34, 41, 51];
  const target = 29;
  const [midIndex, setMidIndex] = useState(4);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Search preview</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Binary Search</h3>
        </div>
        <span className="rounded-full border border-violet-500/40 bg-violet-500/10 px-2 py-1 text-xs text-violet-200">Target = {target}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {values.map((value, index) => {
          const isMid = index === midIndex;
          const isLow = index < midIndex;
          const isHigh = index > midIndex;
          return (
            <div
              key={value}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-medium ${
                isMid
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                  : isLow
                    ? "border-slate-700 bg-slate-700 text-slate-300"
                    : isHigh
                      ? "border-slate-700 bg-slate-800 text-slate-400"
                      : "border-slate-700 bg-slate-900 text-slate-200"
              }`}
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-300">
        <span>Current midpoint: {values[midIndex]}</span>
        <button onClick={() => setMidIndex((current) => (current + 1) % values.length)} className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-3 py-1.5 font-medium text-slate-950">
          Next step <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function PatternTrainer() {
  const questions = [
    {
      prompt: "Find the longest substring with at most K distinct characters.",
      options: ["Binary Search", "Sliding Window", "DFS", "Greedy"],
      answer: "Sliding Window",
      reason: "The constraint is a moving window over a string, and we track a continuously maintained count of characters.",
    },
    {
      prompt: "Determine whether a path exists from start to end in a graph.",
      options: ["Two Pointers", "BFS", "Recursion", "Monotonic Queue"],
      answer: "BFS",
      reason: "Graph exploration with shortest path or reachability checks naturally fits breadth-first traversal.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const current = questions[index];

  const onAnswer = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Pattern trainer</p>
      <h3 className="mt-2 text-xl font-semibold text-white">Which Pattern Is This?</h3>
      <p className="mt-4 text-slate-300">{current.prompt}</p>

      <div className="mt-5 space-y-2">
        {current.options.map((option) => {
          const correct = option === current.answer;
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition ${
                selected === null
                  ? "border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-500/50"
                  : correct
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                    : isSelected
                      ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                      : "border-slate-700 bg-slate-950 text-slate-300"
              }`}
            >
              <span>{option}</span>
              {selected && correct && <span>✓</span>}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-100">
          <p className="font-medium">{selected === current.answer ? "Correct" : "Not quite"}</p>
          <p className="mt-1 text-cyan-50/90">{current.reason}</p>
        </div>
      )}

      <button
        onClick={() => {
          setSelected(null);
          setIndex((prev) => (prev + 1) % questions.length);
        }}
        className="mt-5 rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-medium text-slate-200"
      >
        Next Question
      </button>
    </div>
  );
}

export function DataPoints() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Visuals</p>
        <p className="mt-2 text-3xl font-bold text-white">14+</p>
        <p className="mt-2 text-sm text-slate-300">Core algorithm simulators built to animate the exact step-by-step logic.</p>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Lessons</p>
        <p className="mt-2 text-3xl font-bold text-white">120+</p>
        <p className="mt-2 text-sm text-slate-300">Beginner-friendly concept breakdowns with examples, code, tips, and common mistakes.</p>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Practice</p>
        <p className="mt-2 text-3xl font-bold text-white">3x</p>
        <p className="mt-2 text-sm text-slate-300">Progression from concept review to pattern recognition, interview playbooks, and problem solving.</p>
      </div>
    </div>
  );
}

const topicVisuals = {
  "big-o-complexity": {
    label: "Growth map",
    title: "Watch input size change the work",
    caption: "Linear work grows steadily while quadratic work accelerates as n increases.",
    steps: ["n = 4", "n = 8", "n = 12", "n = 16"],
  },
  "arrays-strings": {
    label: "Two pointers",
    title: "Move across an array without rescanning",
    caption: "The left and right pointers close in while the active window stays visible.",
    steps: ["Compare ends", "Move left", "Move right", "Pointers meet"],
  },
  "linked-lists": {
    label: "Pointer rewiring",
    title: "Reverse links one node at a time",
    caption: "The saved next pointer protects the rest of the list while each link flips direction.",
    steps: ["Save next", "Reverse 4", "Reverse 7", "Reverse 9"],
  },
  "stacks-queues": {
    label: "Order rules",
    title: "See LIFO and FIFO in the same frame",
    caption: "A stack removes from the top; a queue removes from the front.",
    steps: ["Start empty", "Push / enqueue", "Push / enqueue", "Pop / dequeue"],
  },
  "trees-heaps": {
    label: "Hierarchy",
    title: "Traverse a tree and preserve heap order",
    caption: "The highlighted node is the next decision point in an inorder traversal.",
    steps: ["Visit 10", "Visit 5", "Visit 3", "Visit 7"],
  },
  graphs: {
    label: "Breadth-first search",
    title: "Expand through connected nodes",
    caption: "The frontier grows one layer at a time while visited nodes stay marked.",
    steps: ["Start A", "Visit B", "Visit C", "Visit D"],
  },
  "recursion-backtracking": {
    label: "Decision tree",
    title: "Choose, explore, and undo",
    caption: "Backtracking keeps the active path bright and restores it before trying another branch.",
    steps: ["Choose 1", "Choose 2", "Undo 2", "Choose 3"],
  },
  "dynamic-programming": {
    label: "State table",
    title: "Reuse answers from smaller states",
    caption: "Each highlighted cell is computed from values that are already known.",
    steps: ["Base states", "Fill 1", "Fill 2", "Optimal state"],
  },
  "greedy-intervals": {
    label: "Interval selection",
    title: "Keep the earliest finishing choice",
    caption: "Sorting by end time leaves the most room for the next compatible interval.",
    steps: ["Sort ends", "Take A", "Skip B", "Take C"],
  },
  "trie-segment-tree": {
    label: "Prefix and range queries",
    title: "Route a query through structured storage",
    caption: "The active path shows how a prefix or range avoids scanning every value.",
    steps: ["Start root", "Match prefix", "Narrow branch", "Return result"],
  },
} as const;

type TopicSlug = keyof typeof topicVisuals;

function TopicScene({ slug, step }: { slug: TopicSlug; step: number }) {
  if (slug === "big-o-complexity") {
    const size = [4, 8, 12, 16][step];
    return (
      <div className="flex h-52 items-end gap-3">
        {[{ name: "O(n)", value: size }, { name: "O(n²)", value: Math.max(4, Math.round(size * size / 8)) }].map((bar) => (
          <div key={bar.name} className="flex flex-1 flex-col items-center gap-2">
            <div className="w-full rounded-t-xl bg-cyan-400 transition-all" style={{ height: `${bar.value * 8}px` }} />
            <span className="text-xs text-slate-300">{bar.name}</span>
          </div>
        ))}
      </div>
    );
  }

  if (slug === "arrays-strings") {
    const active = [0, 1, 2, 4][step];
    return <div className="flex flex-wrap justify-center gap-2">{[3, 1, 4, 1, 5].map((value, index) => <div key={`${value}-${index}`} className={`flex h-14 w-14 items-center justify-center rounded-xl border text-lg font-semibold ${index === active || index === 4 - active ? "border-cyan-400 bg-cyan-500/20 text-cyan-200" : "border-slate-700 bg-slate-950 text-slate-300"}`}>{value}</div>)}</div>;
  }

  if (slug === "linked-lists") {
    const values = [4, 7, 9];
    return <div className="flex flex-wrap items-center justify-center gap-2">{values.map((value, index) => <span key={value} className="flex items-center gap-2"><span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${index <= step - 1 ? "border-emerald-400 bg-emerald-500/15 text-emerald-200" : "border-slate-700 bg-slate-950 text-slate-300"}`}>{value}</span>{index < values.length - 1 && <ArrowRight size={16} className={index < step ? "rotate-180 text-emerald-300" : "text-slate-500"} />}</span>)}</div>;
  }

  if (slug === "stacks-queues") {
    const items = ["1", "2", "3"];
    return <div className="grid grid-cols-2 gap-5"><div className="flex min-h-36 flex-col-reverse justify-start gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-3">{items.slice(0, Math.min(step + 1, 3)).map((item) => <span key={item} className="rounded-lg bg-violet-400/30 p-2 text-center text-violet-100">Stack {item}</span>)}</div><div className="flex min-h-36 items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3">{items.slice(Math.max(0, step - 1), 3).map((item) => <span key={item} className="rounded-lg bg-amber-400/30 p-2 text-amber-100">Queue {item}</span>)}</div></div>;
  }

  if (slug === "trees-heaps") {
    return <div className="flex flex-col items-center gap-3"><span className={`flex h-12 w-12 items-center justify-center rounded-full border ${step === 0 ? "border-cyan-400 bg-cyan-500/20" : "border-slate-700 bg-slate-950"}`}>10</span><div className="h-5 w-px bg-slate-600" /><div className="flex gap-10"><span className={`flex h-12 w-12 items-center justify-center rounded-full border ${step === 1 || step === 2 ? "border-cyan-400 bg-cyan-500/20" : "border-slate-700 bg-slate-950"}`}>5</span><span className={`flex h-12 w-12 items-center justify-center rounded-full border ${step === 3 ? "border-cyan-400 bg-cyan-500/20" : "border-slate-700 bg-slate-950"}`}>15</span></div></div>;
  }

  if (slug === "graphs") {
    return <div className="flex items-center justify-center gap-2">{["A", "B", "C", "D"].map((node, index) => <span key={node} className="flex items-center gap-2"><span className={`flex h-12 w-12 items-center justify-center rounded-full border ${index <= step ? "border-emerald-400 bg-emerald-500/20 text-emerald-200" : "border-slate-700 bg-slate-950 text-slate-300"}`}>{node}</span>{index < 3 && <span className={`h-px w-8 ${index < step ? "bg-emerald-400" : "bg-slate-700"}`} />}</span>)}</div>;
  }

  if (slug === "recursion-backtracking") {
    return <div className="flex flex-col items-center gap-3"><span className="rounded-xl border border-cyan-400 bg-cyan-500/20 px-4 py-2">start</span><div className="flex gap-4"><span className={`rounded-xl border px-4 py-2 ${step === 0 || step === 1 ? "border-cyan-400 bg-cyan-500/20" : "border-slate-700 bg-slate-950"}`}>choose 1</span><span className={`rounded-xl border px-4 py-2 ${step >= 2 ? "border-emerald-400 bg-emerald-500/20" : "border-slate-700 bg-slate-950"}`}>choose 2</span><span className={`rounded-xl border px-4 py-2 ${step === 3 ? "border-cyan-400 bg-cyan-500/20" : "border-slate-700 bg-slate-950"}`}>choose 3</span></div></div>;
  }

  if (slug === "dynamic-programming") {
    return <div className="grid grid-cols-4 gap-2">{Array.from({ length: 12 }, (_, index) => <span key={index} className={`flex h-12 items-center justify-center rounded-lg border text-sm ${index <= step * 3 ? "border-emerald-400 bg-emerald-500/20 text-emerald-200" : "border-slate-700 bg-slate-950 text-slate-500"}`}>{index <= step * 3 ? index + 1 : "?"}</span>)}</div>;
  }

  if (slug === "greedy-intervals") {
    return <div className="space-y-3">{[["A", 18], ["B", 42], ["C", 68]].map(([label, start], index) => <div key={label} className="flex items-center gap-3"><span className="w-5 text-xs text-slate-400">{label}</span><div className={`h-8 rounded-lg transition-all ${index === 1 && step >= 2 ? "bg-slate-700" : index <= step ? "bg-amber-400" : "bg-slate-600"}`} style={{ marginLeft: `${Number(start) / 3}px`, width: `${52 + index * 12}px` }} /></div>)}</div>;
  }

  return <div className="flex items-center justify-center gap-3"><div className="grid grid-cols-2 gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3"><span className="col-span-2 rounded-lg bg-cyan-400/30 p-2 text-center">root</span><span className={`rounded-lg p-2 ${step >= 1 ? "bg-cyan-400/40" : "bg-slate-800"}`}>a</span><span className="rounded-lg bg-slate-800 p-2">b</span></div><ArrowRight className="text-cyan-300" /><span className="rounded-xl border border-emerald-400 bg-emerald-500/20 px-4 py-3 text-emerald-200">result</span></div>;
}

export function TopicVisualizer({ slug }: { slug: string }) {
  const topic = topicVisuals[slug as TopicSlug];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || !topic) return;
    const timer = setInterval(() => setStep((current) => (current + 1) % topic.steps.length), 850);
    return () => clearInterval(timer);
  }, [playing, topic]);

  if (!topic) return null;

  return (
    <section className="rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Interactive visualizer · {topic.label}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{topic.title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">{topic.caption}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => setPlaying((current) => !current)} className="rounded-full bg-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950">{playing ? "Pause" : "Play"}</button>
          <button onClick={() => { setStep(0); setPlaying(false); }} className="rounded-full border border-slate-700 p-2 text-slate-200" aria-label="Reset visualizer" title="Reset visualizer"><RotateCcw size={15} /></button>
        </div>
      </div>
      <div className="mt-6 flex min-h-56 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
        <div className="w-full"><TopicScene slug={slug as TopicSlug} step={step} /></div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-300">
        <span>Step {step + 1}/{topic.steps.length}: {topic.steps[step]}</span>
        <div className="flex gap-2">
          <button onClick={() => setStep((current) => Math.max(0, current - 1))} className="rounded-full border border-slate-700 p-2" aria-label="Previous step" title="Previous step"><SkipBack size={14} /></button>
          <button onClick={() => setStep((current) => Math.min(topic.steps.length - 1, current + 1))} className="rounded-full border border-slate-700 p-2" aria-label="Next step" title="Next step"><SkipForward size={14} /></button>
        </div>
      </div>
    </section>
  );
}
