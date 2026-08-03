import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, User, MessageSquare } from "lucide-react";
import GearBookingCard from "../../_components/GearBookingCard";
import CreateReviewForm from "../../_components/CreateReviewForm";
import { checkUserHasRented, getReviewsByGearId } from "@/services/review/review.actions";
import { getGearById } from "@/services/gear/gear.actions";
import { getAccessToken, getCurrentUser } from "@/services/user/user.actions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PublicGearSinglePage({ params }: PageProps) {
    const { id } = await params;

    const [gear, currentUser, token, reviews] = await Promise.all([
        getGearById(id),
        getCurrentUser(),
        getAccessToken(),
        getReviewsByGearId(id),
    ]);

    if (!gear) {
        notFound();
    }

    // Check if logged-in user has rented this specific product
    let userHasRented = false;
    if (token) {
        // Option A: If checkUserHasRented takes (gearId, token)
        userHasRented = await checkUserHasRented(id, token);

        // Option B: If your checkUserHasRented reads cookies directly and only expects (gearId), use this instead:
        // userHasRented = await checkUserHasRented(id);
    }

    const defaultImage =
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";
    const mainImage = gear.images && gear.images.length > 0 ? gear.images[0] : defaultImage;

    // Calculate Average Rating
    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
        : null;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Modern Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-text-muted mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/gears" className="hover:text-primary transition-colors">Gears</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{gear.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left side: Picture, Description, & Reviews */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Banner */}
                        <div className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden bg-card-bg border border-card-border shadow-sm">
                            <Image
                                unoptimized
                                src={mainImage}
                                alt={gear.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                                    {gear.category?.name || "General"}
                                </span>
                                <span className="text-sm font-medium text-text-muted">
                                    Brand: <strong className="text-foreground">{gear.brand}</strong>
                                </span>

                                {avgRating && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-warning/10 border border-warning/20 rounded-full text-xs font-semibold text-warning">
                                        <Star className="w-3.5 h-3.5 fill-warning" />
                                        <span>{avgRating} ({reviews.length} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                                {gear.title}
                            </h1>

                            <div className="border-t border-card-border pt-4">
                                <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                                <p className="text-text-muted leading-relaxed text-base whitespace-pre-line">
                                    {gear.description}
                                </p>
                            </div>
                        </div>

                        {gear.category?.description && (
                            <div className="bg-card-bg border border-card-border rounded-xl p-5 text-sm text-foreground space-y-1">
                                <strong className="block font-semibold text-accent">About Category:</strong>
                                <p className="text-text-muted">{gear.category.description}</p>
                            </div>
                        )}

                        {/* REVIEWS SECTION */}
                        <div className="pt-8 border-t border-card-border space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                    Customer Reviews ({reviews.length})
                                </h2>
                            </div>

                            {/* Conditionally Show Create Review Form */}
                            {currentUser && userHasRented && token && (
                                <CreateReviewForm gearItemId={gear.id} token={token} />
                            )}

                            {/* Review List */}
                            {reviews.length === 0 ? (
                                <div className="text-center py-10 border border-card-border rounded-2xl bg-card-bg">
                                    <p className="text-text-muted">No reviews for this gear item yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((rev) => (
                                        <div
                                            key={rev.id}
                                            className="p-5 rounded-2xl bg-card-bg border border-card-border shadow-sm space-y-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-foreground">
                                                            {rev.customer?.name || "Verified Customer"}
                                                        </h4>
                                                        <p className="text-xs text-text-muted">
                                                            {new Date(rev.createdAt).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Star Display */}
                                                <div className="flex items-center gap-1 text-warning">
                                                    {Array.from({ length: 5 }).map((_, idx) => (
                                                        <Star
                                                            key={idx}
                                                            className={`w-4 h-4 ${idx < rev.rating
                                                                ? "fill-warning text-warning"
                                                                : "text-card-border fill-card-border"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-sm text-foreground/90 leading-relaxed italic">
                                                &ldquo;{rev.comment}&rdquo;
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right side: Interactive rental booking card */}
                    <div>
                        <GearBookingCard gear={gear} currentUser={currentUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}