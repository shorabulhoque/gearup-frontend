import { ICategory, ICategoryApiResponse } from "@/types/category.types";

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