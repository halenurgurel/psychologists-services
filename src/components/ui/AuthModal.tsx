"use client";

import { X } from "lucide-react";
import RegistrationForm from "@/components/ui/RegistrationForm";
import LoginForm from "@/components/ui/LoginForm";

import { useState } from "react";

type Props = {
  mode: "login" | "register";
  onClose: () => void;
};

export default function AuthModal({ mode: initialMode, onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  if (!mode) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="bg-surface relative z-10 w-full max-w-md rounded-2xl p-10">
        <div className="flex justify-end">
          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onClose={onClose} onSwitch={() => setMode("register")} />
        ) : (
          <RegistrationForm onClose={onClose} onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
