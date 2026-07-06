# Miles With Nature - Modern Trekking Website

A full-stack, production-ready Next.js 16 (App Router) trekking application with a pristine architecture, dynamic database integration, and a responsive design.

## Features

- **Next.js 16+ App Router**: Modern routing with server components, layouts, and Turbopack support.
- **Database Integrated**: Fully integrated with PostgreSQL via Prisma ORM (Neon DB configuration included).
- **REST APIs**: Next.js Route Handlers (`app/api`) handling CRUD operations for Treks and Users.
- **Admin Dashboard**: Secure area for managing treks and viewing registered users.
- **Responsive Design**: Mobile-first approach using Tailwind CSS and Radix UI components.
- **Base64 Image Uploads**: Custom trek creation with dynamic Postgres text string image storage.
- **Performance Optimized**: Using `next/image` for image optimization and App Router Static Generation (`generateStaticParams`).

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Database**: PostgreSQL (Neon DB)
- **ORM**: Prisma Client & Prisma Postgres Adapter
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui (Radix UI + Lucide)
- **Encryption**: bcryptjs for secure password hashing

---

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### 1. Prerequisites

- **Node.js** (v18 or newer)
- **npm** (or yarn/pnpm)
- A **PostgreSQL database** connection URL (e.g., from Neon, Supabase, or local).

### 2. Installation

Clone the repository and install all required Node.js dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of your project by copying the `.env.example` file:

```bash
cp .env.example .env
```

Ensure your `.env` file looks something like this:

```env
# Admin Credentials setup
ADMIN_EMAIL=admin@mileswithnature.com
ADMIN_PASSWORD=admin123

# Your PostgreSQL Database URL
DATABASE_URL="postgresql://user:password@host/database_name?uselibpqcompat=true&sslmode=require"

# Base URL for API calls during localized Dev
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> **Note**: For Neon or remote DBs, ensure your `DATABASE_URL` is accurate.

### 4. Database Setup & Initialization

First, sync your Prisma schema with your database to create the necessary tables:

```bash
npm run prisma:generate   # Generates your local Prisma Client
npm run prisma:migrate    # Applies schema migrations up to the database
```

Once the database tables (`users`, `treks`) are created, populate it with initial mock data using the seed script:

```bash
npm run prisma:seed
```

_This will create the default Admin user as well as some beautifully curated base treks!_

You can also use Prisma Studio to inspect your database visually anytime:

```bash
npm run prisma:studio
```

### 5. Start Development Server

Run the Next.js development server with Turbopack for lightning-fast HMR:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Building for Production

When you are ready to deploy, run the production build process. This will statically generate routes and optimize the application:

```bash
npm run build
```

Then, start the production server:

```bash
npm run start
```

---

## 🔐 Admin Access

You can access the backend dashboard to view metrics, registered users, and edit treks.

- **Dashboard URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Email**: `admin@mileswithnature.com`
- **Default Password**: `admin123`

_(Check your `seed.ts` or `.env` to verify admin credentials created upon seeding)._

---

Built with ❤️ for mountain lovers and outdoor enthusiasts!
