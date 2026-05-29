import { Suspense } from 'react';
import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

export default function BooksPage() {
  const books = getAllBooks();
  const authors = getAllAuthors();

  return (
    <Suspense>
      <BooksClient initialBooks={books} authors={authors} />
    </Suspense>
  );
}
