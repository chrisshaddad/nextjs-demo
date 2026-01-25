import Link from 'next/link';
import Image from 'next/image';
import { getPublisherById, getBooksByPublisherId, getAuthorById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function PublisherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publisher = getPublisherById(parseInt(id));

  if (!publisher) {
    notFound();
  }

  const publisherBooks = getBooksByPublisherId(publisher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/publishers"
        className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
      >
        ← Back to Publishers
      </Link>

      {/* Publisher Info */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {publisher.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
              Country
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              {publisher.country}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
              Founded
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              {publisher.foundedYear}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
              Books Published
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              {publisherBooks.length}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-2">
            Website
          </h3>
          <a
            href={`https://${publisher.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
          >
            {publisher.website}
          </a>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-4">
            About
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
            {publisher.description}
          </p>
        </div>
      </div>

      {/* Books by this publisher */}
      <div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
          Books Published by {publisher.name}
        </h2>

        {publisherBooks.length === 0 ? (
          <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              No books found from this publisher.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publisherBooks.map((book) => {
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
        )}
      </div>
    </div>
  );
}
