import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="bg-background text-foreground min-h-screen">
            {/* 1. Hero Banner Section */}
            <section className="relative bg-card-bg border-b border-card-border py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative max-w-5xl mx-auto text-center space-y-6">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-primary/10 text-primary rounded-full border border-primary/20">
                        Empowering Outdoor Adventures
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                        Gear Up. Ride Free. <br />
                        <span className="text-accent">
                            Explore Without Boundaries.
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-text-muted font-light leading-relaxed">
                        We connect outdoor enthusiasts with top-quality rental gear and premium bicycles, making every adventure accessible, affordable, and seamless.
                    </p>
                </div>
            </section>

            {/* 2. Platform Stats Section */}
            <section className="max-w-6xl mx-auto -mt-10 px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-popover-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-popover-border text-center">
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-primary">5,000+</h3>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Active Rentals</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-primary">1,200+</h3>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Verified Gear Items</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-primary">98%</h3>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Happy Cyclists</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-primary">4.9 ★</h3>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">User Rating</p>
                    </div>
                </div>
            </section>

            {/* 3. Mission & Vision Section */}
            <section className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2 text-primary font-bold text-sm tracking-wide uppercase">
                            <span className="w-8 h-0.5 bg-primary"></span>
                            <span>Our Mission</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Making Premium Adventure Gear Accessible to Everyone
                        </h2>
                        <p className="text-text-muted leading-relaxed">
                            Buying specialized bicycles and outdoor equipment can be extremely expensive and maintenance-heavy. Our mission is to bridge the gap between gear owners and adventure seekers through a trusted, reliable peer-to-peer and provider rental marketplace.
                        </p>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center space-x-3 text-foreground/90 font-medium text-sm">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                                <span>Verified providers and inspected gear quality</span>
                            </div>
                            <div className="flex items-center space-x-3 text-foreground/90 font-medium text-sm">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                                <span>Flexible hourly, daily, and weekly rentals</span>
                            </div>
                            <div className="flex items-center space-x-3 text-foreground/90 font-medium text-sm">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">✓</span>
                                <span>Secure payment and seamless booking tracking</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-card-border bg-card-bg">
                        <Image
                            unoptimized
                            src="https://images.unsplash.com/photo-1517649763962-0c623266010b"
                            alt="Cycling Adventure"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* 4. Core Features Section */}
            <section className="bg-card-bg py-20 border-t border-card-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold">Why Choose Our Platform</h2>
                        <p className="text-text-muted text-sm">
                            We provide an end-to-end ecosystem designed for safety, convenience, and performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-background border border-card-border space-y-4 hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                                🚲
                            </div>
                            <h3 className="text-xl font-bold">Curated Bicycles</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                From road racing and mountain bikes to urban e-bikes, find the exact ride tailored to your journey.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-background border border-card-border space-y-4 hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                                🛡️
                            </div>
                            <h3 className="text-xl font-bold">Safe & Insured</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                Every booking comes with verified listings and transparent terms so you can ride with total peace of mind.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-background border border-card-border space-y-4 hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold">Instant Booking</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                Seamless rental order lifecycle management with instant confirmation and Stripe payment processing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Call to Action (CTA) */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto bg-card-bg border border-card-border text-foreground rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold">Ready for Your Next Adventure?</h2>
                    <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base">
                        Explore our wide range of bicycles and gear, or list your own equipment to start earning today.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link
                            href="/gears"
                            className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md transition-colors"
                        >
                            Browse Gear
                        </Link>
                        <Link
                            href="/register"
                            className="px-8 py-3.5 rounded-xl bg-background border border-card-border text-foreground hover:bg-card-bg font-bold text-sm transition-colors"
                        >
                            Become a Provider
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;