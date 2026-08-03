"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Category {
    id: string;
    name: string;
}

interface GearFilterSidebarProps {
    categories: Category[];
}

export default function GearFilterSidebar({ categories }: GearFilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoryId") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "newest");

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (searchTerm) params.set("searchTerm", searchTerm);
        if (selectedCategory) params.set("categoryId", selectedCategory);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sort) params.set("sort", sort);

        params.set("page", "1");

        router.push(`/gear?${params.toString()}`);
    };

    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSort("newest");
        router.push("/gear");
    };

    return (
        <aside className="w-full bg-card-bg border border-card-border rounded-2xl p-5 shadow-sm space-y-5 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
                <h2 className="font-bold text-lg text-foreground">Filters</h2>
                <button
                    onClick={handleReset}
                    className="text-xs text-primary hover:text-primary-hover font-medium transition-colors"
                >
                    Reset All
                </button>
            </div>

            {/* Search Input */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Search
                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Title, brand..."
                    className="w-full text-sm bg-background border border-card-border text-foreground rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none transition"
                />
            </div>

            {/* Sorting Dropdown */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Sort By
                </label>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full text-sm bg-background border border-card-border text-foreground rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none transition"
                >
                    <option value="newest">Latest Added</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Category Filter */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Category
                </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-sm bg-background border border-card-border text-foreground rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none transition"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Price Per Day (CHF)
                </label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 text-sm bg-background border border-card-border text-foreground rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none transition"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 text-sm bg-background border border-card-border text-foreground rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none transition"
                    />
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={applyFilters}
                className="w-full bg-primary hover:bg-primary-hover text-text-inverse font-semibold py-2.5 rounded-xl text-sm transition-all shadow-sm"
            >
                Apply Filters
            </button>
        </aside>
    );
}