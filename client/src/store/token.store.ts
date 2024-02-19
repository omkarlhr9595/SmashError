import { StateCreator } from "zustand";

export interface TokenSlice {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const createTokenSlice: StateCreator<TokenSlice> = (set) => ({
  token: null,
  setToken: (token: string) => set({ token: token }),
  removeToken: () => set({ token: null }),
});
