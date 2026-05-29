export default function AuthorsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-10 w-44 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
      <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2 pt-1">
                <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
