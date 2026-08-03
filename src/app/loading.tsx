const GlobalLoading = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background transition-colors duration-300">
            <div className="relative flex items-center justify-center">
                {/* Outer Spinning Ring */}
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

                {/* Inner Decorative Dot */}
                <div className="absolute w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                </div>
            </div>

            <p className="mt-4 text-sm font-medium text-text-muted tracking-wide animate-pulse">
                Loading GearUp...
            </p>
        </div>
    );
};

export default GlobalLoading;