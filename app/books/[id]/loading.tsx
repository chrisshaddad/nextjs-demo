export default function BookLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {/* Cover */}
        <div className="md:col-span-1">
          <div className="h-96 md:h-[500px] bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
        </div>

        {/* Details */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-9 w-36 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
            ))}
          </div>
          <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mt-2" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded" />
          </div>
          <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg mt-2" />
        </div>
      </div>
    </div>
  );
}
