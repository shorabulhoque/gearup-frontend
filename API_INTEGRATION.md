# 🚴‍♂️ GearUp - Frontend & Backend API Integration Mapping

This document provides a complete mapping between the Next.js App Router pages/components and the corresponding backend API endpoints consumed in the GearUp frontend application.

---

## 🔐 1. Authentication (`/app/(authGroup)`, `/services/auth`, `/services/user`)

| Frontend Page / Component | Action / Function | HTTP Method | Backend API Endpoint | Auth Level |
|---------------------------|-------------------|-------------|----------------------|------------|
| `loginForm.tsx` (`/login`) | `loginUserAction()` | `POST` | `/api/auth/login` | Public |
| `registerForm.tsx` (`/register`) | `registerUserAction()` | `POST` | `/api/auth/register` | Public |
| `UserDropdown.tsx` / `layout.tsx` | `getCurrentUser()` | `GET` | `/api/users/me` | Authenticated |
| `ProfileClient.tsx` (`/dashboard/profile`) | `getProfile()` / `updateProfile()` | `GET` / `PATCH` | `/api/users/me` | Authenticated |

---

## 🏋️ 2. Gear & Catalog Management (`/app/(publicGroup)/gears`, `/services/gear`)

| Frontend Page / Component | Action / Function | HTTP Method | Backend API Endpoint | Auth Level |
|---------------------------|-------------------|-------------|----------------------|------------|
| `FeaturedGear.tsx` (`/`) | `getAllGears({ limit: 6 })` | `GET` | `/api/gears?limit=6` | Public |
| `/gears/page.tsx` | `getAllGears(queryParams)` | `GET` | `/api/gears` | Public |
| `/gears/[id]/page.tsx` | `getGearById(id)` | `GET` | `/api/gears/:id` | Public |
| `GearForm.tsx` (`/dashboard/create-gear`) | `createGearAction(data)` | `POST` | `/api/gears` | Provider / Admin |
| `GearForm.tsx` (`/dashboard/my-gears/[id]`) | `updateGearAction(id, data)` | `PATCH` | `/api/gears/:id` | Provider / Admin |
| `/dashboard/manage-gears/page.tsx` | `deleteGearAction(id)` | `DELETE` | `/api/gears/:id` | Provider / Admin |

---

## 🏷️ 3. Category Management (`/services/category`)

| Frontend Page / Component | Action / Function | HTTP Method | Backend API Endpoint | Auth Level |
|---------------------------|-------------------|-------------|----------------------|------------|
| `GearFilterSidebar.tsx` (`/gears`) | `getAllCategories()` | `GET` | `/api/categories` | Public |
| `/dashboard/manage-categories/page.tsx` | `createCategoryAction(data)` | `POST` | `/api/categories` | Admin Only |
| `/dashboard/manage-categories/page.tsx` | `getAllCategories()` | `GET` | `/api/categories` | Admin Only |

---

## 📅 4. Rentals & Orders (`/app/dashboard`, `/services/rental`, `/services/order`)

| Frontend Page / Component | Action / Function | HTTP Method | Backend API Endpoint | Auth Level |
|---------------------------|-------------------|-------------|----------------------|------------|
| `GearBookingCard.tsx` (`/gears/[id]`) | `createRentalAction(data)` | `POST` | `/api/rentals` | Customer |
| `MyRentalsClient.tsx` (`/dashboard/my-rentals`) | `getMyRentals()` | `GET` | `/api/rentals/my-rentals` | Customer |
| `ProviderOrdersClient.tsx` (`/dashboard/manage-gears`) | `getProviderOrders()` | `GET` | `/api/rentals/provider-orders` | Provider |
| `ProviderOrdersClient.tsx` | `updateOrderStatus(id, status)` | `PATCH` | `/api/rentals/:id/status` | Provider / Admin |
| `/gears/[id]/page.tsx` | `checkUserHasRented(gearId)` | `GET` | `/api/rentals/check-rented/:gearId` | Customer |

---

## 💳 5. Payment Flow (`/services/payment`, `/app/(publicGroup)/payment`)

| Frontend Page / Component | Action / Function | HTTP Method | Backend API Endpoint | Auth Level |
|---------------------------|-------------------|-------------|----------------------|------------|
| `MyRentalsClient.tsx` ("Pay Now" CTA) | `createCheckoutSession(rentalId)` | `POST` | `/api/payments/create-checkout-session` | Customer |
| `/payment/success/page.tsx` | `verifyPayment(sessionId)` | `GET` / `POST` | `/api/payments/verify` | Customer |

---

## ⭐ 6. Reviews (`/components/review`, `/services/review`)

| Frontend Page / Component | Action / Function | HTTP Method | Backend API Endpoint | Auth Level |
|---------------------------|-------------------|-------------|----------------------|------------|
| `Review.tsx` (`/`) | `getAllReviews(limit)` | `GET` | `/api/reviews?limit=6` | Public |
| `/gears/[id]/page.tsx` | `getReviewsByGearId(gearId)` | `GET` | `/api/reviews/gear/:gearId` | Public |
| `CreateReviewForm.tsx` (`/gears/[id]`) | `createReviewAction(payload)` | `POST` | `/api/reviews` | Customer (Rented Only) |

---

## 🛠️ 7. Admin Operations (`/app/dashboard/all-users`, `/services/admin`)

| Frontend Page / Component | Action / Function | HTTP Method | Backend API Endpoint | Auth Level |
|---------------------------|-------------------|-------------|----------------------|------------|
| `/dashboard/all-users/page.tsx` | `getAllUsers()` | `GET` | `/api/admin/users` | Admin Only |
| `/dashboard/all-users/page.tsx` | `updateUserStatus(userId, status)` | `PATCH` | `/api/admin/users/:userId/status` | Admin Only |
| `/dashboard/page.tsx` (Dashboard Home) | `getAdminStats()` | `GET` | `/api/admin/stats` | Admin Only |

---