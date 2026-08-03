'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background transition-colors duration-300">
            <div className="max-w-md w-full text-center p-8 bg-card-bg border border-card-border rounded-2xl shadow-xl">
                {/* Danger Icon Badge */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    Something went wrong!
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                    {error.message || 'An unexpected error occurred while processing your request.'}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => unstable_retry()}
                        className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-text-inverse font-semibold rounded-xl transition-all shadow-md shadow-primary/20"
                    >
                        Try again
                    </button>
                    <button
                        onClick={() => (window.location.href = '/')}
                        className="w-full sm:w-auto px-6 py-2.5 bg-card-bg border border-card-border hover:bg-card-border/50 text-foreground text-sm font-semibold rounded-xl transition-all"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
}