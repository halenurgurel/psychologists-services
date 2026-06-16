"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { Psychologists } from "@/types/psychologists";
import Button from "./Button";
import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { addFavorite, removeFavorite } from "@/lib/favorites";
import AppointmentModal from "./AppointmentModal";
import AuthModal from "./AuthModal";

export default function PsychologistCard({
  p,
  showReadMore = true,
  showDetail = false,
}: {
  p: Psychologists;
  showReadMore?: boolean;
  showDetail?: boolean;
}) {
  const user = useAuthStore((state) => state.user);
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(p.id);

  const [appointmentModal, setAppointmentModal] = useState(false);
  const [authModal, setAuthModal] = useState(false);

  const handleAppointment = () => {
    if (!user) {
      setAuthModal(true);
    } else {
      setAppointmentModal(true);
    }
  };

  async function handleFavorite() {
    if (!user) return;
    toggleFavorite(p.id);
    if (isFavorite) {
      await removeFavorite(user.uid, p.id);
    } else {
      await addFavorite(user.uid, p.id);
    }
  }

  return (
    <div className="bg-surface flex flex-row items-start gap-3 rounded-3xl p-6">
      <Image
        src={p.avatar_url}
        alt={p.name}
        width={96}
        height={96}
        className="border-primary/20 rounded-4xl border p-2"
      />
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground/50 text-sm">Psychologist</p>
          <div className="flex flex-row items-center gap-1">
            <Star width={14} height={14} fill="#FFC531" color="#FFC531" />
            <p className="text-sm">Rating: {p.rating}</p>
            <p className="text-sm">
              | Price/1 hour: <span className="text-price">{p.price_per_hour}$</span>
            </p>
            <Heart
              width={16}
              height={16}
              className="-mt-1 ml-3 cursor-pointer transition-colors"
              fill={isFavorite ? "#54BE96" : "none"}
              color={isFavorite ? "#54BE96" : "currentColor"}
              onClick={handleFavorite}
            />
          </div>
        </div>
        <h1 className="text-lg font-bold">{p.name}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <p className="bg-background rounded-3xl px-4 py-2 text-sm">
              <span className="text-gray-500">Experience:</span> {p.experience}
            </p>
            <p className="bg-background rounded-3xl px-4 py-2 text-sm">
              <span className="text-gray-500">License: </span> {p.license}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <p className="bg-background rounded-3xl px-4 py-2 text-sm">
              <span className="text-gray-500">Specialization: </span> {p.specialization}
            </p>
            <p className="bg-background rounded-3xl px-4 py-2 text-sm">
              <span className="text-gray-500">Initial Consultation: </span> {p.initial_consultation}
            </p>
          </div>
        </div>
        <p className="text-foreground/50 text-xs">{p.about}</p>

        {/*Detail*/}
        {showDetail && (
          <div className="flex flex-col gap-3">
            {p.reviews.map((r) => (
              <div key={r.reviewer} className="bg-background flex flex-col gap-2 rounded-xl p-4">
                <div className="flex flex-row items-center gap-3">
                  <p className="text-primary bg-primary/20 rounded-4xl px-4 py-2">
                    {r.reviewer.slice(0, 1)}
                  </p>
                  <div className="flex flex-col">
                    <p>{r.reviewer}</p>
                    <div className="flex flex-row items-center gap-2">
                      <Star
                        width={14}
                        height={14}
                        fill="#FFC531"
                        color="#FFC531"
                        className="-mt-0.5"
                      />
                      <p className="text-sm">{r.rating}</p>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/50">{r.comment}</p>
              </div>
            ))}
            <Button onClick={handleAppointment} className="w-fit px-6 py-3">
              Make an appointment
            </Button>
          </div>
        )}

        {/*read more*/}
        {showReadMore && (
          <Link
            href={`/psychologists/${p.id}`}
            className="hover:text-primary text-sm hover:underline hover:underline-offset-2"
          >
            Read more
          </Link>
        )}
      </div>
      {appointmentModal && <AppointmentModal p={p} onClose={() => setAppointmentModal(false)} />}
      {authModal && <AuthModal mode="register" onClose={() => setAuthModal(false)} />}
    </div>
  );
}
