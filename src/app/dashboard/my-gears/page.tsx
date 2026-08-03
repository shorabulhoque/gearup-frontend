"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Trash2, Edit3, Search, RefreshCw, Package } from "lucide-react";
import { fetchMyGears, deleteGear } from "@/services/gear/gear.actions";

interface Category {
    name: string;
}

interface GearItem {
    id: string;
    title: string;
    description: string;
    brand: string;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    images?: string[];
    category?: Category;
    createdAt: string;
}

interface Meta {
    page: number;
    limit: number;
    total: number;
}

export default function MyGearsPage() {
    const [gears, setGears] = useState<GearItem[]>([]);
    const [meta, setMeta] = useState<Meta>({ page: 1, limit: 10, total: 0 });
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch provider's own gear items
    const loadGears = useCallback(async () => {
        setLoading(true);
        const res = await fetchMyGears({ searchTerm });
        if (res.success) {
            setGears(res.data || []);
            if (res.meta) setMeta(res.meta);
        } else {
            toast.error(res.message || "Failed to fetch gear items.", {
                duration: 4000,
            });
        }
        setLoading(false);
    }, [searchTerm]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            loadGears();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [loadGears]);

    // Handle Delete Action with Sonner Promise / Loading Toasts
    // const handleDelete = async (id: string, title: string) => {
    //     if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    //     setDeletingId(id);
    //     const toastId = toast.loading(`Deleting "${title}"...`);

    //     try {
    //         const res = await deleteGear(id);
    //         if (res.success) {
    //             toast.success(res.message || "Gear item deleted successfully!", {
    //                 id: toastId,
    //                 duration: 3000,
    //             });
    //             setGears((prev) => prev.filter((gear) => gear.id !== id));
    //             setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    //         } else {
    //             toast.error(res.message || "Failed to delete gear item.", {
    //                 id: toastId,
    //                 duration: 4000,
    //             });
    //         }
    //     } catch (error) {
    //         toast.error("An error occurred while deleting the gear item.", {
    //             id: toastId,
    //             duration: 4000,
    //         });
    //     } finally {
    //         setDeletingId(null);
    //     }
    // };

    // Handle Delete Action with Sonner Confirmation Toast
    const handleDelete = (id: string, title: string) => {
        toast(`Delete "${title}"?`, {
            description: "This action cannot be undone.",
            duration: 8000,
            action: {
                label: "Delete",
                onClick: async () => {
                    setDeletingId(id);
                    const toastId = toast.loading(`Deleting "${title}"...`);

                    try {
                        const res = await deleteGear(id);
                        if (res.success) {
                            toast.success(res.message || "Gear item deleted successfully!", {
                                id: toastId,
                                duration: 3000,
                            });
                            setGears((prev) => prev.filter((gear) => gear.id !== id));
                            setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
                        } else {
                            toast.error(res.message || "Failed to delete gear item.", {
                                id: toastId,
                                duration: 4000,
                            });
                        }
                    } catch (error) {
                        toast.error("An error occurred while deleting the gear item.", {
                            id: toastId,
                            duration: 4000,
                        });
                    } finally {
                        setDeletingId(null);
                    }
                },
            },
            cancel: {
                label: "Cancel",
                onClick: () => {
                    toast.dismiss();
                },
            },
        });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6 transition-colors duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border pb-5">
                <div>
                    <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
                        My Gear Inventory
                    </h1>
                    <p className="text-sm text-text-muted mt-1">
                        Manage, edit, or track all gear items listed under your provider account.
                    </p>
                </div>

                <Link
                    href="/dashboard/create-gear"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-text-inverse bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    Add New Gear
                </Link>
            </div>

            {/* Controls Bar: Search & Counter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search your gear by title or brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-card-border bg-card-bg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-muted/60"
                    />
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-text-muted">
                    <button
                        onClick={() => {
                            toast.info("Refreshing inventory...", { duration: 1500 });
                            loadGears();
                        }}
                        className="p-2.5 bg-card-bg border border-card-border rounded-xl hover:text-foreground transition-colors cursor-pointer"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                    <span className="bg-card-bg border border-card-border px-3 py-2 rounded-xl font-medium">
                        Total Items: <strong className="text-foreground">{meta.total || gears.length}</strong>
                    </span>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                /* Skeleton Loader */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="bg-card-bg border border-card-border rounded-2xl p-4 animate-pulse space-y-4"
                        >
                            <div className="w-full h-44 bg-background rounded-xl" />
                            <div className="h-5 bg-background rounded-md w-3/4" />
                            <div className="h-4 bg-background rounded-md w-1/2" />
                            <div className="h-8 bg-background rounded-xl w-full" />
                        </div>
                    ))}
                </div>
            ) : gears.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16 bg-card-bg rounded-2xl border border-card-border shadow-xs space-y-4">
                    <div className="w-12 h-12 rounded-full bg-background border border-card-border flex items-center justify-center mx-auto text-text-muted">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-foreground">No gear found</h3>
                        <p className="text-sm text-text-muted mt-1 max-w-sm mx-auto">
                            {searchTerm
                                ? "No items matched your search query. Try clearing filters."
                                : "You haven't added any gear items to your inventory yet."}
                        </p>
                    </div>
                    {!searchTerm && (
                        <Link
                            href="/dashboard/manage-gears/create"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-text-inverse bg-primary hover:bg-primary-hover rounded-xl transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Listing
                        </Link>
                    )}
                </div>
            ) : (
                /* Gear Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gears.map((gear) => (
                        <div
                            key={gear.id}
                            className="bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-xs hover:border-primary/40 transition-all duration-200 flex flex-col justify-between group"
                        >
                            {/* Card Body */}
                            <div>
                                {/* Image Box */}
                                <div className="relative w-full h-48 bg-background border-b border-card-border overflow-hidden">
                                    {gear.images?.[0] ? (
                                        <Image
                                            unoptimized
                                            src={gear.images[0]}
                                            alt={gear.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-text-muted">
                                            No Image Available
                                        </div>
                                    )}

                                    {/* Availability Tag */}
                                    <span
                                        className={`absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold rounded-full border backdrop-blur-md ${gear.stock > 0
                                            ? "bg-success/10 text-success border-success/30"
                                            : "bg-danger/10 text-danger border-danger/30"
                                            }`}
                                    >
                                        {gear.stock > 0 ? `In Stock (${gear.stock})` : "Out of Stock"}
                                    </span>

                                    {/* Category Tag */}
                                    {gear.category?.name && (
                                        <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-card-bg/90 text-foreground border border-card-border backdrop-blur-md">
                                            {gear.category.name}
                                        </span>
                                    )}
                                </div>

                                {/* Gear Details */}
                                <div className="p-5 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-text-muted font-medium">
                                        <span>Brand: <strong className="text-foreground">{gear.brand}</strong></span>
                                        <span className="text-primary font-bold text-sm">
                                            CHF {gear.pricePerDay.toFixed(2)} <span className="text-xs font-normal text-text-muted">/ day</span>
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-foreground line-clamp-1" title={gear.title}>
                                        {gear.title}
                                    </h3>

                                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                                        {gear.description}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="p-4 bg-background border-t border-card-border flex items-center justify-between gap-3">
                                <span className="text-[11px] font-mono text-text-muted truncate max-w-[120px]">
                                    ID: {gear.id}
                                </span>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/dashboard/my-gears/${gear.id}`}
                                        className="p-2 text-xs font-semibold text-foreground bg-card-bg hover:bg-card-border border border-card-border rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                                        title="Edit Gear"
                                    >
                                        <Edit3 className="w-3.5 h-3.5 text-text-muted" />
                                        <span>Edit</span>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(gear.id, gear.title)}
                                        disabled={deletingId === gear.id}
                                        className="p-2 text-xs font-semibold text-danger bg-danger/10 hover:bg-danger/20 border border-danger/20 rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                                        title="Delete Gear"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>{deletingId === gear.id ? "Deleting..." : "Delete"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}