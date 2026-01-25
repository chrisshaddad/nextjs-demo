'use client';

import { useTransition, useEffect, useState } from 'react';

export function GlobalLoadingIndicator() {
  const [isPending] = useTransition();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (!isPending) {
      // Hide after 3000ms when loading ends
      const timeout = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isPending]);

  // Show if pending or if still within the hide delay window
  const isVisible = isPending || showIndicator;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-zinc-950 animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Title skeleton */}
        <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />

        {/* Filter/Search skeleton */}
        <div className="mb-8">
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            ))}
          </div>
        </div>

        {/* Results count skeleton */}
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-6" />

        {/* Grid of cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
              {/* Image skeleton */}
              <div className="h-80 bg-zinc-200 dark:bg-zinc-800" />
              {/* Content skeleton */}
              <div className="p-6 space-y-4">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                <div className="flex justify-between">
                  <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
