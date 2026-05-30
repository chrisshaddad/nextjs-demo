export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Title */}
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-8" />

      {/* Search input */}
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />

      {/* Table */}
      <div className="space-y-3">
        {/* Header row */}
        <div className="flex gap-8 pb-3 border-b border-zinc-200 dark:border-zinc-700">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-32" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-28" />
        </div>

        {/* Data rows */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-8 py-3 border-b border-zinc-100 dark:border-zinc-800"
          >
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-40" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-36" />
          </div>
        ))}
      </div>
    </div>
  );
}
