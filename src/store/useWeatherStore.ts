import { AppState } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lastCity: "Minsk",
      setLastCity: (city) => set({ lastCity: city }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
