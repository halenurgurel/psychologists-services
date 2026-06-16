"use client";

import { InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ type, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  return (
    <div className="relative">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
