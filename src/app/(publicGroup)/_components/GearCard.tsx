import Link from "next/link";
import Image from "next/image";
import { IGearItem } from "@/types/gear.types";

interface GearCardProps {
    gear: IGearItem;
}

export default function GearCard({ gear }: GearCardProps) {
    const mainImage =
        gear.images && gear.images.length > 0
            ? gear.images[0]
            : "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";

    return (
        <div className="group border border-card-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-card-bg flex flex-col justify-between">
            <div>
                {/* Gear Image Container */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-background">
                    <Image
                        unoptimized
                        src={mainImage}
                        alt={gear.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                        className={`absolute top-2.5 right-2.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${gear.isAvailable && gear.stock > 0
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-danger/10 text-danger border-danger/20"
                            }`}
                    >
                        {gear.isAvailable && gear.stock > 0 ? "Available" : "Out of Stock"}
                    </span>
                </div>

                {/* Category & Brand */}
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                    <span className="font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-md border border-accent/20">
                        {gear.category?.name || "General"}
                    </span>
                    <span className="font-medium text-text-muted">{gear.brand}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mt-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {gear.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-text-muted mt-1.5 line-clamp-2">
                    {gear.description}
                </p>
            </div>

            {/* Price & Public View Button */}
            <div className="flex items-center justify-between mt-5 pt-3 border-t border-card-border">
                <div>
                    <span className="text-xl font-extrabold text-foreground">
                        CHF {gear.pricePerDay}
                    </span>
                    <span className="text-xs text-text-muted"> / day</span>
                </div>

                <Link
                    href={`/gears/${gear.id}`}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-text-inverse text-sm font-semibold rounded-xl transition-colors shadow-sm"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}