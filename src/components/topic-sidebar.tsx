import Link from "next/link";
import { curriculum } from "@/lib/content";

const groups = [
  { label: "FOUNDATIONS", slugs: ["big-o-complexity"] },
  { label: "DATA STRUCTURES", slugs: ["arrays-strings", "linked-lists", "stacks-queues", "trees-heaps", "graphs"] },
  { label: "ALGORITHMS", slugs: ["recursion-backtracking", "dynamic-programming", "greedy-intervals"] },
  { label: "ADVANCED", slugs: ["trie-segment-tree"] },
];

export function TopicSidebar({ activeSlug }: { activeSlug: string }) {
  return <aside className="hidden lg:block"><div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto border-r border-slate-800 pr-5"><p className="mb-4 text-xs font-semibold tracking-[0.18em] text-slate-500">DSA COURSE</p>{groups.map((group) => <div key={group.label} className="mb-6"><p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-slate-600">{group.label}</p><nav className="space-y-1">{group.slugs.map((slug) => { const topic = curriculum.find((item) => item.slug === slug); if (!topic) return null; const active = slug === activeSlug; return <Link key={slug} href={`/learn/${slug}`} className={`block border-l-2 px-3 py-2 text-sm transition ${active ? "border-lime-300 bg-lime-300/10 font-medium text-lime-200" : "border-transparent text-slate-400 hover:border-slate-600 hover:text-slate-200"}`}>{topic.title}</Link>; })}</nav></div>)}</div></aside>;
}
