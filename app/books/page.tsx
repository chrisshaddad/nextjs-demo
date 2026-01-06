import { delay } from '@/lib/utils';
import BooksClient from '@/components/BooksClient';
import { getAllBooks, getAllAuthors } from '@/lib/data';

export default async function BooksPage() {
  await delay(300); 
  
  const books = getAllBooks();
  const authors = getAllAuthors();

  return <BooksClient initialBooks={books} authors={authors} />;
}
