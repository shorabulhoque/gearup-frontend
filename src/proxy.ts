// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// রোল অনুযায়ী ড্যাশবোর্ড রাউট ম্যাপিং
const ROLE_DASHBOARDS: Record<string, string> = {
    ADMIN: "/dashboard/admin",
    PROVIDER: "/dashboard/provider",
    CUSTOMER: "/dashboard/customer",
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ১. কুকি থেকে টোকেন এবং রোল রিড করা
    const accessToken = request.cookies.get("accessToken")?.value;
    const userRole = request.cookies.get("userRole")?.value;

    // রাউট গ্রুপ সনাক্তকরণ
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // ---------------------------------------------------------------
    // কেস ১: লগইন থাকা অবস্থায় Auth পেজে (/login, /register) ঢুকতে চাইলে
    // ---------------------------------------------------------------
    if (isAuthRoute && accessToken) {
        const targetDashboard = (userRole && ROLE_DASHBOARDS[userRole]) || "/dashboard/customer";
        return NextResponse.redirect(new URL(targetDashboard, request.url));
    }

    // ---------------------------------------------------------------
    // কেস ২: লগইন না করে প্রোটেক্টেড ড্যাশবোর্ডে ঢুকতে চাইলে
    // ---------------------------------------------------------------
    if (isDashboardRoute && !accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isDashboardRoute && accessToken && userRole) {
        if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL(ROLE_DASHBOARDS[userRole] || "/login", request.url));
        }

        if (pathname.startsWith("/dashboard/provider") && userRole !== "PROVIDER") {
            return NextResponse.redirect(new URL(ROLE_DASHBOARDS[userRole] || "/login", request.url));
        }

        if (pathname.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
            return NextResponse.redirect(new URL(ROLE_DASHBOARDS[userRole] || "/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};