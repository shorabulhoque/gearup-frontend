import { IUserData, IUserProfileAPIResponse } from "@/types/user.types";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";



export async function getCurrentUser(): Promise<IUserData | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        console.log(token, "token");
        if (!token) return null;

        const res = await fetch(`${BACKEND_URL}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return null;
        const result: IUserProfileAPIResponse = await res.json();
        return result.data || null;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    };
};