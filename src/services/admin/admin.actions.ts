/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "CUSTOMER" | "PROVIDER";
    status: "ACTIVE" | "SUSPENDED";
    createdAt: string;
}

export async function getAllUsers() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch users.",
                data: [],
            };
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Network error while fetching users.",
            data: [],
        };
    }
}

export async function updateUserStatus(userId: string, status: "ACTIVE" | "SUSPENDED") {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${BACKEND_URL}/api/admin/users/${userId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify({ status }),
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to update user status.",
            };
        }

        revalidatePath("/dashboard/admin/users");
        return {
            success: true,
            message: data.message || `User status updated to ${status}.`,
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Network error while updating user status.",
        };
    }
}