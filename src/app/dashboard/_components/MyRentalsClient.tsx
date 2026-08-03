"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPaymentSession } from "@/services/payment/payment.actions";

interface GearItem {
    id: string;
    title: string;
    brand: string;
    images: string[];
}

interface RentalItem {
    id: string;
    quantity: number;
    priceSnapshot: number;
    gearItem: GearItem;
}

export interface RentalOrder {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: "PLACED" | "CONFIRMED" | "CANCELLED" | "PAID" | "PICKED_UP" | "RETURNED";
    createdAt: string;
    items: RentalItem[];
}

interface MyRentalsClientProps {
    rentals: RentalOrder[];
}

export function MyRentalsClient({ rentals }: MyRentalsClientProps) {
    const [paymentLoadingId, setPaymentLoadingId] = useState<string | null>(null);

    const handlePayment = async (rentalOrderId: string) => {
        setPaymentLoadingId(rentalOrderId);
        const res = await createPaymentSession(rentalOrderId);
        setPaymentLoadingId(null);

        if (res.success && res.data?.paymentUrl) {
            window.location.assign(res.data.paymentUrl);
        } else {
            alert(res.message || "Could not initiate payment session.");
        }
    };

    const getStatusBadge = (status: RentalOrder["status"]) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-accent/10 text-accent border-accent/20";
            case "PAID":
                return "bg-success/10 text-success border-success/20";
            case "CANCELLED":
                return "bg-danger/10 text-danger border-danger/20";
            case "PICKED_UP":
                return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
            case "RETURNED":
                return "bg-card-bg text-text-muted border-card-border";
            default:
                return "bg-warning/10 text-warning border-warning/20";
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-foreground mb-6">My Rentals</h1>

            {rentals.length === 0 ? (
                <div className="text-center py-16 bg-card-bg rounded-2xl border border-card-border shadow-xs">
                    <p className="text-text-muted text-lg font-medium">
                        You haven&apos;t placed any rental orders yet.
                    </p>
                    <Link
                        href="/gear"
                        className="mt-4 inline-block px-6 py-2.5 bg-primary hover:bg-primary-hover text-text-inverse font-semibold text-sm rounded-xl transition shadow-sm shadow-primary/20"
                    >
                        Browse Gears
                    </Link>
                </div>
            ) : (
                rentals.map((order) => {
                    const isPayable = order.status === "CONFIRMED";

                    const formattedOrderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    });
                    const formattedStartDate = new Date(order.startDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                    });
                    const formattedEndDate = new Date(order.endDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    });

                    return (
                        <div
                            key={order.id}
                            className="bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-xs transition-colors duration-300"
                        >
                            {/* Order Header */}
                            <div className="bg-background px-6 py-4 border-b border-card-border flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-text-muted">
                                <div className="flex flex-wrap items-center gap-6">
                                    <div>
                                        <span className="block text-text-muted uppercase tracking-wider text-[10px] font-semibold">
                                            Order Placed
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {formattedOrderDate}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-text-muted uppercase tracking-wider text-[10px] font-semibold">
                                            Total
                                        </span>
                                        <span className="font-bold text-foreground">
                                            CHF {order.totalPrice}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-text-muted uppercase tracking-wider text-[10px] font-semibold">
                                            Rental Period
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {formattedStartDate} - {formattedEndDate}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>

                                    <button
                                        onClick={() => handlePayment(order.id)}
                                        disabled={!isPayable || paymentLoadingId === order.id}
                                        className={`px-4 py-2 rounded-xl font-semibold text-xs transition shadow-xs ${isPayable
                                            ? "bg-warning text-text-inverse hover:brightness-110 cursor-pointer"
                                            : "bg-card-bg text-text-muted cursor-not-allowed border border-card-border"
                                            }`}
                                    >
                                        {paymentLoadingId === order.id
                                            ? "Redirecting..."
                                            : isPayable
                                                ? "Pay Now"
                                                : order.status === "PAID"
                                                    ? "Paid"
                                                    : "Pay Disabled"}
                                    </button>
                                </div>
                            </div>

                            {/* Rental Items Listing */}
                            <div className="p-6 divide-y divide-card-border">
                                {order.items.map((item) => {
                                    const itemImage =
                                        item.gearItem?.images && item.gearItem.images.length > 0
                                            ? item.gearItem.images[0]
                                            : "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";

                                    return (
                                        <div
                                            key={item.id}
                                            className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="relative w-20 h-20 bg-background rounded-xl overflow-hidden border border-card-border flex-shrink-0">
                                                    <Image
                                                        unoptimized
                                                        src={itemImage}
                                                        alt={item.gearItem?.title || "Gear Image"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                                        {item.gearItem?.brand}
                                                    </span>
                                                    <h3 className="text-base font-bold text-foreground mt-1">
                                                        {item.gearItem?.title}
                                                    </h3>
                                                    <div className="text-xs text-text-muted mt-1 space-x-3">
                                                        <span>
                                                            Qty: <strong className="text-foreground">{item.quantity}</strong>
                                                        </span>
                                                        <span>
                                                            Price Snapshot:{" "}
                                                            <strong className="text-foreground">CHF {item.priceSnapshot}</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rent Again Action */}
                                            <div className="sm:text-right w-full sm:w-auto">
                                                <Link
                                                    href={`/gear/${item.gearItem?.id}`}
                                                    className="inline-block px-4 py-2 border border-card-border rounded-xl text-xs font-semibold text-foreground hover:bg-background transition text-center w-full sm:w-auto"
                                                >
                                                    Rent Again
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}