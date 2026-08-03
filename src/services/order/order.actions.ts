/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { OrderStatus, ProviderOrder } from "@/types/provider-order";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function getProviderOrders(): Promise<ProviderOrder[]> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) return [];

        const res = await fetch(`${BACKEND_URL}/api/rentals/provider-orders`, {
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return [];

        const result = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching provider orders:", error);
        return [];
    }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return { success: false, message: "Unauthorized: Token missing" };
        }

        const res = await fetch(`${BACKEND_URL}/api/rentals/${orderId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify({ status }),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Failed to update order status",
            };
        }

        // Revalidate the provider page to keep data fresh
        revalidatePath("/dashboard/manage-gears");

        return {
            success: true,
            message: `Order status updated to ${status}`,
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong while updating status",
        };
    }
}