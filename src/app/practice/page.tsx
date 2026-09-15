import Link from "next/link";
import { BookOpenCheck, BrainCircuit, Code2, Target } from "lucide-react";
import { PlatformShell } from "@/components/platform-shell";

const practiceTracks = [
  { title: "Problem library", text: "Filter 250 questions by topic, pattern, and difficulty.", href: "/leetcode", icon: Target },
  { title: "Pattern trainer", text: "Practice recognizing the right approach before coding.", href: "/patterns", icon: BrainCircuit },
  { title: "Visual drills", text: "Run algorithms one step at a time and inspect state changes.", href: "/visualizers", icon: Code2 },
  { title: "Lesson review", text: "Revisit explanations, examples, mistakes, and complexity.", href: "/learn", icon: BookOpenCheck },
];

export default function PracticePage() {
  return <PlatformShell title="Practice"><div className="space-y-8"><section className="rounded-3xl border border-lime-300/20 bg-slate-900/80 p-6"><p className="text-xs uppercase tracking-[0.2em] text-lime-200">Practice studio</p><h2 className="mt-2 text-3xl font-semibold text-white">Turn understanding into repetition.</h2><p className="mt-3 max-w-2xl text-slate-300">Choose a focused practice loop: recognize a pattern, watch it execute, then solve a real problem and tick it complete.</p></section><div className="grid gap-4 md:grid-cols-2">{practiceTracks.map(({ title, text, href, icon: Icon }) => <Link key={title} href={href} className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-lime-300/40"><Icon className="text-lime-200" size={21} /><h3 className="mt-5 text-xl font-semibold text-white group-hover:text-lime-200">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p><span className="mt-5 inline-block text-sm text-lime-200">Open track →</span></Link>)}</div></div></PlatformShell>;
}
