export default function GearSkeleton() {
    return (
        <div className="border border-card-border bg-card-bg rounded-2xl p-4 shadow-sm animate-pulse flex flex-col gap-3">
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-card-border rounded-xl"></div>

            {/* Category / Brand Skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-4 bg-card-border rounded-md w-1/4"></div>
                <div className="h-4 bg-card-border rounded-md w-1/5"></div>
            </div>

            {/* Title Skeleton */}
            <div className="h-5 bg-card-border rounded-md w-3/4 mt-1"></div>

            {/* Description Skeleton */}
            <div className="h-4 bg-card-border rounded-md w-full"></div>

            {/* Price & Button Skeleton */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-card-border">
                <div className="h-6 bg-card-border rounded-md w-1/3"></div>
                <div className="h-9 bg-card-border rounded-xl w-1/3"></div>
            </div>
        </div>
    );
}