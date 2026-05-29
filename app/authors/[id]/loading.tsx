export default function AuthorLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mt-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-48 h-48 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-9 w-36 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 w-28 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
              ))}
            </div>
            <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mt-2" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
              <div className="h-80 bg-zinc-200 dark:bg-zinc-700" />
              <div className="p-6 flex flex-col gap-3">
                <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="flex justify-between">
                  <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                  <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-700 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
