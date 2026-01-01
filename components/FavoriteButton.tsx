"use client";

import { useState } from "react";

interface FavoriteButtonProps {
  itemId: number;
  itemType: "book" | "author";
}

export default function FavoriteButton({}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`w-6 h-6 transition-colors ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "fill-none text-zinc-600 dark:text-zinc-400 group-hover:text-red-500"
        }`}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {isFavorite ? "Favorited" : "Add to Favorites"}
      </span>
    </button>
  );
}
