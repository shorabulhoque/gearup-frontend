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



    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm uppercase shadow-sm hover:ring-2 hover:ring-primary hover:ring-offset-2 ring-offset-background transition"
            >
                {user.name?.charAt(0) || "U"}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-popover-bg border border-popover-border rounded-xl shadow-lg py-2 z-50 transition-all">
                    {/* User Header */}
                    <div className="px-4 py-2.5 border-b border-card-border">
                        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                        <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1.5 uppercase border border-primary/20">
                            {user.role}
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="py-1 text-sm text-foreground">
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-card-bg transition"
                        >
                            📊 Dashboard
                        </Link>

                        <Link
                            href="/dashboard/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-card-bg transition"
                        >
                            👤 Profile
                        </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-card-border pt-1">
                        <form action={logoutUserAction}>
                            <button
                                type="submit"
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/10 transition font-medium"
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