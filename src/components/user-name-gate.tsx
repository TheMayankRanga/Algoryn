"use client";

import { useSyncExternalStore, useState } from "react";
import { getInitials, readUserName, subscribeToUserName, userNameStorageKey } from "@/lib/user-name";

function publishUserName(name: string) {
  window.localStorage.setItem(userNameStorageKey, name);
  window.dispatchEvent(new Event("visualizer-lab-user-name"));
}

export function UserAvatar() {
  const name = useSyncExternalStore(subscribeToUserName, readUserName, () => "");
  return <div aria-label={name ? `Current user: ${name}` : "Current user"} title={name || "Current user"} className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-300/40 bg-lime-300/15 text-sm font-semibold text-lime-200">{getInitials(name)}</div>;
}

export function UserNameGate() {
  const name = useSyncExternalStore(subscribeToUserName, readUserName, () => "");
  const [draft, setDraft] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const isOpen = !name;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = draft.trim().replace(/\s+/g, " ");
    if (cleanName) {
      publishUserName(cleanName);
      setShowWelcome(true);
      window.setTimeout(() => setShowWelcome(false), 2600);
    }
  }

  if (!isOpen && !showWelcome) return null;

  if (showWelcome && !isOpen) return <div className="fixed right-4 top-4 z-[60] rounded-xl border border-lime-300/30 bg-slate-900 px-4 py-3 text-sm font-medium text-lime-200 shadow-xl">Welcome, {name} 👋</div>;

  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-md"><div role="dialog" aria-modal="true" aria-labelledby="user-name-title" className="w-full max-w-md rounded-2xl border border-lime-300/25 bg-slate-900 p-6 shadow-2xl"><p className="text-xs uppercase tracking-[0.2em] text-lime-200">Algoryn</p><h2 id="user-name-title" className="mt-3 text-2xl font-semibold text-white">What should we call you?</h2><p className="mt-2 text-sm text-slate-400">Just your name so we can show a small identifier while you learn.</p><form onSubmit={submit} className="mt-6 space-y-3"><label htmlFor="user-name" className="sr-only">Enter your name</label><input id="user-name" name="name" type="text" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Enter your name" autoComplete="name" autoFocus required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-lime-300" /><button type="submit" disabled={!draft.trim()} className="w-full rounded-xl bg-lime-300 px-4 py-3 font-medium text-slate-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-40">Continue</button></form></div></div>;
}
