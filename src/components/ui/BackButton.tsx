"use client";

import { MoveLeft } from "lucide-react";

export default function BackButton() {
  return (
    <div className="text-foreground/40 hover:text-primary flex cursor-pointer flex-row items-center gap-2">
      <MoveLeft size={20} />
      <button className="cursor-pointer" onClick={() => window.history.back()}>
        Go back
      </button>
    </div>
  );
}
