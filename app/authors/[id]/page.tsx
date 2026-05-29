import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAuthorById, getBooksByAuthorId } from '@/lib/data';
import FavoriteButton from '@/components/FavoriteButton';

const PAGE_SIZE = 6;

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const author = getAuthorById(parseInt(id));
  if (!author) notFound();

  const allBooks = getBooksByAuthorId(author.id);

  const requestedPage = parseInt(sp.page ?? '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const totalPages = Math.max(1, Math.ceil(allBooks.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const books = allBooks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hrefForPage = (p: number) => `/authors/${author.id}?page=${p}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/authors"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block"
      >
        ← Back to Authors
      </Link>
      
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mt-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Author Image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-xl">
              <Image
                src={author.imageUrl}
                alt={author.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Author Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {author.name}
            </h1>
            
            <div className="mb-6">
              <FavoriteButton itemId={author.id} itemType="author" />
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Born:</span>
                <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  {author.birthYear}
                </span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Nationality:</span>
                <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  {author.nationality}
                </span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Books:</span>
                <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  {books.length}
                </span>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Biography
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {author.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    {/* Books by Author */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Books by {author.name}
        </h2>

        {allBooks.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No books found for this author.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
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
                    <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        {book.genre}
                      </span>
                      <span>{book.publishedYear}</span>
                    </div>
                  </div>
                </Link>
              ))}
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
