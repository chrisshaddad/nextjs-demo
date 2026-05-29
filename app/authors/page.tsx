import Link from 'next/link';
import { getAllAuthors, getBooksByAuthorId } from '@/lib/data';
import AuthorCard from '@/components/AuthorCard';

const PAGE_SIZE = 6;

export default async function AuthorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;

  const requestedPage = parseInt(sp.page ?? '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const allAuthors = getAllAuthors();
  const totalPages = Math.max(1, Math.ceil(allAuthors.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedAuthors = allAuthors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const hrefForPage = (p: number) => `/authors?page=${p}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Authors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedAuthors.map((author) => {
          const bookCount = getBooksByAuthorId(author.id).length;

          return <AuthorCard key={author.id} author={author} bookCount={bookCount} />;
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Link
            href={hrefForPage(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-sm ${
              currentPage === 1
                ? 'pointer-events-none opacity-50 border-zinc-200 dark:border-zinc-800'
                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Previous
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={hrefForPage(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                p === currentPage
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {p}
            </Link>
          ))}

          <Link
            href={hrefForPage(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-sm ${
              currentPage === totalPages
                ? 'pointer-events-none opacity-50 border-zinc-200 dark:border-zinc-800'
                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
