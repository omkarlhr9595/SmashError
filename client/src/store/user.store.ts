import { StateCreator, create } from "zustand";
import { devOnlyDevtools as devtools } from "./utils.devtools";
import { createJSONStorage, persist } from "zustand/middleware";

export enum Role {
  CORE = "Core",
  MEMBER = "Member",
}

interface User {
  email: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  picture: string | undefined;
  sub: string | undefined;
  updated_at: string | undefined;
  roles: Role | undefined;
}

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logoutUser: () => set({ user: null }),
});
