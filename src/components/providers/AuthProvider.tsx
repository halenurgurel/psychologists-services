"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { getFavorites } from "@/lib/favorites";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const favorites = await getFavorites(user.uid);
        setFavorites(favorites);
      } else {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [setUser, setFavorites]);

  return <>{children}</>;
}
