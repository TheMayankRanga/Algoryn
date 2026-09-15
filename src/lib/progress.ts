export const progressStorageKey = "visualizer-lab-solved-problems";

export function subscribeToProgress(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("visualizer-lab-progress", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("visualizer-lab-progress", onChange);
  };
}

export function readProgress() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(progressStorageKey) ?? "";
}
