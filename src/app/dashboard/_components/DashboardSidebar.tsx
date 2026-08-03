"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
    userName?: string;
}

export default function DashboardSidebar({ role, userName }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { label: "My Profile", href: "/dashboard/profile" },

        ...(role === "CUSTOMER"
            ? [
                { label: "My Rentals", href: "/dashboard/my-rentals" },
            ]
            : []),

        ...(role === "PROVIDER"
            ? [
                { label: "Manage Gears", href: "/dashboard/manage-gears" },
                { label: "Rental Orders", href: "/dashboard/rental-orders" },
            ]
            : []),

        ...(role === "ADMIN"
            ? [
                { label: "All Users", href: "/dashboard/users" },
            ]
            : []),
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col justify-between">
            <div>
                <div className="mb-8 px-2">
                    <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                    {userName && (
                        <p className="text-sm font-medium text-gray-700 mt-1">{userName}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">
                        Role: <span className="font-semibold text-blue-600">{role}</span>
                    </p>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition ${isActive
                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="pt-4 border-t border-gray-100 px-2">
                <Link
                    href="/"
                    className="text-sm font-medium text-gray-500 hover:text-gray-800 transition block text-center"
                >
                    ← Back to Home
                </Link>
            </div>
        </aside>
    );
}