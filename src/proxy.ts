import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "@/utils/jwt";

const ROLE_DASHBOARDS: Record<string, string> = {
    ADMIN: "/dashboard/admin",
    PROVIDER: "/dashboard/provider",
    CUSTOMER: "/dashboard/customer",
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;
    const decoded = accessToken ? jwtUtils.decodeToken(accessToken) : null;
    const userRole = decoded?.role;

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    if (isAuthRoute && accessToken && userRole) {
        const targetDashboard = ROLE_DASHBOARDS[userRole] || "/dashboard/customer";
        return NextResponse.redirect(new URL(targetDashboard, request.url));
    };

    if (isDashboardRoute && !accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    };

    if (isDashboardRoute && accessToken && userRole) {
        if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL(ROLE_DASHBOARDS[userRole] || "/login", request.url));
        };

        if (pathname.startsWith("/dashboard/provider") && userRole !== "PROVIDER") {
            return NextResponse.redirect(new URL(ROLE_DASHBOARDS[userRole] || "/login", request.url));
        };

        if (pathname.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
            return NextResponse.redirect(new URL(ROLE_DASHBOARDS[userRole] || "/login", request.url));
        };
    };

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};