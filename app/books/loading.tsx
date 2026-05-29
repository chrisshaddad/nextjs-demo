export default function BooksLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-10 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-8" />

      {/* Search bar */}
      <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-8" />

      {/* Genre pills */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        ))}
      </div>

      <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />

      {/* Book cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
            <div className="h-80 bg-zinc-200 dark:bg-zinc-700" />
            <div className="p-6 flex flex-col gap-3">
              <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="flex justify-between">
                <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
