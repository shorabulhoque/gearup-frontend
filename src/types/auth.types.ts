export interface ILoginResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    } | null;
};

export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface IRegisterResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: {
        user: {
            _id: string;
            email: string;
            name: string;
            role: UserRole;
            status: string;
            createdAt: string;
            updatedAt: string;
        } | null;
    };
};