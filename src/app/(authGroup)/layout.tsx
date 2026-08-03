import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
            {/* Background Subtle Gradient & Grid Pattern */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(var(--card-border)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/20 dark:bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Brand Logo Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-2">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-2xl font-black tracking-tight group"
                >
                    <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                        🚲
                    </span>
                    <span className="text-foreground">
                        Gear<span className="text-primary">Rental</span>
                    </span>
                </Link>
            </div>

            {/* Auth Main Card Content Container */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
                <div className="bg-card-bg py-8 px-6 shadow-xl dark:shadow-2xl dark:shadow-black/50 rounded-3xl border border-card-border sm:px-10 transition-colors duration-300">
                    {children}
                </div>
            </div>

            {/* Footer Disclaimer */}
            <div className="mt-8 text-center text-xs opacity-60 z-10">
                <p>
                    © {new Date().getFullYear()} GearRental Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;