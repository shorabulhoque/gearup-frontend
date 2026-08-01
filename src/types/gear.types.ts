export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface IGearItem {
    id: string;
    title: string;
    description: string;
    brand: string;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    images: string[];
    categoryId: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export interface IApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
}