import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { IGearItem } from "@/types/gear.types";
import { getAllGears } from "@/services/gear/gear.actions";

export default async function FeaturedGear() {
    // Fetch latest created gear items dynamically from backend
    const response = await getAllGears({ limit: 4, sort: "-createdAt" });
    const gears: IGearItem[] = response?.data || [];

    return (
        <section id="featured" className="py-20 bg-background text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                            Latest Additions
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Featured Gear
                        </h2>
                        <p className="mt-2 text-text-muted max-w-xl">
                            Handpicked equipment selected for reliability, performance, and craftsmanship.
                        </p>
                    </div>
                    <Link
                        href="/gears"
                        className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors self-start md:self-auto"
                    >
                        View Entire Collection &rarr;
                    </Link>
                </div>

                {/* Empty State Guard */}
                {gears.length === 0 ? (
                    <div className="text-center py-12 border border-card-border rounded-2xl bg-card-bg">
                        <p className="text-text-muted">No gear items found.</p>
                    </div>
                ) : (
                    /* Dynamic Product Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {gears.map((item) => {
                            const mainImage = item.images && item.images.length > 0
                                ? item.images[0]
                                : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";

                            const reviewCount = item.reviews?.length || 0;
                            const rating = 5.0;

                            return (
                                <div
                                    key={item.id}
                                    className="group relative flex flex-col rounded-2xl bg-card-bg border border-card-border hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                                >
                                    {/* Product Image Container */}
                                    <div className="relative aspect-square w-full bg-card-border/50 overflow-hidden">
                                        {!item.isAvailable && (
                                            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-semibold rounded-md bg-danger text-white shadow-md">
                                                Out of Stock
                                            </span>
                                        )}

                                        <Image
                                            unoptimized
                                            src={mainImage}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Quick Action Overlay */}
                                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                                            <Link
                                                href={`/gears/${item.id}`}
                                                aria-label="Quick View"
                                                className="p-2.5 rounded-full bg-card-bg hover:bg-primary hover:text-white text-foreground transition-colors shadow-lg border border-card-border"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <button
                                                aria-label="Book Gear"
                                                disabled={!item.isAvailable}
                                                className="p-2.5 rounded-full bg-card-bg hover:bg-primary hover:text-white text-foreground transition-colors shadow-lg border border-card-border disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Details Content */}
                                    <div className="p-5 flex flex-col flex-1 justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                                                <span>{item.category?.name || item.brand || "Gear"}</span>
                                                <div className="flex items-center gap-1 text-warning">
                                                    <Star className="w-3.5 h-3.5 fill-warning" />
                                                    <span className="font-medium">{rating}</span>
                                                    <span className="text-text-muted">({reviewCount})</span>
                                                </div>
                                            </div>

                                            <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                                <Link href={`/gears/${item.id}`}>
                                                    <span className="absolute inset-0" />
                                                    {item.title}
                                                </Link>
                                            </h3>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="mt-4 pt-3 border-t border-card-border flex items-center justify-between">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-lg font-bold text-foreground">
                                                    ${item.pricePerDay}
                                                </span>
                                                <span className="text-xs text-text-muted">/day</span>
                                            </div>

                                            <span className="relative z-10 text-xs font-semibold text-primary group-hover:text-primary-hover underline-offset-4 group-hover:underline">
                                                Details
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}