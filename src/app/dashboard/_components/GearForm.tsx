"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAllCategories } from "@/services/category/category.actions";

export interface GearFormData {
    title: string;
    description: string;
    brand: string;
    pricePerDay: number | "";
    stock: number | "";
    categoryId: string;
    images: string[];
}

interface GearFormProps {
    initialData?: GearFormData;
    onSubmit: (data: GearFormData) => Promise<{ success: boolean; message?: string }>;
    isEditMode?: boolean;
}

export default function GearForm({ initialData, onSubmit, isEditMode = false }: GearFormProps) {
    const router = useRouter();

    // Form state initialized with initialData if provided
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [brand, setBrand] = useState(initialData?.brand || "");
    const [pricePerDay, setPricePerDay] = useState<number | "">(initialData?.pricePerDay ?? "");
    const [stock, setStock] = useState<number | "">(initialData?.stock ?? "");
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
    const [images, setImages] = useState<string[]>(
        initialData?.images && initialData.images.length > 0 ? initialData.images : [""]
    );

    // Categories state
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                if (res?.data) {
                    setCategories(res.data);
                } else if (Array.isArray(res)) {
                    setCategories(res);
                }
            } catch (err) {
                toast.error("Failed to load categories");
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    // Handle dynamic image URL inputs
    const handleImageChange = (index: number, value: string) => {
        const updatedImages = [...images];
        updatedImages[index] = value;
        setImages(updatedImages);
    };

    const addImageField = () => setImages([...images, ""]);

    const removeImageField = (index: number) => {
        if (images.length === 1) return;
        setImages(images.filter((_, i) => i !== index));
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !brand || pricePerDay === "" || stock === "" || !categoryId) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const validImages = images.filter((img) => img.trim() !== "");
        if (validImages.length === 0) {
            toast.error("Please provide at least one image URL.");
            return;
        }

        const payload: GearFormData = {
            title,
            description,
            brand,
            pricePerDay,
            stock,
            categoryId,
            images: validImages,
        };

        setIsSubmitting(true);
        const res = await onSubmit(payload);
        setIsSubmitting(false);

        if (res.success) {
            toast.success(isEditMode ? "Gear updated successfully!" : "Gear created successfully!");
            router.push("/dashboard/my-gears");
        } else {
            toast.error(res.message || "Something went wrong.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 transition-colors duration-300">
            {/* Page Header */}
            <div className="border-b border-card-border pb-4">
                <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
                    {isEditMode ? "Edit Rental Gear" : "Add New Rental Gear"}
                </h1>
                <p className="text-sm text-text-muted mt-1">
                    {isEditMode
                        ? "Update the details for this rental equipment."
                        : "Fill out the form below to list a new piece of equipment for rent."}
                </p>
            </div>

            {/* Main Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
            >
                {/* Title & Brand */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Gear Title <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Ortlieb Waterproof Handlebar Bag 9L"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-muted/60"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Brand <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Ortlieb"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-muted/60"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Detailed description of the gear, features, condition..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-muted/60 resize-y"
                    />
                </div>

                {/* Pricing, Stock & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Price Per Day (CHF) <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="15.00"
                            value={pricePerDay}
                            onChange={(e) => setPricePerDay(e.target.value === "" ? "" : parseFloat(e.target.value))}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-muted/60"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Stock Quantity <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            placeholder="8"
                            value={stock}
                            onChange={(e) => setStock(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-muted/60"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Category <span className="text-danger">*</span>
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            disabled={loadingCategories}
                            className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            <option value="" disabled>
                                {loadingCategories ? "Loading categories..." : "Select Category"}
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Dynamic Image URLs */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Image URLs <span className="text-danger">*</span>
                        </label>
                        <button
                            type="button"
                            onClick={addImageField}
                            className="text-xs font-bold text-primary hover:underline cursor-pointer"
                        >
                            + Add Image Field
                        </button>
                    </div>

                    <div className="space-y-3">
                        {images.map((img, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    value={img}
                                    onChange={(e) => handleImageChange(idx, e.target.value)}
                                    required={idx === 0}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-muted/60"
                                />
                                {images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(idx)}
                                        className="px-3 py-2.5 text-xs font-bold text-danger bg-danger/10 hover:bg-danger/20 rounded-xl transition-colors cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-6 border-t border-card-border flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 text-xs font-bold text-text-muted hover:text-foreground bg-background border border-card-border rounded-xl transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 text-xs font-bold text-text-inverse bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? "Saving..." : isEditMode ? "Update Gear" : "Create Gear"}
                    </button>
                </div>
            </form>
        </div>
    );
}