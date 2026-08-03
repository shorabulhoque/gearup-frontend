import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "@/utils/jwt";

// 1. Define sub-route access rules for each role
const PROVIDER_ROUTES = [
    "/dashboard/manage-gears",
    "/dashboard/create-gears",
    "/dashboard/provider-rentals",
];

const CUSTOMER_ROUTES = [
    "/dashboard/my-rentals",
];

const ADMIN_ROUTES = [
    "/dashboard/all-users",
    "/dashboard/manage-categories",
];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const decoded = accessToken ? jwtUtils.decodeToken(accessToken) : null;
    const userRole = decoded?.role; // e.g. "CUSTOMER", "PROVIDER", "ADMIN"

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Redirect logged-in users away from auth routes
    if (isAuthRoute && accessToken && userRole) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect unauthenticated users away from dashboard routes
    if (isDashboardRoute && !accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Role Protection Logic for Dashboard Sub-Routes
    if (isDashboardRoute && accessToken && userRole) {
        // Prevent Non-Providers from accessing Provider routes
        const isTryingProviderRoute = PROVIDER_ROUTES.some((route) => pathname.startsWith(route));
        if (isTryingProviderRoute && userRole !== "PROVIDER" && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Prevent Non-Customers from accessing Customer routes
        const isTryingCustomerRoute = CUSTOMER_ROUTES.some((route) => pathname.startsWith(route));
        if (isTryingCustomerRoute && userRole !== "CUSTOMER" && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Prevent Non-Admins from accessing Admin routes
        const isTryingAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
        if (isTryingAdminRoute && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};