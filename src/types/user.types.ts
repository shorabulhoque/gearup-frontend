export type UserRole = "ADMIN" | "PROVIDER" | "CUSTOMER";
export interface IUserData {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    status: "ACTIVE" | "SUSPENDED" | string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserProfileAPIResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IUserData;
}
