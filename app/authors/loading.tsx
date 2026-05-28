export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-zinc-300">
        Loading publishers...
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg p-6 h-64"
          >
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded w-2/3" />
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-5/6" />
              <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-4/6" />
            </div>

            <div className="mt-6 flex justify-between">
              <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-6 w-20 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <div className="h-6 w-20 bg-zinc-300 dark:bg-zinc-800 rounded" />
        <div className="h-6 w-16 bg-zinc-300 dark:bg-zinc-800 rounded" />
        <div className="h-6 w-20 bg-zinc-300 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
}