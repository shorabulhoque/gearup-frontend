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
        <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-200">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 text-sm font-medium rounded-lg transition ${pageNum === page
                                ? "bg-emerald-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
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
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Next
            </button>
        </div>
    );
}