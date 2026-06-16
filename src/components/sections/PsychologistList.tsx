"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Psychologists } from "@/types/psychologists";
import Button from "@/components/ui/Button";
import PsychologistCard from "../ui/PsychologistCard";
import PsychologistSort, { SortValue } from "../ui/PsychologistSort";

function sortPsychologists(list: Psychologists[], sort: SortValue): Psychologists[] {
  switch (sort) {
    case "name_asc":
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    case "price_asc":
      return [...list].sort((a, b) => a.price_per_hour - b.price_per_hour);
    case "price_desc":
      return [...list].sort((a, b) => b.price_per_hour - a.price_per_hour);
    case "popular":
      return [...list].sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
}

export default function PsychologistList({ psychologists }: { psychologists: Psychologists[] }) {
  const searchParams = useSearchParams();
  const sort = (searchParams.get("sort") ?? "all") as SortValue;
  const page = Number(searchParams.get("page")) || 1;

  const sorted = sortPsychologists(psychologists, sort);
  const visible = page * 3;

  const router = useRouter();

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page + 1));
    router.push(`/psychologists?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4">
      <PsychologistSort />
      {sorted.slice(0, visible).map((psychologist) => (
        <PsychologistCard key={psychologist.id} p={psychologist} />
      ))}
      {visible < sorted.length && (
        <Button onClick={handleLoadMore} className="mx-auto mt-4 mb-4 px-10 py-3">
          Load more
        </Button>
      )}
    </div>
  );
}
