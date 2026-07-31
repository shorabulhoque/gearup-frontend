"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { loginAction } from "../../../services/auth/auth.actions";
import { ILoginResponse } from "@/types/auth.types";
import Link from "next/link";

const initialState: ILoginResponse = {
    success: false,
    message: "",
};

export default function LoginForm() {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";

    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), initialState);

    useEffect(() => {
        if (!state) return;

        if (!state.success && state.message) {
        };
    }, [state]);

    return (
        <form action={action} className="space-y-4">
            <div className="p-6 rounded-xl border bg-card-bg border-card-border shadow-sm space-y-4">

                {/* Error Notification inside Form */}
                {state && !state.success && (
                    <div className="p-3 rounded-lg text-sm bg-red-500/10 text-red-600 border border-red-500/20 font-medium">
                        {state.message}
                    </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border bg-background border-card-border focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                        <label className="font-medium">Password</label>
                        <Link
                            href="/forgot-password"
                            className="text-xs text-primary hover:underline font-medium"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border bg-background border-card-border focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={pending}
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    {pending ? "Submitting..." : "Login"}
                </button>

            </div>
        </form>
    );
}