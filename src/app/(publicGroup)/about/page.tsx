import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 1. Hero Banner Section */}
            <section className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative max-w-5xl mx-auto text-center space-y-6">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">
                        Empowering Outdoor Adventures
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                        Gear Up. Ride Free. <br />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                            Explore Without Boundaries.
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light leading-relaxed">
                        We connect outdoor enthusiasts with top-quality rental gear and premium bicycles, making every adventure accessible, affordable, and seamless.
                    </p>
                </div>
            </section>

            {/* 2. Platform Stats Section */}
            <section className="max-w-6xl mx-auto -mt-10 px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-blue-600">5,000+</h3>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Rentals</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-blue-600">1,200+</h3>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Gear Items</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-blue-600">98%</h3>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Happy Cyclists</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-blue-600">4.9 ★</h3>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">User Rating</p>
                    </div>
                </div>
            </section>

            {/* 3. Mission & Vision Section */}
            <section className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-sm tracking-wide uppercase">
                            <span className="w-8 h-0.5 bg-blue-600"></span>
                            <span>Our Mission</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Making Premium Adventure Gear Accessible to Everyone
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Buying specialized bicycles and outdoor equipment can be extremely expensive and maintenance-heavy. Our mission is to bridge the gap between gear owners and adventure seekers through a trusted, reliable peer-to-peer and provider rental marketplace.
                        </p>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center space-x-3 text-slate-700 font-medium text-sm">
                                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
                                <span>Verified providers and inspected gear quality</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-700 font-medium text-sm">
                                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
                                <span>Flexible hourly, daily, and weekly rentals</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-700 font-medium text-sm">
                                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
                                <span>Secure payment and seamless booking tracking</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-200">
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
            <section className="bg-white py-20 border-t border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900">Why Choose Our Platform</h2>
                        <p className="text-slate-500 text-sm">
                            We provide an end-to-end ecosystem designed for safety, convenience, and performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                                🚲
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Curated Bicycles</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                From road racing and mountain bikes to urban e-bikes, find the exact ride tailored to your journey.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                                🛡️
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Safe & Insured</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Every booking comes with verified listings and transparent terms so you can ride with total peace of mind.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Instant Booking</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Seamless rental order lifecycle management with instant confirmation and Stripe payment processing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Call to Action (CTA) */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold">Ready for Your Next Adventure?</h2>
                    <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
                        Explore our wide range of bicycles and gear, or list your own equipment to start earning today.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link
                            href="/gears"
                            className="px-8 py-3.5 rounded-xl bg-white text-blue-600 font-bold text-sm shadow-md hover:bg-slate-100 transition-colors"
                        >
                            Browse Gear
                        </Link>
                        <Link
                            href="/register"
                            className="px-8 py-3.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/30 transition-colors"
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