/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

interface CreateRentalPayload {
    startDate: string;
    endDate: string;
    items: {
        gearItemId: string;
        quantity: number;
    }[];
}

export async function createRentalOrder(payload: CreateRentalPayload) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return { success: false, message: "Unauthorized", status: 401 };
        };

        const res = await fetch(`${BACKEND_URL}/api/rentals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Failed to place rental order",
                status: res.status,
            };
        };

        return {
            success: true,
            data: result.data,
            message: result.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    };
};

export async function getMyRentals() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) return [];

        const res = await fetch(`${BACKEND_URL}/api/rentals/my-rentals`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return [];

        const result = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching my rentals:", error);
        return [];
    };
};