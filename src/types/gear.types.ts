export interface ICategory {
    id?: string;
    name: string;
    description?: string;
};

export interface IReviewRating {
    rating: number;
};

export interface IGearItem {
    id: string;
    title: string;
    description: string;
    brand: string;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    images: string[];
    createdAt: string;
    category: ICategory;
    reviews: IReviewRating[];
};

export interface IGearApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IGearItem[];
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
};

export interface IGearQueryParams {
    searchTerm?: string;
    categoryId?: string;
    minPrice?: string | number;
    maxPrice?: string | number;
    sort?: string;
    page?: string | number;
    limit?: string | number;
}