import Link from "next/link";
import Image from "next/image";
import { IGearItem } from "@/types/gear.types";

interface GearCardProps {
    gear: IGearItem;
};

export default function GearCard({ gear }: GearCardProps) {
    const mainImage =
        gear.images && gear.images.length > 0
            ? gear.images[0]
            : "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";
    return (
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
            <div>
                {/* Gear Image Container */}
                <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                        unoptimized
                        src={mainImage}
                        alt={gear.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                    <span
                        className={`absolute top-2 right-2 text-xs font-semibold px-2.5 py-1 rounded-full ${gear.isAvailable && gear.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {gear.isAvailable && gear.stock > 0 ? "Available" : "Out of Stock"}
                    </span>
                </div>

                {/* Category & Brand */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {gear.category?.name || "General"}
                    </span>
                    <span className="font-medium text-gray-400">{gear.brand}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-1">
                    {gear.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {gear.description}
                </p>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
                <div>
                    <span className="text-xl font-bold text-gray-900">
                        CHF {gear.pricePerDay}
                    </span>
                    <span className="text-xs text-gray-500"> / day</span>
                </div>

                <Link
                    href={`/gear/${gear.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}