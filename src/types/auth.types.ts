export interface ILoginResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    } | null;
}