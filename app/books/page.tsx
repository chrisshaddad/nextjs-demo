import { Suspense } from 'react';
import { getAllBooks, getAllAuthors } from '@/lib/data';
import { delay } from '@/lib/delay';
import BooksClient from '@/components/BooksClient';

export default async function BooksPage() {
  await delay();
  const books = getAllBooks();
  const authors = getAllAuthors();

  return (
    <Suspense>
      <BooksClient initialBooks={books} authors={authors} />
    </Suspense>
  );
}
