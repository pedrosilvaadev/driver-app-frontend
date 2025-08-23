import type { Driver } from "@/types/domain";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: Driver | null;
  setToken: (token: string) => void;
  setUser: (user: Driver) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setToken: (token: string) => set({ token }),
      setUser: (user: Driver) => set({ user }),
      clear: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "uride.token",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
