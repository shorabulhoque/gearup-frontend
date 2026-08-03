export type OrderStatus =
    | "PLACED"
    | "CONFIRMED"
    | "CANCELLED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED";

export interface ProviderGearItem {
    id: string;
    title: string;
    images: string[];
}

export interface ProviderOrderItem {
    id: string;
    quantity: number;
    priceSnapshot: number;
    gearItem: ProviderGearItem;
}

export interface ProviderCustomer {
    name: string;
    email: string;
}

export interface ProviderOrder {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: OrderStatus;
    createdAt: string;
    customer: ProviderCustomer;
    items: ProviderOrderItem[];
}