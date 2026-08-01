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

    // Local State initialized from URL search params
    const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoryId") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "newest");

    // Apply filters by pushing new query string to URL
    const applyFilters = () => {
        const params = new URLSearchParams();

        if (searchTerm) params.set("searchTerm", searchTerm);
        if (selectedCategory) params.set("categoryId", selectedCategory);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sort) params.set("sort", sort);

        // Reset to page 1 whenever filters change
        params.set("page", "1");

        router.push(`/gear?${params.toString()}`);
    };

    // Reset all filters
    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSort("newest");
        router.push("/gear");
    };

    return (
        <aside className="w-full lg:w-64 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="font-semibold text-lg text-gray-900">Filters</h2>
                <button
                    onClick={handleReset}
                    className="text-xs text-emerald-600 hover:underline font-medium"
                >
                    Reset All
                </button>
            </div>

            {/* Search Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Title, brand..."
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
            </div>

            {/* Sorting Dropdown */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                    <option value="newest">Latest Added</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Category Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day ($)</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={applyFilters}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm transition"
            >
                Apply Filters
            </button>
        </aside>
    );
}