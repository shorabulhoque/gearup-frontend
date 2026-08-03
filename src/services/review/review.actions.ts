"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export interface IReviewItem {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    customer?: {
        id?: string;
        name?: string;
        email?: string;
        image?: string;
    };
    gearItem?: {
        id: string;
        title: string;
        images?: string[];
    };
}

/**
 * Fetch top/recent reviews for the Home Page
 */
export async function getAllReviews(limit: number = 6): Promise<{ success: boolean; data: IReviewItem[] }> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/reviews?limit=${limit}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return { success: false, data: [] };
        }

        const result = await res.json();
        return { success: true, data: result.data || [] };
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        return { success: false, data: [] };
    }
}

/**
 * Fetch all reviews for a specific gear item
 */
export async function getReviewsByGearId(gearItemId: string): Promise<IReviewItem[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/reviews/gear/${gearItemId}`, {
            cache: "no-store",
        });

        if (!res.ok) return [];

        const result = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching reviews for gear:", error);
        return [];
    }
}


export async function checkUserHasRented(gearItemId: string, token: string): Promise<boolean> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/rentals/check-rented/${gearItemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return false;
        const result = await res.json();
        return result.data?.hasRented || false;
    } catch (error) {
        return false;
    }
}


export async function createReviewAction(payload: { gearItemId: string; rating: number; comment: string }, token: string) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (res.ok) {
            revalidatePath(`/gears/${payload.gearItemId}`);
        }

        return result;
    } catch (error) {
        return { success: false, message: "Failed to submit review" };
    }
}