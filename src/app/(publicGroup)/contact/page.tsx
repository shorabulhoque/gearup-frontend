"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const Contactpage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            toast.success("Thank you! Your message has been sent successfully.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1000);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-blue-100 text-blue-700 rounded-full">
                        Get In Touch
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        We’d Love to Hear From You
                    </h1>
                    <p className="text-slate-500 text-base">
                        Have questions about rentals, listings, or partnerships? Reach out to us and our team will get back to you shortly.
                    </p>
                </div>

                {/* Contact Info Cards & Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Side Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                                📍
                            </div>
                            <h3 className="text-base font-bold text-slate-900">Our Location</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                123 Adventure Way, Cycling Hub<br />
                                Silicon Valley, CA 94025
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                                ✉️
                            </div>
                            <h3 className="text-base font-bold text-slate-900">Email Us</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Support: support@gearrental.com<br />
                                Business: partners@gearrental.com
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                                📞
                            </div>
                            <h3 className="text-base font-bold text-slate-900">Call Us</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Customer Care: +1 (800) 555-4327<br />
                                Mon - Fri, 9am - 6pm EST
                            </p>
                        </div>
                    </div>

                    {/* Right Side Message Form */}
                    <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Fill out the form below and we will respond within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-700">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Inquiry about rental gear..."
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700">Message</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? "Sending Message..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactpage;