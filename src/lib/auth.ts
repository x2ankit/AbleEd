export type AuthListener = (isAuthed: boolean) => void;

const KEY = "ableed:auth";

function getStored(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  return getStored();
}

export function login() {
  try {
    localStorage.setItem(KEY, "1");
  } catch {}
  window.dispatchEvent(new CustomEvent("auth:change", { detail: true }));
}

export function logout() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent("auth:change", { detail: false }));
}

export function onAuthChange(listener: AuthListener) {
  function handler(e: Event) {
    const detail = (e as CustomEvent<boolean>).detail;
    listener(typeof detail === "boolean" ? detail : isAuthenticated());
  }
  window.addEventListener("auth:change", handler as EventListener);
  return () => window.removeEventListener("auth:change", handler as EventListener);
}
