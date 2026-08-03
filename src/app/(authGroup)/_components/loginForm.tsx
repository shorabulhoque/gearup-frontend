"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/services/auth/auth.actions";
import { ILoginResponse } from "@/types/auth.types";
import Link from "next/link";
import { toast } from "sonner";

const initialState: ILoginResponse = {
    success: false,
    message: "",
};

export default function LoginForm() {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";

    const [state, action, pending] = useActionState(
        loginAction.bind(null, redirectTo),
        initialState
    );

    useEffect(() => {
        if (!state) return;

        if (!state.success && state.message) {
            toast.error(state.message);
        } else if (state.success && state.message) {
            toast.success(state.message);
        }
    }, [state]);

    return (
        <form action={action} className="space-y-4">
            {/* Inline Error Banner */}
            {state && !state.success && state.message && (
                <div className="p-3.5 rounded-xl text-xs sm:text-sm bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-medium">
                    {state.message}
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold opacity-90">
                    Email Address
                </label>
                <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:opacity-50"
                />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold opacity-90">Password</label>
                    <Link
                        href="/forgot-password"
                        className="text-primary hover:underline font-semibold"
                    >
                        Forgot password?
                    </Link>
                </div>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:opacity-50"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={pending}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
            >
                {pending ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}