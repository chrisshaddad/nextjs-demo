import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function BooksPage() {
  await sleep(600);
  const books = getAllBooks();
  const authors = getAllAuthors();
  return <BooksClient initialBooks={books} authors={authors} />;
}
