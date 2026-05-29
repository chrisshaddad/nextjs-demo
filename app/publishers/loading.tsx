export default function PublishersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-8" />

      {/* Country filter pills */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-9 w-28 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        ))}
      </div>

      <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />

      {/* Table skeleton */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
        {/* Header row */}
        <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="px-6 py-4 grid grid-cols-4 gap-4 border-t border-zinc-200 dark:border-zinc-700"
          >
            <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-6 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
