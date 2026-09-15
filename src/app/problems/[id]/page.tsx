import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { PlatformShell } from "@/components/platform-shell";
import { neetcode250Problems } from "@/lib/neetcode250";

export function generateStaticParams() {
  return neetcode250Problems.map((problem) => ({ id: String(problem.id) }));
}

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const problem = neetcode250Problems.find((item) => String(item.id) === id);
  if (!problem) notFound();

  return <PlatformShell title={problem.title}><div className="space-y-6"><section className="rounded-3xl border border-lime-300/20 bg-slate-900/80 p-6"><div className="flex flex-wrap items-center gap-3"><span className="font-mono text-lime-200">#{problem.id}</span><span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">{problem.difficulty}</span><span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">{problem.topic}</span></div><h2 className="mt-4 text-3xl font-semibold text-white">{problem.title}</h2><p className="mt-3 max-w-2xl text-slate-300">Use this page as the learning checkpoint before opening the verified problem statement on LeetCode.</p><a href={problem.leetcodeUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-lime-300 px-4 py-2.5 font-medium text-slate-950">Open on LeetCode <ExternalLink size={16} /></a></section><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><p className="text-xs uppercase tracking-[0.16em] text-sky-300">Topic</p><p className="mt-3 text-lg font-semibold text-white">{problem.topic}</p></div><div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><p className="text-xs uppercase tracking-[0.16em] text-amber-300">Pattern</p><p className="mt-3 text-lg font-semibold text-white">{problem.pattern}</p></div><div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><p className="text-xs uppercase tracking-[0.16em] text-lime-200">Next action</p><p className="mt-3 text-lg font-semibold text-white">Read, solve, tick</p></div></div><section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"><p className="text-xs uppercase tracking-[0.2em] text-sky-300">Solve loop</p><div className="mt-4 grid gap-3 md:grid-cols-4">{["Read the statement", "Write examples", "Name the pattern", "Implement and test"].map((step, index) => <div key={step} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"><span className="font-mono text-sm text-lime-200">0{index + 1}</span><p className="mt-3 text-sm text-slate-300">{step}</p></div>)}</div></section><Link href="/leetcode" className="inline-block text-sm text-lime-200 hover:text-lime-100">← Back to problem library</Link></div></PlatformShell>;
}
