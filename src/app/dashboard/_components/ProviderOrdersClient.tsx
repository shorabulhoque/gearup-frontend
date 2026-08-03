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
                return "bg-warning/10 text-warning border-warning/20";
            case "CONFIRMED":
                return "bg-accent/10 text-accent border-accent/20";
            case "PAID":
                return "bg-info/10 text-info border-info/20";
            case "PICKED_UP":
                return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
            case "RETURNED":
                return "bg-success/10 text-success border-success/20";
            case "CANCELLED":
                return "bg-danger/10 text-danger border-danger/20";
            default:
                return "bg-card-bg text-text-muted border-card-border";
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6 transition-colors duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border pb-5">
                <div>
                    <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
                        Manage Rental Orders
                    </h1>
                    <p className="text-sm text-text-muted mt-1">
                        Track customer rental requests and update order lifecycle status.
                    </p>
                </div>
                <div className="text-sm text-text-muted bg-card-bg px-4 py-2 rounded-xl border border-card-border self-start sm:self-auto">
                    Total Orders: <span className="font-bold text-foreground">{orders.length}</span>
                </div>
            </div>

            {/* Empty State */}
            {orders.length === 0 ? (
                <div className="text-center py-16 bg-card-bg rounded-2xl border border-card-border shadow-xs">
                    <p className="text-text-muted font-medium text-lg">No customer rental orders found.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const isUpdating = loadingId === order.id;

                        return (
                            <div
                                key={order.id}
                                className="bg-card-bg border border-card-border rounded-2xl shadow-xs overflow-hidden hover:border-primary/40 transition-all duration-200"
                            >
                                {/* Card Header */}
                                <div className="bg-background px-6 py-4 border-b border-card-border flex flex-wrap items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                                Order ID:
                                            </span>
                                            <span className="text-xs font-mono font-medium text-foreground">
                                                {order.id}
                                            </span>
                                        </div>
                                        <p className="text-xs text-text-muted">
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-background border border-card-border">
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                                Customer Info
                                            </span>
                                            <p className="text-sm font-bold text-foreground">
                                                {order.customer.name}
                                            </p>
                                            <p className="text-xs text-text-muted">
                                                {order.customer.email}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                                Rental Period
                                            </span>
                                            <p className="text-sm font-semibold text-foreground">
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
                                            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                                Total Price
                                            </span>
                                            <p className="text-lg font-extrabold text-primary">
                                                CHF {order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                            Ordered Items ({order.items.length})
                                        </h3>
                                        <div className="divide-y divide-card-border border border-card-border rounded-xl overflow-hidden">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="p-3 bg-background flex items-center justify-between gap-4"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-card-bg border border-card-border shrink-0">
                                                            {item.gearItem.images?.[0] ? (
                                                                <Image
                                                                    unoptimized
                                                                    src={item.gearItem.images[0]}
                                                                    alt={item.gearItem.title}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-xs text-text-muted">
                                                                    No Image
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                                                                {item.gearItem.title}
                                                            </h4>
                                                            <p className="text-xs text-text-muted font-mono mt-0.5">
                                                                Gear ID: {item.gearItem.id}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right shrink-0">
                                                        <p className="text-sm font-bold text-foreground">
                                                            CHF {item.priceSnapshot}{" "}
                                                            <span className="text-xs text-text-muted font-normal">
                                                                × {item.quantity}
                                                            </span>
                                                        </p>
                                                        <p className="text-xs font-semibold text-primary">
                                                            Subtotal: CHF {(item.priceSnapshot * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lifecycle Action Buttons */}
                                    <div className="pt-4 border-t border-card-border flex flex-wrap items-center justify-between gap-4">
                                        <div className="text-xs text-text-muted">
                                            {order.status === "PLACED" && (
                                                <span className="text-warning font-semibold">
                                                    Action required: Confirm or cancel this request.
                                                </span>
                                            )}
                                            {order.status === "CONFIRMED" && (
                                                <span className="text-accent font-semibold">
                                                    Waiting for customer to complete payment.
                                                </span>
                                            )}
                                            {order.status === "PAID" && (
                                                <span className="text-info font-semibold">
                                                    Customer paid! Hand over gear and mark as picked up.
                                                </span>
                                            )}
                                            {order.status === "PICKED_UP" && (
                                                <span className="text-purple-500 font-semibold">
                                                    Gear is currently with customer. Mark returned once received.
                                                </span>
                                            )}
                                            {(order.status === "RETURNED" || order.status === "CANCELLED") && (
                                                <span className="text-text-muted">
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
                                                        className="px-4 py-2 text-xs font-bold text-danger bg-danger/10 hover:bg-danger/20 border border-danger/20 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(order.id, "CONFIRMED")}
                                                        disabled={isUpdating}
                                                        className="px-4 py-2 text-xs font-bold text-text-inverse bg-accent hover:bg-accent/90 rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                                                    >
                                                        {isUpdating ? "Updating..." : "Confirm Order"}
                                                    </button>
                                                </>
                                            )}

                                            {order.status === "CONFIRMED" && (
                                                <button
                                                    disabled
                                                    className="px-4 py-2 text-xs font-bold text-text-muted bg-background rounded-xl cursor-not-allowed border border-card-border"
                                                >
                                                    Awaiting Customer Payment
                                                </button>
                                            )}

                                            {order.status === "PAID" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, "PICKED_UP")}
                                                    disabled={isUpdating}
                                                    className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                                                >
                                                    {isUpdating ? "Updating..." : "Mark as PICKED UP"}
                                                </button>
                                            )}

                                            {order.status === "PICKED_UP" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, "RETURNED")}
                                                    disabled={isUpdating}
                                                    className="px-4 py-2 text-xs font-bold text-text-inverse bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
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