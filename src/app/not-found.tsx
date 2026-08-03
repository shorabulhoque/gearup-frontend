import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background transition-colors duration-300">
            <div className="max-w-md w-full text-center p-8 bg-card-bg border border-card-border rounded-2xl shadow-xl">
                <span className="text-6xl font-black text-primary/20 tracking-widest block mb-2">
                    404
                </span>

                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    Page Not Found
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    The page or gear item you are looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-block px-6 py-2.5 bg-primary hover:bg-primary-hover text-text-inverse font-semibold text-sm rounded-xl transition-all shadow-md shadow-primary/20"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;