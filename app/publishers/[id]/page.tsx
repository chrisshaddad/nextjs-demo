import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getPublisherById,
  getBooksByPublisherId,
  getAuthorById,
} from '@/lib/data';

export default async function PublisherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const publisher = getPublisherById(Number(id));

  if (!publisher) {
    notFound();
  }

  const books = getBooksByPublisherId(publisher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/publishers"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block"
      >
        ← Back to Publishers
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
     
     
        <div className="md:col-span-1">
          <div className="relative h-64 md:h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={publisher.logoUrl}
              alt={publisher.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

       
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {publisher.name}
          </h1>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            {publisher.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Country:
              </span>
              <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {publisher.country}
              </span>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Founded:
              </span>
              <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {publisher.foundedYear}
              </span>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Books:
              </span>
              <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {books.length}
              </span>
            </div>
          </div>
        </div>
      </div>

 
      {books.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Books from {publisher.name}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div className="relative h-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2">
                  {book.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {book.publishedYear}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}