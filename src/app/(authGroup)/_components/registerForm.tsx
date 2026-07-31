"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/services/auth/auth.actions";
import { IRegisterResponse } from "@/types/auth.types";
import Link from "next/link";

const initialState: IRegisterResponse = {
    success: false,
    message: "",
};

export default function RegisterForm() {
    const router = useRouter();
    const [state, action, isPending] = useActionState(registerAction, initialState);

    useEffect(() => {
        if (state?.success) {
            const timer = setTimeout(() => {
                router.push("/login");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [state?.success, router]);

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create an Account
            </h2>

            {state?.message && (
                <div
                    className={`p-3 mb-4 text-sm rounded-lg border ${state.success
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                        }`}
                >
                    {state.message}
                </div>
            )}

            <form action={action} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="example@mail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Role
                    </label>
                    <select
                        name="role"
                        defaultValue="CUSTOMER"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="PROVIDER">Provider</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
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

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-medium hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
};