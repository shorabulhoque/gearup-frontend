import Image from "next/image";
import Link from "next/link";
import { Star, Quote, User } from "lucide-react";
import { getAllReviews } from "@/services/review/review.actions";

export default async function Review() {
    const response = await getAllReviews(6);
    const reviews = response.data || [];

    return (
        <section className="py-20 bg-background text-foreground transition-colors duration-300 border-t border-card-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                        Community Feedback
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        Loved by Adventurers & Pros
                    </h2>
                    <p className="mt-3 text-text-muted text-base sm:text-lg">
                        See what renters and gear enthusiasts are saying about their rental experience.
                    </p>
                </div>

                {/* Empty State */}
                {reviews.length === 0 ? (
                    <div className="text-center py-12 border border-card-border rounded-2xl bg-card-bg">
                        <p className="text-text-muted">No community reviews yet.</p>
                    </div>
                ) : (
                    /* Review Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {reviews.map((review) => {
                            const customerName = review.customer?.name || "Verified Renter";
                            const customerAvatar = review.customer?.image;
                            const gearTitle = review.gearItem?.title;
                            const gearImage = review.gearItem?.images?.[0];

                            return (
                                <div
                                    key={review.id}
                                    className="flex flex-col justify-between rounded-2xl bg-card-bg border border-card-border p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                                >
                                    <Quote className="absolute -top-2 -right-2 w-20 h-20 text-primary/5 pointer-events-none" />

                                    <div>
                                        {/* Rating Stars */}
                                        <div className="flex items-center gap-1 text-warning mb-4">
                                            {Array.from({ length: 5 }).map((_, idx) => (
                                                <Star
                                                    key={idx}
                                                    className={`w-4 h-4 ${idx < review.rating
                                                        ? "fill-warning text-warning"
                                                        : "text-card-border fill-card-border"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {/* Review Comment */}
                                        <p className="text-foreground/90 text-sm leading-relaxed italic mb-6 line-clamp-4">
                                            &ldquo;{review.comment}&rdquo;
                                        </p>
                                    </div>

                                    <div>
                                        {/* Gear Link Badge (if attached) */}
                                        {review.gearItem && (
                                            <div className="mb-4 pt-3 border-t border-card-border flex items-center gap-2">
                                                {gearImage && (
                                                    <div className="relative w-7 h-7 rounded-md overflow-hidden bg-card-border shrink-0">
                                                        <Image
                                                            unoptimized
                                                            src={gearImage}
                                                            alt={gearTitle || "Gear"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <Link
                                                    href={`/gears/${review.gearItem.id}`}
                                                    className="text-xs font-medium text-primary hover:underline line-clamp-1"
                                                >
                                                    Rented: {gearTitle}
                                                </Link>
                                            </div>
                                        )}

                                        {/* Customer Bio */}
                                        <div className="flex items-center gap-3 pt-2">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                                {customerAvatar ? (
                                                    <Image
                                                        unoptimized
                                                        src={customerAvatar}
                                                        alt={customerName}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <User className="w-5 h-5 text-primary" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-foreground">
                                                    {customerName}
                                                </h4>
                                                <p className="text-xs text-text-muted">
                                                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </div>
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