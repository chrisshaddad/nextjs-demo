import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/data';

interface BookCardProps {
  book: Book;
  authorName: string;
}

export default function BookCard({ book, authorName }: BookCardProps) {
  return (
    <Link 
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
          by {authorName}
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
}
