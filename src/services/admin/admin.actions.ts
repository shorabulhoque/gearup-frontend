/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function getAllUsers(queryParams?: { searchTerm?: string; page?: number; limit?: number }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const params = new URLSearchParams();
        if (queryParams?.searchTerm) params.append("searchTerm", queryParams.searchTerm);
        if (queryParams?.page) params.append("page", queryParams.page.toString());
        if (queryParams?.limit) params.append("limit", queryParams.limit.toString());

        const queryString = params.toString();
        const url = `${BACKEND_URL}/api/admin/users${queryString ? `?${queryString}` : ""}`;

        const res = await fetch(url, {
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
                meta: { page: 1, limit: 10, total: 0, totalPage: 1 }
            };
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Network error while fetching users.",
            data: [],
            meta: { page: 1, limit: 10, total: 0, totalPage: 1 }
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