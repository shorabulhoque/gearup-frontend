"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { OrderStatus, ProviderOrder } from "@/types/provider-order";
import { updateOrderStatus } from "@/services/order/order.actions";

interface ProviderOrdersClientProps {
    initialOrders: ProviderOrder[];
}

export default function ProviderOrdersClient({ initialOrders }: ProviderOrdersClientProps) {
    const [orders, setOrders] = useState<ProviderOrder[]>(initialOrders);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    // Call Server Action to update status
    const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
        setLoadingId(orderId);

        const res = await updateOrderStatus(orderId, newStatus);

        setLoadingId(null);

        if (res.success) {
            toast.success(res.message);
            // Optimistic / Local UI update
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } else {
            toast.error(res.message);
        }
    };

    const getStatusBadge = (status: OrderStatus) => {
        switch (status) {
            case "PLACED":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "CONFIRMED":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "PAID":
                return "bg-indigo-100 text-indigo-800 border-indigo-200";
            case "PICKED_UP":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "RETURNED":
                return "bg-green-100 text-green-800 border-green-200";
            case "CANCELLED":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Rental Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track customer rental requests and update order lifecycle status.
                    </p>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 self-start sm:self-auto">
                    Total Orders: <span className="font-bold text-gray-900">{orders.length}</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500 font-medium text-lg">No customer rental orders found.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const isUpdating = loadingId === order.id;

                        return (
                            <div
                                key={order.id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Card Header */}
                                <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Order ID:
                                            </span>
                                            <span className="text-xs font-mono font-medium text-gray-700">
                                                {order.id}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Placed on:{" "}
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusBadge(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Main Content Body */}
                                <div className="p-6 space-y-6">
                                    {/* Customer & Dates Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Customer Info
                                            </span>
                                            <p className="text-sm font-bold text-gray-900">
                                                {order.customer.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {order.customer.email}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Rental Period
                                            </span>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {new Date(order.startDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}{" "}
                                                -{" "}
                                                {new Date(order.endDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        <div className="space-y-1 md:text-right">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                Total Price
                                            </span>
                                            <p className="text-lg font-extrabold text-blue-600">
                                                ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Ordered Items ({order.items.length})
                                        </h3>
                                        <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="p-3 bg-white flex items-center justify-between gap-4"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                                                            {item.gearItem.images?.[0] ? (
                                                                <Image
                                                                    unoptimized
                                                                    src={item.gearItem.images[0]}
                                                                    alt={item.gearItem.title}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                                    No Image
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                                                {item.gearItem.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                                                                Gear ID: {item.gearItem.id}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right shrink-0">
                                                        <p className="text-sm font-bold text-gray-800">
                                                            ${item.priceSnapshot}{" "}
                                                            <span className="text-xs text-gray-500 font-normal">
                                                                × {item.quantity}
                                                            </span>
                                                        </p>
                                                        <p className="text-xs font-semibold text-gray-600">
                                                            Subtotal: ${(item.priceSnapshot * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lifecycle Action Buttons */}
                                    <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                        <div className="text-xs text-gray-500">
                                            {order.status === "PLACED" && (
                                                <span className="text-amber-600 font-medium">
                                                    Action required: Confirm or cancel this request.
                                                </span>
                                            )}
                                            {order.status === "CONFIRMED" && (
                                                <span className="text-blue-600 font-medium">
                                                    Waiting for customer to complete payment.
                                                </span>
                                            )}
                                            {order.status === "PAID" && (
                                                <span className="text-indigo-600 font-medium">
                                                    Customer paid! Hand over gear and mark as picked up.
                                                </span>
                                            )}
                                            {order.status === "PICKED_UP" && (
                                                <span className="text-purple-600 font-medium">
                                                    Gear is currently with customer. Mark returned once received.
                                                </span>
                                            )}
                                            {(order.status === "RETURNED" || order.status === "CANCELLED") && (
                                                <span className="text-gray-400">
                                                    This order cycle is completed.
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {order.status === "PLACED" && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                                                        disabled={isUpdating}
                                                        className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors disabled:opacity-50"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(order.id, "CONFIRMED")}
                                                        disabled={isUpdating}
                                                        className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
                                                    >
                                                        {isUpdating ? "Updating..." : "Confirm Order"}
                                                    </button>
                                                </>
                                            )}

                                            {order.status === "CONFIRMED" && (
                                                <button
                                                    disabled
                                                    className="px-4 py-2 text-xs font-bold text-gray-400 bg-gray-100 rounded-xl cursor-not-allowed border border-gray-200"
                                                >
                                                    Awaiting Customer Payment
                                                </button>
                                            )}

                                            {order.status === "PAID" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, "PICKED_UP")}
                                                    disabled={isUpdating}
                                                    className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
                                                >
                                                    {isUpdating ? "Updating..." : "Mark as PICKED UP"}
                                                </button>
                                            )}

                                            {order.status === "PICKED_UP" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, "RETURNED")}
                                                    disabled={isUpdating}
                                                    className="px-4 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
                                                >
                                                    {isUpdating ? "Updating..." : "Mark as RETURNED"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}