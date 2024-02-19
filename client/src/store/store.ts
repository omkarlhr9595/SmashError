import { create } from "zustand";
import { TokenSlice, createTokenSlice } from "./token.store";
import { UserSlice, createUserSlice } from "./user.store";
import { devOnlyDevtools as devtools } from "./utils.devtools";
import { createJSONStorage, persist } from "zustand/middleware";
export const useStore = create<TokenSlice & UserSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createTokenSlice(...a),
        ...createUserSlice(...a),
      }),
      {
        name: "use-store",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
