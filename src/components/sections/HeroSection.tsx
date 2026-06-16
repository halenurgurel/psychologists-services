"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Button from "../ui/Button";
import AuthModal from "../ui/AuthModal";

import { Check } from "lucide-react";

export default function HeroSection() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function handleGetStarted() {
    if (user) {
      router.push("/psychologists");
    } else {
      setShowModal(true);
    }
  }

  return (
    <div className="from-primary/50 via-primary/10 to-surface flex min-h-[calc(100vh-5rem)] flex-col items-center gap-3 bg-linear-to-tl p-10 lg:flex-row lg:justify-between">
      <div className="flex w-full flex-col items-start gap-6 md:w-116 lg:w-150">
        <h1 className="text-7xl font-bold">
          The Road to the <span className="text-primary italic">depths</span> of the human soul
        </h1>
        <p className="text-lg">
          We help you to reveal your potential, overcome challenges and find a guide in your own
          life with the help of our experienced psychologists.
        </p>
      </div>

      <div className="relative flex flex-col items-start gap-5">
        <Image src="/hero-image.png" alt="hero-image" width={464} height={526} className="block" />
        {/*badge */}
        <div className="bg-primary flex max-w-100 flex-row items-center gap-6 rounded-xl px-4 py-2">
          <Check className="text-primary bg-surface size-8 rounded-lg" />
          <div className="flex flex-col justify-center">
            <p className="text-text-hover">Experienced psychologists</p>
            <h1 className="text-surface">15,000</h1>
          </div>
        </div>
        <Button
          onClick={handleGetStarted}
          className="text-surface flex w-50 cursor-pointer items-center justify-center gap-2"
        >
          Get Started
          <Image src="/arrow.svg" alt="arrow" width={14} height={16} />
        </Button>
      </div>
      {showModal && <AuthModal mode="register" onClose={() => setShowModal(false)} />}
    </div>
  );
}
