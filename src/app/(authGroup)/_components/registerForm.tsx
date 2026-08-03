"use client";

import { useActionState, useEffect, useState } from "react";
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

    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

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
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-danger/10 text-danger border-danger/20"
                        }`}
                >
                    {state.message}
                </div>
            )}

            {/* Full Name Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-foreground/90">
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-text-muted/60"
                />
            </div>

            {/* Email Address Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-foreground/90">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-text-muted/60"
                />
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-foreground/90">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-text-muted/60"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors p-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            /* Eye Off Icon */
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.04 9.04 0 012.122-.363c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-4.22-4.22L3 3" />
                            </svg>
                        ) : (
                            /* Eye Icon */
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Role Selection Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-foreground/90">
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