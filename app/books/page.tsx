import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

export default async function BooksPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const genre = typeof params.genre === 'string' ? params.genre : 'all';
  const page = typeof params.page === 'string' ? params.page : '1';

  const books = getAllBooks();
  const authors = getAllAuthors();

  return <BooksClient initialBooks={books} authors={authors} selectedGenre={genre} page={page} />;
}
