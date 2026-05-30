export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Title */}

      {/* Grid of 3 skeleton author cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          // each author card has: a circle image, a name, nationality, bio lines
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
