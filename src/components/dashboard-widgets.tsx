'use client';

import { ArrowUpRight, BookOpen, BrainCircuit, ChartColumn, CircleDashed, Target } from "lucide-react";

const analytics = [
  { label: "Solved this week", value: 4, change: "+2 vs last week" },
  { label: "Pattern mastery", value: "82%", change: "+6 points" },
  { label: "Focus time", value: "6.3h", change: "+1.1h" },
];

const bars = [
  { label: "Arrays", value: 88 },
  { label: "Graphs", value: 64 },
  { label: "DP", value: 52 },
  { label: "Trees", value: 77 },
  { label: "Strings", value: 90 },
];

const recommendations = [
  "Finish 3 Sliding Window medium problems",
  "Review graph BFS intuition",
  "Complete one DP warmup lesson",
];

export function DashboardWidgets() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {analytics.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{item.label}</p>
              <ArrowUpRight className="text-cyan-300" size={18} />
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-emerald-300">{item.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Progress</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Topic mastery</h3>
            </div>
            <ChartColumn className="text-violet-300" size={20} />
          </div>

          <div className="space-y-4">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                  <span>{bar.label}</span>
                  <span>{bar.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${bar.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Coach</p>
              <h3 className="mt-1 text-xl font-semibold text-white">What to practice</h3>
            </div>
            <Target className="text-amber-300" size={20} />
          </div>

          <div className="mt-5 space-y-3">
            {recommendations.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-200">
                <CircleDashed className="mt-0.5 flex-shrink-0 text-cyan-300" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="mb-3 flex items-center gap-3">
            <BookOpen className="text-cyan-300" size={18} />
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Recent lessons</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Prefix Sum fundamentals</li>
            <li>• Monotonic stack intuition</li>
            <li>• Tree traversal walkthrough</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="mb-3 flex items-center gap-3">
            <BrainCircuit className="text-violet-300" size={18} />
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Weak areas</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Dynamic Programming</li>
            <li>• Graph shortest paths</li>
            <li>• Sliding Window edge cases</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
