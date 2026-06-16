# Psychologists Services

A modern web platform for discovering and booking sessions with professional psychologists. Users can browse therapist profiles, filter by preference, save favorites, and schedule appointments — all backed by Firebase and built with Next.js.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Available Scripts](#available-scripts)
- [Pages](#pages)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Styling](#styling)

---

## Overview

Psychologists Services is a full-stack Next.js application that bridges clients seeking mental health support with licensed psychologists. The platform provides a searchable directory of therapists, allows users to bookmark favorites, and enables appointment scheduling with real-time data persistence via Firebase Firestore.

---

## Live Demo

> [Click Here!](https://hales-psychologist-services.vercel.app)

---

## Features

- **Psychologist Directory** — Browse all available therapists with rich profile cards (avatar, specialization, rating, price, experience, license, bio)
- **Sorting** — Sort psychologists by name (A–Z / Z–A), price (low–high / high–low), or popularity
- **Paginated Listing** — "Load More" pagination with URL-based state (3 items per batch)
- **Favorites** — Authenticated users can heart-toggle favorites; state persisted in Firestore
- **Appointments** — Book a session via a validated form (name, phone, email, date/time, comment); all appointments stored per user in Firestore
- **Protected Routes** — Favorites and Appointments pages require login; unauthenticated access redirects to home
- **Authentication** — Email/password register, login, and password reset; Google OAuth ready
- **Responsive UI** — Mobile-first layout with custom Tailwind theme and smooth transitions
- **Dark Mode** — Automatic dark/light mode via `prefers-color-scheme`

---

## Tech Stack

| Category         | Library / Tool                         | Version   |
| ---------------- | -------------------------------------- | --------- |
| Framework        | Next.js (App Router)                   | 16.x      |
| UI Library       | React                                  | 19.x      |
| Styling          | Tailwind CSS                           | 4.x       |
| Icons            | Lucide React                           | 1.17      |
| State Management | Zustand                                | 5.x       |
| Forms            | React Hook Form + Yup                  | 7.x / 1.x |
| Backend / Auth   | Firebase (Auth + Firestore)            | 12.x      |
| Date Picker      | react-datepicker                       | 9.x       |
| Class Utilities  | clsx + tailwind-merge                  | 2.x / 3.x |
| Language         | TypeScript                             | 5.x       |
| Linting          | ESLint (Next.js config)                | 9.x       |
| Formatting       | Prettier + prettier-plugin-tailwindcss | 3.x       |

---

## Project Structure

```
psychologists-services/
├── public/                     # Static assets (icons, images, SVGs)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home (/)
│   │   ├── layout.tsx          # Root layout with AuthProvider
│   │   ├── psychologists/
│   │   │   ├── page.tsx        # Directory (/psychologists)
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Profile detail (/psychologists/:id)
│   │   ├── favorites/
│   │   │   └── page.tsx        # Favorites (/favorites) — protected
│   │   └── appointments/
│   │       └── page.tsx        # Appointments (/appointments) — protected
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx      # Navigation bar, user menu, auth triggers
│   │   ├── providers/
│   │   │   └── AuthProvider.tsx # Firebase auth state + favorites sync
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   └── PsychologistList.tsx
│   │   └── ui/
│   │       ├── AuthModal.tsx
│   │       ├── LoginForm.tsx
│   │       ├── RegistrationForm.tsx
│   │       ├── AppointmentModal.tsx
│   │       ├── PsychologistCard.tsx
│   │       ├── PsychologistDetail.tsx
│   │       ├── PsychologistSort.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── BackButton.tsx
│   │       └── Spinner.tsx
│   ├── lib/
│   │   ├── auth.ts             # Firebase auth helpers (login, register, OAuth, reset)
│   │   └── firebase.ts         # Firebase app init + Firestore instance
│   ├── store/
│   │   ├── authStore.ts        # Zustand store — current user
│   │   └── favoritesStore.ts   # Zustand store — favorited psychologist IDs
│   ├── types/                  # Shared TypeScript types
│   └── utils/
│       └── cn.ts               # clsx + tailwind-merge helper
├── .prettierrc
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase project (see [Firebase Setup](#firebase-setup))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/psychologists-services.git
cd psychologists-services

# Install dependencies
npm install

# Copy and fill in environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file at the project root with the following Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

All variables are prefixed with `NEXT_PUBLIC_` so they are available in the browser bundle.

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** — add Email/Password and (optionally) Google providers.
3. Create a **Firestore Database** in production mode.
4. Add the following Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /psychologists/{id} {
      allow read: if true;
    }
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Populate the `psychologists` collection with documents matching the schema below (or import seed data).

### Firestore Schema

**`psychologists/{id}`**

```
name                  string
avatar_url            string
experience            string
license               string
specialization        string
initial_consultation  string
about                 string
rating                number
price_per_hour        number
reviews               array<{ reviewer: string; rating: number; comment: string }>
```

**`users/{userId}/favorites/{docId}`**

```
psychologistId    string
```

**`users/{userId}/appointments/{docId}`**

```
psychologistId    string
psychologistName  string
name              string
phone             string
email             string
date              string
time              string
comment           string (optional)
createdAt         timestamp
```

---

## Available Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start development server on port 3000 |
| `npm run build` | Build optimized production bundle     |
| `npm run start` | Start production server               |
| `npm run lint`  | Run ESLint across the codebase        |

---

## Pages

| Route                 | Access        | Description                                     |
| --------------------- | ------------- | ----------------------------------------------- |
| `/`                   | Public        | Landing page with hero and CTA                  |
| `/psychologists`      | Public        | Sortable, paginated therapist directory         |
| `/psychologists/[id]` | Public        | Full therapist profile with reviews and booking |
| `/favorites`          | Auth required | All favorited psychologists                     |
| `/appointments`       | Auth required | All scheduled appointments                      |

---

## Authentication

Authentication is handled by Firebase Auth via helper functions in [src/lib/auth.ts](src/lib/auth.ts):

| Function                          | Description                         |
| --------------------------------- | ----------------------------------- |
| `register(name, email, password)` | Create account and set display name |
| `login(email, password)`          | Sign in with email/password         |
| `loginWithGoogle()`               | Google OAuth popup sign-in          |
| `resetPassword(email)`            | Send Firebase password-reset email  |
| `logout()`                        | Sign out current user               |

The `AuthProvider` component wraps the entire app and listens to `onAuthStateChanged`, syncing the Firebase user into the Zustand `authStore` and loading the user's favorites from Firestore on sign-in.

Auth UI is modal-based — login and registration forms appear as overlays without page navigation.

---

## State Management

Two lightweight Zustand stores handle client-side state:

**`authStore`** — tracks the currently signed-in Firebase `User` (or `null`).

**`favoritesStore`** — holds an array of favorited psychologist IDs. `toggleFavorite(id)` adds or removes an ID and syncs the change to Firestore in the background.

Both stores are initialized and hydrated by `AuthProvider` on mount.

---

## Styling

The project uses **Tailwind CSS v4** with a custom design token set defined as CSS custom properties in `globals.css`:

| Token             | Value       | Usage                          |
| ----------------- | ----------- | ------------------------------ |
| `--primary`       | `#54BE96`   | Buttons, active states, accent |
| `--primary-light` | `#54BE9633` | Hover backgrounds              |
| `--background`    | `#f3f3f3`   | Page background (light mode)   |
| `--surface`       | `#fbfbfb`   | Card backgrounds               |
| `--block`         | `#4535af`   | Purple accent (hero section)   |
| `--price`         | `#38cd3e`   | Price labels                   |

Notable styling patterns:

- `cn()` utility (`clsx` + `tailwind-merge`) for safe conditional class composition
- Cards use `rounded-3xl` (24px) for a modern, soft look
- Custom thin scrollbar styled with the primary green
- Fully responsive — mobile-first breakpoints throughout

---

## License

This project was created as part of the [GoIT Full Stack Developer](https://goit.global/) program.
