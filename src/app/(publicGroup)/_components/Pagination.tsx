"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export default function Pagination({ meta }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { page, limit, total } = meta;
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`/gear?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-card-border">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 text-sm font-semibold rounded-xl border border-card-border bg-card-bg text-foreground hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 text-sm font-semibold rounded-xl transition ${pageNum === page
                            ? "bg-primary text-text-inverse shadow-sm"
                            : "text-foreground bg-card-bg hover:bg-background border border-card-border"
                            }`}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 text-sm font-semibold rounded-xl border border-card-border bg-card-bg text-foreground hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Next
            </button>
        </div>
    );
}