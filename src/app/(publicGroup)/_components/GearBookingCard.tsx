"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IGearItem } from "@/types/gear.types";
import { createRentalOrder } from "@/services/rental/rental.actions";
import { IUserData } from "@/types/user.types";

interface GearBookingCardProps {
    gear: IGearItem;
    currentUser: IUserData | null;
}

export default function GearBookingCard({ gear, currentUser }: GearBookingCardProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    });

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const isLoggedIn = !!currentUser;
    const isCustomer = currentUser?.role === "CUSTOMER";
    const isOutOfStock = !gear.isAvailable || gear.stock <= 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const rentalDays = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));

    const totalPrice = gear.pricePerDay * quantity * rentalDays;

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => {
            const next = prev + delta;
            if (next < 1) return 1;
            if (next > gear.stock) return gear.stock;
            return next;
        });
    };

    const handleRentalSubmit = async () => {
        setErrorMsg("");
        setSuccessMsg("");

        if (!isLoggedIn) {
            const redirectUrl = encodeURIComponent(pathname);
            router.push(`/login?redirect=${redirectUrl}`);
            return;
        }

        if (!isCustomer) {
            setErrorMsg("Only customers are allowed to place rental orders.");
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            setErrorMsg("End date must be after start date.");
            return;
        }

        setLoading(true);

        const payload = {
            startDate: new Date(`${startDate}T10:00:00.000Z`).toISOString(),
            endDate: new Date(`${endDate}T10:00:00.000Z`).toISOString(),
            items: [
                {
                    gearItemId: gear.id,
                    quantity,
                },
            ],
        };

        const res = await createRentalOrder(payload);
        setLoading(false);

        if (res.success) {
            setSuccessMsg("Rental order placed successfully!");
            setTimeout(() => {
                router.push("/dashboard/my-rentals");
            }, 1500);
        } else {
            setErrorMsg(res.message || "Failed to place rental order.");
        }
    };

    return (
        <div className="border border-card-border rounded-2xl p-6 shadow-md bg-card-bg sticky top-24 transition-colors">
            {/* Price and stock status */}
            <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-card-border">
                <div>
                    <span className="text-3xl font-extrabold text-foreground">
                        CHF {gear.pricePerDay}
                    </span>
                    <span className="text-sm text-text-muted font-medium"> / day</span>
                </div>
                <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${!isOutOfStock
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-danger/10 text-danger border-danger/20"
                        }`}
                >
                    {!isOutOfStock ? `In Stock (${gear.stock})` : "Out of Stock"}
                </span>
            </div>

            {/* Alert message */}
            {errorMsg && (
                <div className="mb-4 p-3 text-sm text-danger bg-danger/10 rounded-xl border border-danger/20">
                    {errorMsg}
                </div>
            )}
            {successMsg && (
                <div className="mb-4 p-3 text-sm text-success bg-success/10 rounded-xl border border-success/20">
                    {successMsg}
                </div>
            )}

            <div className="space-y-4">
                {/* Date selector */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            min={startDate}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-background border border-card-border text-foreground rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            min={startDate}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full bg-background border border-card-border text-foreground rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
                        />
                    </div>
                </div>

                {/* Quantity selector */}
                <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                        Quantity (Max {gear.stock})
                    </label>
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1 || isOutOfStock}
                            className="w-10 h-10 rounded-xl border border-card-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-card-border disabled:opacity-40 transition"
                        >
                            -
                        </button>
                        <span className="text-base font-semibold text-foreground w-8 text-center">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= gear.stock || isOutOfStock}
                            className="w-10 h-10 rounded-xl border border-card-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-card-border disabled:opacity-40 transition"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Price calculation */}
                <div className="bg-background rounded-xl p-4 mt-4 space-y-2 text-sm text-text-muted border border-card-border">
                    <div className="flex justify-between">
                        <span>
                            CHF {gear.pricePerDay} x {rentalDays} {rentalDays > 1 ? "days" : "day"} (x{quantity})
                        </span>
                        <span className="font-semibold text-foreground">CHF {totalPrice}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-card-border text-base font-bold text-foreground">
                        <span>Total Rent Amount</span>
                        <span className="text-primary">CHF {totalPrice}</span>
                    </div>
                </div>

                {/* Submit action button */}
                {isLoggedIn && !isCustomer ? (
                    <button
                        disabled
                        className="w-full mt-4 py-3 bg-card-border text-text-muted font-semibold rounded-xl cursor-not-allowed border border-card-border"
                    >
                        Only Customers Can Rent
                    </button>
                ) : (
                    <button
                        onClick={handleRentalSubmit}
                        disabled={isOutOfStock || loading}
                        className="w-full mt-4 py-3 bg-primary hover:bg-primary-hover text-text-inverse font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? "Placing Order..."
                            : isOutOfStock
                                ? "Out of Stock"
                                : isLoggedIn
                                    ? "Confirm Rental Request"
                                    : "Log in to Rent"}
                    </button>
                )}
            </div>
        </div>
    );
}