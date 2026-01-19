'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { Book, Author } from '@/lib/data';
import { useRouter, useSearchParams } from 'next/navigation';

interface BooksClientProps {
  initialBooks: Book[];
  authors: Author[];
  selectedGenre: string;
}

const PAGE_SIZE = 5;

export default function BooksClient({ initialBooks, authors, selectedGenre }: BooksClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  function setQueryParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);

    });
    const qs = params.toString();
    router.push(qs ? `/books?${qs}` : '/books');
  }

  function setGenreQueryParam(genre: string) {
    if (genre === 'all') {
      setQueryParams({ genre: null, page: '1' });
    } else {
      setQueryParams({ genre, page: '1' });
    }
  }

  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(initialBooks.map(book => book.genre));
    return ['all', ...Array.from(genreSet)];
  }, [initialBooks]);

  // Filter books based on search and genre
  const filteredBooks = useMemo(() => {
    return initialBooks.filter(book => {
      const authorName = authors.find(a => a.id === book.authorId)?.name ?? '';
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [initialBooks, searchQuery, selectedGenre, authors]);

  const pageParam = searchParams.get('page');
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + PAGE_SIZE);

  function goToPage(nextPage: number) {
    const clamped = Math.max(1, Math.min(nextPage, totalPages));
    setQueryParams({ page: String(clamped) });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Books
      </h1>

      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Search by title or author..."
      />

      {/* Genre Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              onClick={() => setGenreQueryParam(genre)}
              key={genre}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedGenre === genre
                ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
              {genre === 'all' ? 'All Genres' : genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {paginatedBooks.length} of {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
      </p>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No books found matching your criteria.
          </p>
        </div>
      ) : (
        <><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBooks.map((book) => {
            const author = authors.find(a => a.id === book.authorId);

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
                    className="object-cover" />
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
        </div><div className="flex items-center justify-between mt-10">
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage <= 1}
              className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              ← Prev
            </button>

            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Page <span className="font-semibold">{safePage}</span> of{' '}
              <span className="font-semibold">{totalPages}</span>
            </div>

            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage >= totalPages}
              className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              Next →
            </button>
          </div></>
      )
      }
    </div >
  );
}
