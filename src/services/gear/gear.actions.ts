import { IApiResponse, IGearItem } from "@/types/gear.types";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function getAllGears(): Promise<IGearItem[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/gears`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch gears: ${res.statusText}`);
        };

        const result: IApiResponse<IGearItem[]> = await res.json();
        console.log(res.json(), "data from getAllGears");
        return result.data || [];
    } catch (error) {
        // console.error("Error fetching gears:", error);
        return [];
    };
};