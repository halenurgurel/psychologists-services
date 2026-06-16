"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "all", label: "Default" },
  { value: "name_asc", label: "A to Z" },
  { value: "name_desc", label: "Z to A" },
  { value: "price_asc", label: "$ Low to High" },
  { value: "price_desc", label: "$ High to Low" },
  { value: "popular", label: "Popular" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function PsychologistSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("sort") ?? "all") as SortValue;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === current)?.label ?? "Default";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: SortValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");
    router.push(`/psychologists?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative mb-6 w-48">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${open ? "bg-primary border-primary text-surface" : "bg-surface border-primary/50 text-foreground"}`}
      >
        {currentLabel}
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="bg-surface border-foreground/20 absolute left-0 z-10 mt-1 w-full rounded-xl shadow-lg">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleSelect(option.value)}
                className={`hover:bg-primary/10 w-full cursor-pointer px-4 py-2.5 text-left text-sm first:rounded-t-xl last:rounded-b-xl ${
                  current === option.value ? "text-primary font-semibold" : "text-foreground/70"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
