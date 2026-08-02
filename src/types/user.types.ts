export interface IUserData {
    id: string;
    email: string;
    name: string;
    role: "CUSTOMER" | "ADMIN" | "PROVIDER" | string;
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
