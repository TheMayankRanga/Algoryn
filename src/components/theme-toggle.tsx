"use client";

import { ChevronDown, Moon, Palette, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_KEY = "visualizer-lab-theme";
type ThemeName = "graphite" | "light" | "blossom";

const themes: { id: ThemeName; label: string; detail: string }[] = [
  { id: "graphite", label: "Graphite Dark", detail: "Focused dark workspace" },
  { id: "blossom", label: "Blossom Grove", detail: "Tree canopy and falling leaves" },
  { id: "light", label: "Paper White", detail: "Bright, ink-first reference mode" },
];

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  ["theme-light", "theme-blossom"].forEach((name) => root.classList.remove(name));
  if (theme === "light") root.classList.add("theme-light");
  if (theme === "blossom") root.classList.add("theme-blossom");
  root.style.colorScheme = theme === "light" || theme === "blossom" ? "light" : "dark";
  window.localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new Event("visualizer-lab-theme"));
}

export function ThemeToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY) as ThemeName | null;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(savedTheme === "blossom" ? "blossom" : savedTheme === "light" ? "light" : (prefersLight ? "light" : "graphite"));
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("theme-light") ? "graphite" : "light";
    applyTheme(nextTheme);
  }

  return <div className="relative">
    <div className="flex items-center gap-1">
      <button type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme" title="Toggle light and dark theme" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-lime-300 hover:text-lime-200"><Sun size={16} className="theme-dark-icon" /><Moon size={16} className="theme-light-icon hidden" /></button>
      <button type="button" onClick={() => setOpen((current) => !current)} aria-label="Choose visual theme" aria-expanded={open} title="Choose visual theme" className="inline-flex h-9 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-lime-300 hover:text-lime-200"><Palette size={14} /><ChevronDown size={12} /></button>
    </div>
    {open && <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-2xl">
      <p className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">Choose a study mood</p>
      {themes.map((theme) => <button key={theme.id} type="button" onClick={() => { applyTheme(theme.id); setOpen(false); }} className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-slate-900"><span className={`mt-1 h-2.5 w-2.5 rounded-full theme-swatch-${theme.id}`} /><span><span className="block text-sm text-slate-200">{theme.label}</span><span className="block text-xs text-slate-500">{theme.detail}</span></span></button>)}
    </div>}
  </div>;
}
