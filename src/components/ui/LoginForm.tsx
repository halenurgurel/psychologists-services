"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { login, resetPassword } from "@/lib/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  onClose: () => void;
  onSwitch?: () => void;
};

const FIREBASE_ERRORS: Record<string, string> = {
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
};

export default function LoginForm({ onClose, onSwitch }: Props) {
  const [resetSent, setResetSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setAuthError(null);
    try {
      await login(data.email, data.password);
      onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setAuthError(FIREBASE_ERRORS[code] ?? "Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (!email) return;
    await resetPassword(email);
    setResetSent(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-4xl">Log In</h2>
      <p className="text-foreground/50">
        Welcome back! Please enter your credentials to access your account and continue your search
        for a psychologist.
      </p>
      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      <div className="flex flex-col gap-1">
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-foreground/50 hover:text-primary self-end text-xs underline underline-offset-2 transition-colors"
        >
          Forgot password?
        </button>
        {resetSent && (
          <p className="text-primary text-xs">Password reset email sent. Please check your inbox.</p>
        )}
      </div>
      {authError && <p className="text-sm text-red-500">{authError}</p>}
      <Button type="submit" className="cursor-pointer">
        Log In
      </Button>
      <Button variant="secondary" className="flex cursor-pointer items-center justify-center gap-2">
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        Continue with Google
      </Button>
      {onSwitch && (
        <p className="text-foreground/50 text-center text-sm">
          Don&apos;t have an account?{" "}
          <button onClick={onSwitch} className="text-primary cursor-pointer underline underline-offset-2">
            Register here
          </button>
        </p>
      )}
    </form>
  );
}
