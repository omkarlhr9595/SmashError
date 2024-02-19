import { create } from "zustand";
import { devOnlyDevtools as devtools } from "./utils.devtools";
import { createJSONStorage, persist } from "zustand/middleware";

interface Token {
  access_token: string;
}

interface TokenStore {
  token: Token | null;
  setToken: (token: Token) => void;
  logoutToken: () => void;
}

export const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token) => set({ token }),
        logoutToken: () =>
          set({
            token: null,
          }),
      }),
      {
        name: "token-store",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
