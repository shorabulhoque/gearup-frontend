/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ILoginResponse, IRegisterResponse } from "@/types/auth.types";
import jwt, { JwtPayload } from "jsonwebtoken";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function loginAction(
    redirectTo: string,
    prevState: ILoginResponse | null,
    formData: FormData
): Promise<ILoginResponse> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data: ILoginResponse = await res.json();

        if (!res.ok || !data.success) {
            return {
                success: false,
                statusCode: res.status,
                message: data.message || "Invalid email or password",
            };
        };

        const cookieStore = await cookies();
        cookieStore.set("accessToken", data.data?.accessToken as string, { httpOnly: true, sameSite: "lax" });
        cookieStore.set("refreshToken", data.data?.refreshToken as string, { httpOnly: true, sameSite: "lax" });

        const decodedToken = jwt.decode(data.data?.accessToken as string) as JwtPayload;

        if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
            redirect(redirectTo);
        };

        if (decodedToken.role === "CUSTOMER") redirect("/dashboard/customer");
        else if (decodedToken.role === "ADMIN") redirect("/dashboard/admin");
        else if (decodedToken.role === "PROVIDER") redirect("/dashboard/provider");

        return data;

    } catch (error: any) {
        if (error.message === "NEXT_REDIRECT" || error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        };

        return {
            success: false,
            statusCode: 500,
            message: error.message || "Network connection error",
        };
    };
};


export async function registerAction(
    prevState: IRegisterResponse | null,
    formData: FormData
): Promise<IRegisterResponse> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string) || "CUSTOMER";

    if (!name || !email || !password) {
        return {
            success: false,
            message: "All fields are required",
        };
    };

    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        const data: IRegisterResponse = await res.json();

        if (!res.ok || !data.success) {
            return {
                success: false,
                message: data.message || "Registration failed. Please try again.",
                statusCode: res.status,
            };
        };

        return data;

    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Network connection error",
        };
    };
};