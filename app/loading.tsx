export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />

            <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
                        <div className="h-80 bg-zinc-200 dark:bg-zinc-800" />
                        <div className="p-6">
                            <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
                            <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
                            <div className="flex justify-between">
                                <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                                <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
