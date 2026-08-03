"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: "general" | "renters" | "providers" | "payments";
}

const faqData: FAQItem[] = [
    // General
    {
        id: "1",
        category: "general",
        question: "How does the rental platform work?",
        answer:
            "Our platform connects gear owners (providers) with adventure seekers (renters). Renters can search for bicycles and outdoor gear, select dates, and place a booking. Providers then confirm the booking, and after online payment, gear can be picked up.",
    },
    {
        id: "2",
        category: "general",
        question: "What happens if gear gets damaged during rental?",
        answer:
            "We encourage both providers and renters to inspect equipment during pickup. Minor wear and tear is expected, but for significant damage, our security deposit policies and dispute terms apply.",
    },

    // Renters
    {
        id: "3",
        category: "renters",
        question: "How do I book a bicycle or gear?",
        answer:
            "Simply browse the gear catalog, choose your desired item, select your rental start and end dates, and click 'Book Now'. Once the provider confirms your request, you can complete the payment to lock in your reservation.",
    },
    {
        id: "4",
        category: "renters",
        question: "Can I cancel my rental reservation?",
        answer:
            "Yes, you can cancel your booking from your dashboard prior to the provider confirming or according to the provider's cancellation timeframe.",
    },

    // Providers
    {
        id: "5",
        category: "providers",
        question: "How do I list my bicycles and gear for rent?",
        answer:
            "Sign up or switch to a Provider account, go to your dashboard, and click 'Add New Gear'. Fill in the gear details, pricing per day, uploaded photos, and availability schedule.",
    },
    {
        id: "6",
        category: "providers",
        question: "When do I get paid for my rental order?",
        answer:
            "Once a customer pays online via our secure Stripe checkout, funds are processed and held until the rental period commences or concludes per system payout rules.",
    },

    // Payments
    {
        id: "7",
        category: "payments",
        question: "What payment methods are supported?",
        answer:
            "We accept all major credit/debit cards (Visa, MasterCard, American Express) processed securely via Stripe.",
    },
    {
        id: "8",
        category: "payments",
        question: "Are there any hidden service fees?",
        answer:
            "No! All pricing, including price snapshots per day and total rental amounts, are transparently displayed before you confirm your checkout.",
    },
];

const FAQpage = () => {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [openId, setOpenId] = useState<string | null>("1"); // First question open by default

    const filteredFaqs =
        activeCategory === "all"
            ? faqData
            : faqData.filter((item) => item.category === activeCategory);

    const toggleFAQ = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-blue-100 text-blue-700 rounded-full">
                        Help & Support
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="max-w-xl mx-auto text-slate-500 text-base">
                        Have questions about renting gear or becoming a provider? We’ve got answers to help you gear up smoothly.
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {[
                        { id: "all", label: "All Questions" },
                        { id: "renters", label: "For Renters" },
                        { id: "providers", label: "For Providers" },
                        { id: "payments", label: "Payments & Fees" },
                        { id: "general", label: "General" },
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${activeCategory === cat.id
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {filteredFaqs.map((faq) => {
                        const isOpen = openId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm hover:border-slate-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <span className="text-base font-bold text-slate-900">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 text-slate-600 font-bold ${isOpen ? "rotate-180 bg-blue-50 text-blue-600" : ""
                                            }`}
                                    >
                                        ↓
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 mt-2">
                                        <p className="pt-3">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Still Have Questions CTA */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-center text-white space-y-4 shadow-xl">
                    <h3 className="text-xl font-bold">Still have unanswered questions?</h3>
                    <p className="text-blue-200 text-xs sm:text-sm max-w-md mx-auto">
                        Can’t find what you’re looking for? Reach out to our support team and we’ll be happy to assist you.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-colors"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQpage;