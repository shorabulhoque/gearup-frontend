"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FolderPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createCategoryAction } from "@/services/category/category.actions";

export default function ManageCategoriesPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (!name.trim()) {
    //         setStatus({ type: "error", message: "Category name is required." });
    //         return;
    //     }

    //     setLoading(true);
    //     setStatus(null);

    //     const res = await createCategoryAction({
    //         name: name.trim(),
    //         description: description.trim() || undefined,
    //     });

    //     setLoading(false);

    //     if (res.success) {
    //         setStatus({ type: "success", message: res.message });
    //         setName("");
    //         setDescription("");

    //         // Optionally redirect after 1.5 seconds
    //         setTimeout(() => {
    //             router.push("/admin/categories");
    //         }, 1500);
    //     } else {
    //         setStatus({ type: "error", message: res.message });
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setStatus({ type: "error", message: "Category name is required." });
            return;
        }

        setLoading(true);
        setStatus(null);

        const res = await createCategoryAction({
            name: name.trim(),
            description: description.trim() || undefined,
        });

        setLoading(false);

        if (res.success) {
            setStatus({ type: "success", message: res.message });
            setName("");
            setDescription("");
        } else {
            setStatus({ type: "error", message: res.message });
        }
    };
    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back Navigation */}
                <Link
                    href="/admin/categories"
                    className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Categories
                </Link>

                {/* Header */}
                <div className="flex items-center gap-3 border-b border-card-border pb-4">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <FolderPlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create New Category</h1>
                        <p className="text-sm text-text-muted">
                            Add a new category for outdoor gears and equipment.
                        </p>
                    </div>
                </div>

                {/* Status Message Alert */}
                {status && (
                    <div
                        className={`flex items-start gap-3 p-4 rounded-xl text-sm font-medium border ${status.type === "success"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-danger/10 text-danger border-danger/20"
                            }`}
                    >
                        {status.type === "success" ? (
                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        )}
                        <span>{status.message}</span>
                    </div>
                )}

                {/* Category Form */}
                <form onSubmit={handleSubmit} className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-sm space-y-5">
                    {/* Category Name */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Category Name <span className="text-danger">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Cycling & Biking"
                            className="w-full rounded-xl bg-background border border-card-border px-4 py-3 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-colors"
                        />
                    </div>

                    {/* Category Description */}
                    <div>
                        <label htmlFor="description" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                            Description <span className="text-text-muted text-[10px] font-normal">(Optional)</span>
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Mountain bikes, safety helmets, smart locks, and pannier bags..."
                            className="w-full rounded-xl bg-background border border-card-border p-4 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-colors resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-card-border">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-5 py-2.5 rounded-xl border border-card-border text-sm font-semibold text-text-muted hover:bg-card-border/20 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !name.trim()}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50 active:scale-95"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <FolderPlus className="w-4 h-4" />
                                    Create Category
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}