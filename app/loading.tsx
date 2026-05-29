export default function HomeLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <div className="h-14 w-96 bg-zinc-700 rounded-lg" />
          <div className="h-6 w-2/3 bg-zinc-700 rounded" />
          <div className="h-5 w-1/2 bg-zinc-700 rounded" />
          <div className="flex gap-4 mt-2">
            <div className="h-11 w-36 bg-zinc-600 rounded-lg" />
            <div className="h-11 w-36 bg-zinc-600 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="py-12 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 flex flex-col items-center gap-3">
                <div className="h-10 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured books skeleton */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="h-64 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded mt-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
