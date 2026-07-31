"use client";

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const services = [
        { name: "Full Vehicle Inspection", href: "/services/inspection" },
        { name: "Engine & Transmission Repair", href: "/services/engine" },
        { name: "Brake & Suspension Check", href: "/services/brakes" },
        { name: "Oil & Filter Change", href: "/services/oil-change" },
        { name: "Tire Replacement & Balancing", href: "/services/tires" },
    ];

    const quickLinks = [
        { name: "About GearUp", href: "/about" },
        { name: "Our Services", href: "/services" },
        { name: "Find a Mechanic", href: "/providers" },
        { name: "Customer Reviews", href: "/reviews" },
        { name: "Contact & Support", href: "/contact" },
    ];

    const legalLinks = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
    ];

    return (
        <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-200 dark:border-gray-800">

                    {/* Brand & Tagline (2 Columns) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                                GearUp
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-sm">
                            Your trusted platform for top-tier vehicle repair and maintenance. Connect with certified service providers and manage bookings with ease.
                        </p>

                        {/* Newsletter Input */}
                        <div className="pt-2">
                            <p className="text-xs font-semibold tracking-wider text-gray-900 dark:text-white uppercase mb-2">
                                Subscribe for updates & offers
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Join
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Services */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Services
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        href={service.href}
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Hours */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Support & Hours
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+1 (800) 555-GEAR</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@gearup.com</span>
                            </li>
                            <li className="pt-2 text-xs text-gray-500 dark:text-gray-500">
                                Mon - Sat: 8:00 AM - 8:00 PM<br />
                                Sunday: Closed
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar (Copyright, Legal, Socials) */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <p>© {currentYear} GearUp Inc. All rights reserved.</p>

                    {/* Legal Links */}
                    <div className="flex flex-wrap gap-6">
                        {legalLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}