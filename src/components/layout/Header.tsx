"use client";

import { useState } from "react";
import {
  CircleUser,
  CircleUserRound,
  ClipboardClock,
  Heart,
  House,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import AuthModal from "../ui/AuthModal";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/lib/auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  return (
    <div className="relative flex h-20 flex-row items-center justify-between px-10">
      <Link href="/" className="mt-1 flex items-center">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={218}
          height={28}
          className="shrink-0 cursor-pointer"
        />
      </Link>

      {/*Menu*/}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer p-2 lg:hidden">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/*Desktop navigation*/}
      {user ? (
        <>
          {/* Centered links */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 flex-row items-center gap-8 lg:flex">
            <p>Hello, {user.displayName}!</p>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/psychologists" className="hover:text-primary">
              Psychologists
            </Link>
          </div>

          {/* Profile - right */}
          <div className="hidden lg:flex">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hover:text-primary flex cursor-pointer flex-row items-center gap-3"
              >
                <CircleUserRound className="text-primary" />
                Profile
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="bg-foreground/50 fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute top-8 right-0 z-20 flex w-55 flex-col gap-5 rounded-xl bg-white px-8 py-4 shadow-lg">
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="absolute top-3 right-4 cursor-pointer"
                    >
                      <X size={24} />
                    </button>

                    <Link
                      href="/favorites"
                      onClick={() => setIsProfileOpen(false)}
                      className="hover:text-primary mt-6 flex cursor-pointer flex-row items-center gap-3"
                    >
                      <Heart className="text-primary" />
                      Favorites
                    </Link>

                    <Link
                      href="/appointments"
                      onClick={() => setIsProfileOpen(false)}
                      className="hover:text-primary flex cursor-pointer flex-row items-center gap-3"
                    >
                      <Users className="text-primary" />
                      Appointments
                    </Link>

                    <Button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      variant="secondary"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="hidden flex-row items-center gap-10 lg:flex lg:gap-15">
          <div className="flex items-center gap-5">
            <Link href="/">Home</Link>
            <Link href="/psychologists">Psychologists</Link>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setAuthModal("login")}
              className="cursor-pointer"
            >
              Log In
            </Button>
            <Button
              variant="primary"
              onClick={() => setAuthModal("register")}
              className="cursor-pointer"
            >
              Registration
            </Button>
          </div>
        </div>
      )}

      {/*Mobile Menu Overlay*/}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/*Mobile Menu Panel*/}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-70 transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 cursor-pointer p-1"
        >
          <X size={24} />
        </button>

        {user ? (
          <div className="mt-5 flex w-40 flex-col gap-4">
            <div className="flex flex-row items-center gap-3">
              <CircleUser className="text-primary" />
              <p>Hello, {user.displayName}!</p>
            </div>

            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary flex flex-row items-center gap-3"
            >
              <House className="text-primary" />
              Home
            </Link>

            <Link
              href="/psychologists"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary flex flex-row items-center gap-3"
            >
              <Users className="text-primary" />
              Psychologists
            </Link>

            <Link
              href="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary flex flex-row items-center gap-3"
            >
              <Heart className="text-primary" />
              Favorites
            </Link>

            <Link
              href="/appointments"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary flex flex-row items-center gap-3"
            >
              <ClipboardClock className="text-primary" />
              Appointments
            </Link>

            <Button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              variant="secondary"
              className="cursor-pointer"
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex w-35 flex-col gap-3">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/psychologists" onClick={() => setIsMenuOpen(false)}>
              Psychologists
            </Link>
            <Button
              variant="secondary"
              onClick={() => setAuthModal("login")}
              className="cursor-pointer"
            >
              Log In
            </Button>
            <Button
              variant="primary"
              onClick={() => setAuthModal("register")}
              className="cursor-pointer"
            >
              Registration
            </Button>
          </div>
        )}
      </div>

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />}
    </div>
  );
}
