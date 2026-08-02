"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IGearItem } from "@/types/gear.types";
import { createRentalOrder } from "@/services/rental/rental.actions";
import { IUserData } from "@/types/user.types";

interface GearBookingCardProps {
    gear: IGearItem;
    currentUser: IUserData | null;
};

export default function GearBookingCard({ gear, currentUser }: GearBookingCardProps) {
    const router = useRouter();
    const pathname = usePathname();

    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const [startDate, setStartDate] = useState(todayStr);
    const [endDate, setEndDate] = useState(tomorrowStr);
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
        };

        if (!isCustomer) {
            setErrorMsg("Only customers are allowed to place rental orders.");
            return;
        };

        if (new Date(startDate) >= new Date(endDate)) {
            setErrorMsg("End date must be after start date.");
            return;
        };

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
                router.push("/dashboard/customer/rentals");
            }, 1500);
        } else {
            setErrorMsg(res.message || "Failed to place rental order.");
        };
    };

    return (
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white sticky top-24">
            {/* Price and stock status */}
            <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                    <span className="text-3xl font-extrabold text-gray-900">
                        CHF {gear.pricePerDay}
                    </span>
                    <span className="text-sm text-gray-500 font-medium"> / day</span>
                </div>
                <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${!isOutOfStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {!isOutOfStock ? `In Stock (${gear.stock})` : "Out of Stock"}
                </span>
            </div>

            {/* Alert message */}
            {errorMsg && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
                    {errorMsg}
                </div>
            )}
            {successMsg && (
                <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 rounded-lg border border-green-200">
                    {successMsg}
                </div>
            )}

            <div className="space-y-4">
                {/* Date selector */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            min={todayStr}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            min={startDate}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Quantity selector (Max limit: gear.stock) */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                        Quantity (Max {gear.stock})
                    </label>
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1 || isOutOfStock}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                        >
                            -
                        </button>
                        <span className="text-base font-semibold text-gray-800 w-8 text-center">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= gear.stock || isOutOfStock}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Price calculation */}
                <div className="bg-gray-50 rounded-xl p-4 mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>
                            CHF {gear.pricePerDay} x {rentalDays} {rentalDays > 1 ? "days" : "day"} (x{quantity})
                        </span>
                        <span className="font-semibold text-gray-800">CHF {totalPrice}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 text-base font-bold text-gray-900">
                        <span>Total Rent Amount</span>
                        <span>CHF {totalPrice}</span>
                    </div>
                </div>

                {/* Role and stock condition of the submit action button */}
                {isLoggedIn && !isCustomer ? (
                    <button
                        disabled
                        className="w-full mt-4 py-3 bg-gray-200 text-gray-500 font-semibold rounded-xl cursor-not-allowed border border-gray-300"
                    >
                        Only Customers Can Rent
                    </button>
                ) : (
                    <button
                        onClick={handleRentalSubmit}
                        disabled={isOutOfStock || loading}
                        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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