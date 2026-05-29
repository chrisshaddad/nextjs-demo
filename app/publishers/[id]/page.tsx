import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublisherById, getBooksByPublisherId, getAuthorById } from '@/lib/data';

const PAGE_SIZE = 6;

export default async function PublisherPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const publisher = getPublisherById(parseInt(id, 10));
  if (!publisher) notFound();

  const allBooks = getBooksByPublisherId(publisher.id);

  const requestedPage = parseInt(sp.page ?? '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const totalPages = Math.max(1, Math.ceil(allBooks.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const books = allBooks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hrefForPage = (p: number) => `/publishers/${publisher.id}?page=${p}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/publishers"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block"
      >
        ← Back to Publishers
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800">
            <Image
              src={publisher.logoUrl}
              alt={publisher.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {publisher.name}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              {publisher.country} • Founded {publisher.foundedYear}
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {publisher.description}
            </p>

            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Website: <span className="font-mono">{publisher.website}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Books by Publisher */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Books from {publisher.name}
        </h2>

        {allBooks.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No books found for this publisher.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => {
                const author = getAuthorById(book.authorId);

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
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                        {book.title}
                      </h3>
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
          </>
        )}
      </div>
    </div>
  );
}
