import { StateCreator } from "zustand";

export interface TokenSlice {
  token: {
    access_token: string | null;
  };
  setToken: (token: { access_token: string }) => void;
  removeToken: () => void;
}

export const createTokenSlice: StateCreator<TokenSlice> = (set) => ({
  token: {
    access_token: null,
  },
  setToken: (token) => set({ token }),
  removeToken: () =>
    set({
      token: {
        access_token: null,
      },
    }),
});
