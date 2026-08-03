/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function createPaymentSession(rentalOrderId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return { success: false, message: "Unauthorized", status: 401 };
        };

        const res = await fetch(`${BACKEND_URL}/api/payments/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ rentalOrderId }),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Failed to create payment session",
            };
        };

        return {
            success: true,
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    };
};