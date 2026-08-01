import { IGearApiResponse, IGearItem, IGearQueryParams } from "@/types/gear.types";

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