import { getAllGears } from "@/services/gear/gear.actions";
import { getAllCategories } from "@/services/category/category.actions";
import GearCard from "../_components/GearCard";
import GearFilterSidebar from "../_components/GearFilterSidebar";
import { Suspense } from "react";
import GearSkeleton from "../_components/GearSkeleton";
import { IGearQueryParams } from "@/types/gear.types";

interface GearPageProps {
    searchParams: Promise<IGearQueryParams>;
};

export default async function GearPage({ searchParams }: GearPageProps) {
    const resolvedSearchParams = await searchParams;

    const [gearItems, categories] = await Promise.all([
        getAllGears(resolvedSearchParams),
        getAllCategories(),
    ]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Explore Outdoor Gear</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Find and rent top-quality equipment for your next adventure.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <GearFilterSidebar categories={categories} />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {gearItems.length === 0 ? (
                        <div className="text-center py-16 border rounded-xl bg-gray-50">
                            <h3 className="text-lg font-medium text-gray-700">No gear items found</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Try adjusting your search query or filter settings.
                            </p>
                        </div>
                    ) : (
                        <Suspense fallback={<GearSkeleton />}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gearItems.map((gear) => (
                                    <GearCard key={gear.id} gear={gear} />
                                ))}
                            </div>
                        </Suspense>
                    )}
                </div>
            </div>
        </div>
    );
};