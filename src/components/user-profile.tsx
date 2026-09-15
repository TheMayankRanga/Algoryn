"use client";

import { ChevronDown } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { getInitials, readUserName, subscribeToUserName, userNameStorageKey } from "@/lib/user-name";

export function UserProfileMenu() {
  const name = useSyncExternalStore(subscribeToUserName, readUserName, () => "");
  const [open, setOpen] = useState(false);
  const initials = getInitials(name);

  function logout() {
    window.localStorage.removeItem(userNameStorageKey);
    window.dispatchEvent(new Event("visualizer-lab-user-name"));
    setOpen(false);
  }

  return <div className="relative">
    <button type="button" onClick={() => setOpen((current) => !current)} aria-label="Open profile menu" aria-expanded={open} title={name ? `Profile for ${name}` : "Profile menu"} className="inline-flex items-center gap-2 rounded-lg border border-lime-300/30 bg-lime-300/10 px-2 py-1.5 text-lime-200 transition hover:border-lime-300 hover:bg-lime-300/20"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-300 text-xs font-bold text-slate-950">{initials}</span><ChevronDown size={13} /></button>
    {open && <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-2xl"><div className="border-b border-slate-800 px-3 py-2"><p className="text-sm font-semibold text-lime-200">{initials}</p><p className="mt-1 truncate text-sm text-white">{name || "Learner"}</p></div><button type="button" onClick={logout} className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-900 hover:text-rose-200">Log out</button></div>}
  </div>;
}

export function UserGreeting() {
  const name = useSyncExternalStore(subscribeToUserName, readUserName, () => "");
  if (!name) return null;
  return <p className="mt-3 text-sm font-medium text-lime-200">Welcome back, {name}.</p>;
}
