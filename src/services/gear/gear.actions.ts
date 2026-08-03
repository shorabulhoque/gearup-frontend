/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { IGearApiResponse, IGearItem, IGearQueryParams } from "@/types/gear.types";
// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function getAllGears(queryParams?: IGearQueryParams): Promise<IGearApiResponse> {
    try {
        const params = new URLSearchParams();

        if (queryParams?.searchTerm) params.append("searchTerm", queryParams.searchTerm);
        if (queryParams?.categoryId) params.append("categoryId", queryParams.categoryId);
        if (queryParams?.minPrice) params.append("minPrice", queryParams.minPrice.toString());
        if (queryParams?.maxPrice) params.append("maxPrice", queryParams.maxPrice.toString());
        if (queryParams?.sort) params.append("sort", queryParams.sort);
        if (queryParams?.page) params.append("page", queryParams.page.toString());
        if (queryParams?.limit) params.append("limit", queryParams.limit.toString());

        const queryString = params.toString();
        const url = `${BACKEND_URL}/api/gears${queryString ? `?${queryString}` : ""}`;

        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch gears: ${res.statusText}`);
        };

        const result: IGearApiResponse = await res.json();

        return result;
    } catch (error) {
        console.error("Error fetching gears:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Error fetching gears",
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    };
};

export async function getGearById(id: string): Promise<IGearItem | null> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/gears/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const result = await res.json();
        return result.data || null;
    } catch (error) {
        console.error("Error fetching gear details:", error);
        return null;
    }
}

export async function createGear(data: any) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        const res = await fetch(`${BACKEND_URL}/api/gears/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (!res.ok) {
            return { success: false, message: result.message || "Failed to create gear" };
        }

        // revalidatePath("/dashboard/manage-gears");
        return { success: true, message: "Gear created successfully!", data: result };
    } catch (error: any) {
        return { success: false, message: error.message || "Network error" };
    }
};

export async function fetchMyGears(queryParams?: { searchTerm?: string; page?: number; limit?: number }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const params = new URLSearchParams();
        if (queryParams?.searchTerm) params.append("searchTerm", queryParams.searchTerm);
        if (queryParams?.page) params.append("page", queryParams.page.toString());
        if (queryParams?.limit) params.append("limit", queryParams.limit.toString());

        const queryString = params.toString();
        const url = `${BACKEND_URL}/api/gears/my-gears${queryString ? `?${queryString}` : ""}`;

        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch your gear items.",
                data: [],
                meta: { page: 1, limit: 10, total: 0 }
            };
        }

        return data;
    } catch (error: any) {
        console.error("Error in fetchMyGears:", error);
        return {
            success: false,
            message: error.message || "Network error while loading inventory.",
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    }
}

export async function deleteGear(id: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${BACKEND_URL}/api/gears/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to delete gear item." };
        }

        // revalidatePath("/dashboard/manage-gears");
        return { success: true, message: "Gear item deleted successfully!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Network error" };
    }
}

export async function updateGear(id: string, payload: any) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        // FIXED: Added missing '/api' prefix
        const res = await fetch(`${BACKEND_URL}/api/gears/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to update gear item.",
            };
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to update gear item.",
        };
    }
}