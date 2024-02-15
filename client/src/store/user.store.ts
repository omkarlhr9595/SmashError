import { create } from "zustand";
import { devOnlyDevtools as devtools } from "./utils.devtools";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  email: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  picture: string | undefined;
  sub: string | undefined;
  updated_at: string | undefined;
  authToken: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logoutUser: () =>
          set({
            user: null,
          }),
      }),
      {
        name: "user-store",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
