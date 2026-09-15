export const userNameStorageKey = "visualizer-lab-user-name";

export function subscribeToUserName(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("visualizer-lab-user-name", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("visualizer-lab-user-name", onChange);
  };
}

export function readUserName() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(userNameStorageKey) ?? "";
}

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
