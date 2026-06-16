"use client";

import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Psychologists } from "@/types/psychologists";
import PsychologistCard from "@/components/ui/PsychologistCard";
import Spinner from "@/components/ui/Spinner";

export default function FavoritesPage() {
  const user = useAuthStore((state) => state.user);
  const favorites = useFavoritesStore((state) => state.favorites);
  const [psychologists, setPsychologists] = useState<Psychologists[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPsychologists() {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "psychologists"));
      const all = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Psychologists, "id">),
      }));
      setPsychologists(all.filter((p) => favorites.includes(p.id)));
      setLoading(false);
    }

    if (user) fetchPsychologists();
  }, [user, favorites]);

  if (!user) return <p className="p-10">Please log in to see your favorites.</p>;
  if (loading) return <Spinner fullPage />;

  return (
    <div className="flex flex-col gap-4 p-5">
      {psychologists.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        psychologists.map((p) => <PsychologistCard key={p.id} p={p} />)
      )}
    </div>
  );
}
