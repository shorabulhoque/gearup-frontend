// src/components/hero/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Tag } from "lucide-react";
import { IGearItem } from "@/types/gear.types";
import { getAllGears } from "@/services/gear/gear.actions";

export default async function Hero() {
    // Fetch the single latest created gear item for the hero highlight
    const response = await getAllGears({ limit: 1, sort: "-createdAt" });
    const latestGear: IGearItem | null = response?.data?.[0] || null;

    // Fallback image and link if no gear exists yet
    const heroImage = latestGear?.images?.[0] || "https://images.unsplash.com/photo-1508614589041-895b88991e3e";
    const heroTitle = latestGear?.title || "Peak Performance Gear";
    const gearCategory = latestGear?.category?.name || latestGear?.brand || "Featured Gear";
    const gearPrice = latestGear?.pricePerDay;

    return (
        <section className="relative overflow-hidden bg-background text-foreground transition-colors duration-300 pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-card-border">
            {/* Background Decorative Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Headline & Action */}
                    <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            New Gear Dropped
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                            Engineered for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-indigo-400">
                                Peak Performance.
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto lg:mx-0 font-normal">
                            Upgrade your outdoor adventure or workflow with professional-grade gear designed for durability and performance.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="#featured"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98]"
                            >
                                Shop Featured Gear
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/gears"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-card-bg hover:bg-card-border text-foreground border border-card-border font-semibold transition-all duration-200"
                            >
                                Explore All Gear
                            </Link>
                        </div>

                        {/* Feature Highlights */}
                        <div className="pt-6 border-t border-card-border grid grid-cols-3 gap-4 text-left">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                                <Truck className="w-4 h-4 text-primary shrink-0" />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                                <span>Verified Gear</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                                <RefreshCw className="w-4 h-4 text-primary shrink-0" />
                                <span>Easy Bookings</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dynamic API Hero Visual */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative mx-auto max-w-md lg:max-w-none">
                            {/* Glow backplate */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-accent opacity-30 blur-2xl" />

                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-card-bg border border-card-border shadow-2xl group">
                                <Image
                                    unoptimized
                                    src={heroImage}
                                    alt={heroTitle}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* API Data Badge Overlay */}
                                {latestGear && (
                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent">
                                        <div className="flex items-center justify-between text-xs font-semibold text-primary mb-1">
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-3.5 h-3.5" />
                                                {gearCategory}
                                            </span>
                                            {gearPrice && (
                                                <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-md">
                                                    ${gearPrice}/day
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            href={`/gears/${latestGear.id}`}
                                            className="text-base font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                                        >
                                            {heroTitle}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}