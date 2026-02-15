import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppState {
  lastCity: string; // Твой город (Минск/Солигорск)
  favorites: string[]; // Список монеток или городов в будущем
  setLastCity: (city: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lastCity: "Minsk", // По умолчанию всегда Минск
      favorites: [],

      // Функция смены города
      setLastCity: (city) => set({ lastCity: city }),

      // Функция лайков (на будущее)
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "app-storage", // Имя файла в памяти телефона
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
