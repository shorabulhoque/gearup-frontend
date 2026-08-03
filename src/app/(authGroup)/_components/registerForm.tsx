"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/services/auth/auth.actions";
import { IRegisterResponse } from "@/types/auth.types";
import { toast } from "sonner";

const initialState: IRegisterResponse = {
    success: false,
    message: "",
};

export default function RegisterForm() {
    const router = useRouter();
    const [state, action, isPending] = useActionState(registerAction, initialState);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Account created successfully!");
            const timer = setTimeout(() => {
                router.push("/login");
            }, 1500);
            return () => clearTimeout(timer);
        } else if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <form action={action} className="space-y-4">
            {/* Inline Error/Success Banner */}
            {state && state.message && (
                <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm border font-medium ${state.success
                            ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                            : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                        }`}
                >
                    {state.message}
                </div>
            )}

            {/* Full Name Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold opacity-90">
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:opacity-50"
                />
            </div>

            {/* Email Address Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold opacity-90">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:opacity-50"
                />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold opacity-90">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:opacity-50"
                />
            </div>

            {/* Role Selection Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold opacity-90">
                    Select Role
                </label>
                <select
                    name="role"
                    defaultValue="CUSTOMER"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm cursor-pointer"
                >
                    <option value="CUSTOMER" className="bg-card-bg text-foreground">
                        Customer (Rent Gear)
                    </option>
                    <option value="PROVIDER" className="bg-card-bg text-foreground">
                        Provider (Host Gear)
                    </option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2 flex justify-center items-center gap-2"
            >
                {isPending ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Creating account...
                    </>
                ) : (
                    "Register"
                )}
            </button>
        </form>
    );
}