"use client";

import { Psychologists } from "@/types/psychologists";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addAppointment } from "@/lib/appointments";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Input from "./Input";
import Button from "./Button";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,13}$/, "Invalid phone number")
    .required("Phone is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string(),
});

type Props = {
  onClose: () => void;
  p: Psychologists;
};

export default function AppointmentModal({ onClose, p }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const user = useAuthStore((state) => state.user);

  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  async function onSubmit(data: yup.InferType<typeof schema>) {
    if (!user) return;
    await addAppointment(user.uid, {
      ...data,
      psychologistId: p.id,
      psychologistName: p.name,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="bg-surface relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl p-10">
        <div className="flex justify-end">
          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Make an appointment with a psychologists</h1>
          <p className="text-foreground/50 text-sm">
            You are on the verge of changing your life for the better. Fill out the short form below
            to book your personal appointment with a professional psychologist. We guarantee
            confidentiality and respect for your privacy.
          </p>
          <div className="flex flex-row gap-3">
            <Image src={p.avatar_url} alt={p.name} width={44} height={44} className="rounded-2xl" />
            <div className="flex flex-col">
              <p className="text-foreground/50 text-sm">Your psychologist</p>
              <p>{p.name}</p>
            </div>
          </div>

          {/*form*/}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <Input type="text" placeholder="Name" {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Input type="tel" placeholder="+380" {...register("phone")} />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => {
                  setSelectedDate(date);
                  setValue("date", date?.toLocaleDateString() ?? "");
                }}
                minDate={new Date()}
                placeholderText="Select date"
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}

              <DatePicker
                selected={selectedTime}
                onChange={(time: Date | null) => {
                  setSelectedTime(time);
                  setValue("time", time?.toTimeString().slice(0, 5) ?? "");
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                placeholderText="00:00"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              />
              {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>}
            </div>

            <div className="flex flex-col">
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <textarea
              placeholder="Comment"
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none"
              {...register("comment")}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
