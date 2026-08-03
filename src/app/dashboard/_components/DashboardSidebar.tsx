"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUserAction } from "@/services/auth/auth.actions";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface SidebarProps {
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
    userName?: string;
}

export default function DashboardSidebar({ role, userName }: SidebarProps) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "My Profile", href: "/dashboard/profile" },

        ...(role === "CUSTOMER"
            ? [{ label: "My Rentals", href: "/dashboard/my-rentals" }]
            : []),

        ...(role === "PROVIDER"
            ? [
                { label: "My Gears", href: "/dashboard/my-gears" },
                { label: "Create Gear", href: "/dashboard/create-gear" },
                { label: "Manage Gears", href: "/dashboard/manage-gears" },
            ]
            : []),

        ...(role === "ADMIN"
            ? [
                { label: "All Users", href: "/dashboard/all-users" },
                { label: "Manage Categories", href: "/dashboard/manage-categories" },
            ]
            : []),
    ];

    const sidebarContent = (
        <div className="h-full flex flex-col justify-between p-4 bg-card-bg border-r border-card-border transition-colors duration-300">
            <div>
                {/* Brand / Role Profile Header */}
                <div className="mb-6 pb-4 border-b border-card-border px-2">
                    <div className="flex items-center justify-between mb-3">
                        <Link href="/" className="text-xl font-extrabold text-primary tracking-tight">
                            GearUp
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="mt-2">
                        <h2 className="text-base font-bold text-foreground truncate">
                            {userName || "Dashboard User"}
                        </h2>
                        <span className="inline-block mt-1 text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {role}
                        </span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-primary text-text-inverse font-semibold shadow-sm shadow-primary/20"
                                    : "text-text-muted hover:bg-background hover:text-foreground"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Sidebar Footer Actions */}
            <div className="pt-4 border-t border-card-border space-y-2 px-1">
                <Link
                    href="/"
                    className="w-full flex items-center justify-center px-4 py-2 text-xs font-semibold text-text-muted hover:text-foreground hover:bg-background rounded-xl transition"
                >
                    ← Return to Website
                </Link>

                <form action={logoutUserAction}>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-danger bg-danger/10 hover:bg-danger/20 border border-danger/20 rounded-xl transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Log Out
                    </button>
                </form>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar Toggle Button */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-3.5 bg-primary text-text-inverse rounded-full shadow-lg shadow-primary/30 flex items-center justify-center"
                    aria-label="Toggle Sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Backdrop & Slideout Drawer */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:static lg:z-auto`}
            >
                {sidebarContent}
            </aside>
        </>
    );
}