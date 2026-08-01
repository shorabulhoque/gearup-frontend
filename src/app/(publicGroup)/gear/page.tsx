// app/(publicGroup)/gear/page.tsx
import { Suspense } from "react";
import GearCard from "../_components/GearCard";
import GearSkeleton from "../_components/GearSkeleton";
import { getAllGears } from "@/services/gear/gear.actions";

async function GearList() {
    const gears = await getAllGears();
    console.log(gears);
    if (!gears || gears.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No gear items found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gears.map((gear) => (
                <GearCard key={gear.id} gear={gear} />
            ))}
        </div>
    );
}

export default function GearPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Explore Gear</h1>
                <p className="text-gray-600 mt-1">
                    Rent premium equipment for your next adventure.
                </p>
            </div>

            <Suspense
                fallback={
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <GearSkeleton />
                        <GearSkeleton />
                        <GearSkeleton />
                        <GearSkeleton />
                        <GearSkeleton />
                        <GearSkeleton />
                    </div>
                }
            >
                <GearList />
            </Suspense>
        </div>
    );
}