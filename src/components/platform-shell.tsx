import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, Code2, Compass, LayoutDashboard, Search, Target } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNameGate } from "@/components/user-name-gate";
import { UserProfileMenu } from "@/components/user-profile";

const navItems = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/patterns", label: "Patterns", icon: BrainCircuit },
  { href: "/visualizers", label: "Visualizers", icon: Code2 },
  { href: "/practice", label: "Practice", icon: Target },
  { href: "/interview", label: "Interview", icon: Target },
  { href: "/roadmap", label: "Roadmap", icon: LayoutDashboard },
  { href: "/progress", label: "Progress", icon: LayoutDashboard },
  { href: "/cheatsheets", label: "Cheat Sheets", icon: BookOpen },
  { href: "/leetcode", label: "LeetCode", icon: Search },
  { href: "/search", label: "Search", icon: Search },
];

export function PlatformShell({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="relative z-10 min-h-screen bg-slate-950 text-slate-100 page-reveal">
      <UserNameGate />
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="glass-surface hidden min-h-screen w-72 border-r border-slate-800 bg-slate-950/90 p-6 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
              <Code2 size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">DSA</p>
              <h2 className="text-lg font-semibold text-white">Algoryn</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-500/50 hover:bg-slate-900 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} className="text-cyan-300" />
                  {label}
                </span>
                <ArrowRight size={14} className="opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">This week</p>
            <p className="mt-2 text-lg font-semibold text-white">Sliding Window Sprint</p>
            <p className="mt-2 text-sm text-slate-300">Three guided lessons, one drill set, and two interview prompts.</p>
          </div>
        </aside>

        <main className="flex-1">
          <header className="glass-surface sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Interactive DSA learning</p>
                <h1 className="mt-1 text-xl font-semibold text-white md:text-2xl">{title}</h1>
              </div>
              <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
                {navItems.filter(({ href }) => href !== "/").slice(0, 6).map(({ href, label }) => (
                  <Link key={href} href={href} className="border-b-2 border-transparent px-3 py-2 text-sm text-slate-400 transition hover:border-lime-300 hover:text-lime-200">{label}</Link>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <UserProfileMenu />
                <ThemeToggle />
                <div className="hidden items-center gap-3 md:flex">
                <Link href="/leetcode" className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">Daily Challenge</Link>
                <Link href="/learn" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300">Start Learning</Link>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 bg-slate-950/95 px-4 py-3 lg:hidden">
              <nav className="flex gap-2 overflow-x-auto pb-1">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200"
                  >
                    <Icon size={14} className="text-cyan-300" />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <div className="page-reveal mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>

          <footer className="glass-surface border-t border-slate-800 bg-slate-950/80">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <p>Algoryn © 2026</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/learn" className="hover:text-white">Learn</Link>
                <Link href="/visualizers" className="hover:text-white">Visualizers</Link>
                <Link href="/leetcode" className="hover:text-white">LeetCode</Link>
                <Link href="/practice" className="hover:text-white">Practice</Link>
                <Link href="/progress" className="hover:text-white">Progress</Link>
                <Link href="/search" className="hover:text-white">Search</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
