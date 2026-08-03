import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Subtle Gradient & Grid Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

            {/* Brand Logo Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-2">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-2xl font-black text-slate-900 tracking-tight group"
                >
                    <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                        🚲
                    </span>
                    <span>
                        Gear<span className="text-blue-600">Rental</span>
                    </span>
                </Link>
            </div>

            {/* Auth Main Card Content Container */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
                <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 sm:px-10">
                    {children}
                </div>
            </div>

            {/* Footer Disclaimer / Links */}
            <div className="mt-8 text-center text-xs text-slate-400 z-10">
                <p>
                    © {new Date().getFullYear()} GearRental Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;