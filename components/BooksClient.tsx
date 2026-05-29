'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import { Book, Author } from '@/lib/data';

interface BooksClientProps {
  initialBooks: Book[];
  authors: Author[];
}

const PAGE_SIZE = 6;

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export default function BooksClient({ initialBooks, authors }: BooksClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ genre from query param (default: all)
  const selectedGenre = searchParams.get('genre') ?? 'all';

  // ✅ page from query param (default: 1)
  const requestedPageRaw = Number(searchParams.get('page') ?? '1');
  const requestedPage = Number.isFinite(requestedPageRaw) && requestedPageRaw > 0 ? requestedPageRaw : 1;

  const setQueryParams = useCallback(
    (updates: Record<string, string | null>, opts?: { replace?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') params.delete(key);
        else params.set(key, value);
      }

      const qs = params.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;

      if (opts?.replace) router.replace(href);
      else router.push(href);
    },
    [searchParams, pathname, router]
  );

  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(initialBooks.map((book) => book.genre));
    return ['all', ...Array.from(genreSet)];
  }, [initialBooks]);

  // Filter books based on search + genre
  const filteredBooks = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return initialBooks.filter((book) => {
      const authorName = authors.find((a) => a.id === book.authorId)?.name ?? '';
      const matchesSearch =
        book.title.toLowerCase().includes(q) || authorName.toLowerCase().includes(q);

      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [initialBooks, authors, searchQuery, selectedGenre]);

  // Pagination based on filtered results
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const currentPage = clamp(requestedPage, 1, totalPages);

  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBooks.slice(start, start + PAGE_SIZE);
  }, [filteredBooks, currentPage]);

  const handleGenreClick = (genre: string) => {
    setQueryParams({
      genre: genre === 'all' ? null : genre,
      page: '1', // reset to first page when changing genre
    });
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    // reset to first page when changing search (avoid empty page 3, etc.)
    if (currentPage !== 1) {
      setQueryParams({ page: '1' }, { replace: true });
    }
  };

  const goToPage = (page: number) => {
    setQueryParams({ page: String(page) });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Books
      </h1>

      <SearchBar onSearch={handleSearch} placeholder="Search by title or author..." />

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {genre === 'all' ? 'All Genres' : genre}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
      </p>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No books found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBooks.map((book) => {
              const author = authors.find((a) => a.id === book.authorId);

              return (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-80 bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {book.title}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      by {author?.name}
                    </p>
                    <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        {book.genre}
                      </span>
                      <span>{book.publishedYear}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed border-zinc-200 dark:border-zinc-800'
                    : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium ${
                    p === currentPage
                      ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                      : 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed border-zinc-200 dark:border-zinc-800'
                    : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
