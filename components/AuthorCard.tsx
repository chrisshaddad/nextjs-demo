import Link from 'next/link';
import Image from 'next/image';
import { Author } from '@/lib/data';

interface AuthorCardProps {
  author: Author;
  bookCount: number;
}

export default function AuthorCard({ author, bookCount }: AuthorCardProps) {
  return (
    <Link 
      href={`/authors/${author.id}`}
      className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
            <Image
              src={author.imageUrl}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
              {author.name}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              {author.nationality}
            </p>
          </div>
        </div>
        
        <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">
          {author.bio}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Born: {author.birthYear}
          </span>
          <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-700 dark:text-zinc-300">
            {bookCount} {bookCount === 1 ? 'book' : 'books'}
          </span>
        </div>
      </div>
    </Link>
  );
}
