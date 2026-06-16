"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerUser } from "@/lib/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  onClose: () => void;
  onSwitch?: () => void;
};

export default function RegistrationForm({ onClose, onSwitch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await registerUser(data.name, data.email, data.password);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-4xl">Registration</h2>
      <p className="text-foreground/50">
        Thank you for your interest in our platform! In order to register, we need some information.
        Please provide us with the following information.
      </p>
      <Input type="text" placeholder="Name" {...register("name")} />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      <Button type="submit" className="cursor-pointer">
        Sign Up
      </Button>
      <Button variant="secondary" className="flex cursor-pointer items-center justify-center gap-2">
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        Continue with Google
      </Button>
      {onSwitch && (
        <p className="text-foreground/50 text-center text-sm">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-primary cursor-pointer underline underline-offset-2">
            Log in here
          </button>
        </p>
      )}
    </form>
  );
}
