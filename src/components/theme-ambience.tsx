"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("visualizer-lab-theme", onChange);
  return () => window.removeEventListener("visualizer-lab-theme", onChange);
}

function getTheme() {
  if (typeof document === "undefined") return "";
  return document.documentElement.classList.contains("theme-blossom") ? "blossom" : "";
}

export function ThemeAmbience() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "");
  if (theme !== "blossom") return null;

  return <div className="blossom-scene" aria-hidden="true"><div className="blossom-tree"><span className="tree-trunk" /><span className="tree-crown tree-crown-one" /><span className="tree-crown tree-crown-two" /><span className="tree-crown tree-crown-three" /></div>{Array.from({ length: 14 }, (_, index) => <span key={index} className={`falling-leaf falling-leaf-${index + 1}`}>✦</span>)}</div>;
}
