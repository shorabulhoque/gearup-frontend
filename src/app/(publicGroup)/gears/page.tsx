import { getAllGears } from "@/services/gear/gear.actions";
import { getAllCategories } from "@/services/category/category.actions";
import GearCard from "../_components/GearCard";
import GearFilterSidebar from "../_components/GearFilterSidebar";
import Pagination from "../_components/Pagination";
import { Suspense } from "react";
import GearSkeleton from "../_components/GearSkeleton";
import { IGearQueryParams } from "@/types/gear.types";

interface GearPageProps {
    searchParams: Promise<IGearQueryParams>;
}

export default async function GearPage({ searchParams }: GearPageProps) {
    const resolvedSearchParams = await searchParams;

    const [gearsResponse, categories] = await Promise.all([
        getAllGears(resolvedSearchParams),
        getAllCategories(),
    ]);

    const gearItems = gearsResponse.data || [];
    const meta = gearsResponse.meta;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        Explore Outdoor Gear
                    </h1>
                    <p className="text-text-muted text-base mt-2 max-w-2xl">
                        Find and rent top-quality equipment for your next adventure with flexible rental plans.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Container - Clean Non-Overlapping Layout */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                            <GearFilterSidebar categories={categories} />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {gearItems.length === 0 ? (
                            <div className="text-center py-20 border border-card-border rounded-2xl bg-card-bg transition-colors">
                                <h3 className="text-lg font-semibold text-foreground">No gear items found</h3>
                                <p className="text-sm text-text-muted mt-1 max-w-sm mx-auto">
                                    Try adjusting your search query or clear filter settings to see available gear.
                                </p>
                            </div>
                        ) : (
                            <Suspense
                                fallback={
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <GearSkeleton key={i} />
                                        ))}
                                    </div>
                                }
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {gearItems.map((gear) => (
                                        <GearCard key={gear.id} gear={gear} />
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {meta && <Pagination meta={meta} />}
                            </Suspense>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};