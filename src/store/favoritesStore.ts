import { create } from "zustand";

type FavoritesStore = {
  favorites: string[];
  setFavorites: (ids: string[]) => void;
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
  setFavorites: (ids) => set({ favorites: ids }),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
}));
