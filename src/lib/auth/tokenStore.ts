import { isBrowser } from "@/lib/utils/env";

const KEY = "bm.auth.token";
const REFRESH_KEY = "bm.auth.refresh";

/** SSR-safe JWT storage. */
export const tokenStore = {
  get(): string | null {
    if (!isBrowser) return null;
    try {
      return window.localStorage.getItem(KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(KEY, token);
    } catch {
      /* ignore */
    }
  },
  clear(): void {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(KEY);
      window.localStorage.removeItem(REFRESH_KEY);
    } catch {
      /* ignore */
    }
  },
  getRefresh(): string | null {
    if (!isBrowser) return null;
    try {
      return window.localStorage.getItem(REFRESH_KEY);
    } catch {
      return null;
    }
  },
  setRefresh(token: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(REFRESH_KEY, token);
    } catch {
      /* ignore */
    }
  },
};
