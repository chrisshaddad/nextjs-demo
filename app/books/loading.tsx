export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Title */}
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-8" />

      {/* Search bar */}
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />

      {/* Genre filter buttons */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full"
          />
        ))}
      </div>

      {/* Book cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-80 bg-zinc-200 dark:bg-zinc-700" />
            <div className="p-6 space-y-3">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
