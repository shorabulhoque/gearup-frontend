# ⚡ GearUp - Frontend Web Application

GearUp is a modern, responsive e-commerce / gear rental web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It connects seamlessly with the GearUp Express & PostgreSQL backend to handle user authentication, product catalogs, shopping carts, and Stripe payments.

---

## 🚀 Features

- **Modern & Responsive UI:** Designed with Next.js App Router and styled using Tailwind CSS for clean responsiveness across all devices.
- **User Authentication:** Secure signup/login integration using JWT cookies synced with the Express backend.
- **Product & Rental Catalog:** Dynamic listing, search, and filtering for available gear and products.
- **Stripe Checkout Integration:** Seamless checkout flow powered by Stripe Elements / Checkout API.
- **Protected Routes & Dashboard:** Dedicated dashboards for user rentals, orders, and management.
- **Type-Safe API Calls:** Axios/Fetch instance configured for withCredentials support to handle HTTP-only cookies securely.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State & API Management:** Axios / React Hooks
- **Payments:** Stripe Client SDK (`@stripe/stripe-js`)
- **Icons & UI:** Lucide React / Shadcn UI

---

## 📂 Project Structure

```text
GearUp-Frontend/
├── src/
│   ├── app/                    # Next.js App Router Pages & Layouts
│   │   ├── (auth)/             # Login & Registration
│   │   ├── (dashboard)/        # User & Admin Portal
│   │   ├── products/           # Gear Catalog & Details Page
│   │   ├── checkout/           # Payment & Checkout Page
│   │   ├── layout.tsx          # Root Layout (Nav & Footer)
│   │   └── page.tsx            # Home Page
│   ├── components/             # Reusable UI & Shared Components
│   │   ├── ui/                 # Buttons, Cards, Inputs
│   │   └── shared/             # Navbar, Footer, Modals
│   ├── lib/                    # API Config (Axios Setup) & Utilities
│   │   └── api.ts
│   └── types/                  # TypeScript Interfaces/Types
├── .env.local                  # Environment variables (git-ignored)
├── package.json                # Project dependencies
└── tsconfig.json               # TypeScript configuration