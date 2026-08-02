"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IUserData } from "@/types/user.types";
import { logoutUserAction } from "@/services/auth/auth.actions";

interface UserDropdownProps {
    user: IUserData;
}

export default function UserDropdown({ user }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Click outside handler to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Determine dashboard path based on role
    const getDashboardLink = () => {
        switch (user.role) {
            case "ADMIN":
                return "/admin/dashboard";
            case "PROVIDER":
                return "/provider/dashboard";
            default:
                return "/dashboard";
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* User Avatar Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-sm uppercase shadow-sm hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 transition"
            >
                {user.name?.charAt(0) || "U"}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 uppercase">
                            {user.role}
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="py-1 text-sm text-gray-700">
                        <Link
                            href={getDashboardLink()}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                        >
                            📊 Dashboard
                        </Link>

                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                        >
                            👤 Profile
                        </Link>
                    </div>

                    {/* Logout Form */}
                    <div className="border-t border-gray-100 pt-1">
                        <form action={logoutUserAction}>
                            <button
                                type="submit"
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                            >
                                🚪 Logout
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}