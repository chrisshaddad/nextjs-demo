export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Circular spinner */}
        <div className="w-12 h-12 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-50 rounded-full animate-spin" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Loading...</span>
      </div>
    </div>
  );
}
