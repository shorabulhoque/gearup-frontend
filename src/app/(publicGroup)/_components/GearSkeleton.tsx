export default function GearSkeleton() {
    return (
        <div className="border rounded-xl p-4 shadow-sm animate-pulse flex flex-col gap-3">
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded-lg"></div>

            {/* Title Skeleton */}
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>

            {/* Description / Category Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>

            {/* Price & Button Skeleton */}
            <div className="flex justify-between items-center mt-2">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-9 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    );
}