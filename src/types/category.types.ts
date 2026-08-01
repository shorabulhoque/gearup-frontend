export interface ICategory {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface ICategoryApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ICategory[];
};