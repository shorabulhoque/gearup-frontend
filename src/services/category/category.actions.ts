"use server";
import { ICategory, ICategoryApiResponse } from "@/types/category.types";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function getAllCategories(): Promise<ICategory[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/categories`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.statusText}`);
        };

        const result: ICategoryApiResponse = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    };
};

export async function createCategoryAction(payload: { name: string; description?: string }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return {
                success: false,
                message: "Authentication token missing. Please log in as an Admin.",
            };
        }

        const res = await fetch(`${BACKEND_URL}/api/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (res.ok) {
            // Revalidate cached categories so newly added category shows up immediately
            // revalidatePath("/categories");
            // revalidatePath("/gears");
            return {
                success: true,
                message: result.message || "Category created successfully!",
                data: result.data as ICategory,
            };
        }

        return {
            success: false,
            message: result.message || "Failed to create category.",
        };
    } catch (error) {
        console.error("Error creating category:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}