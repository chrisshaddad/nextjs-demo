import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';
import { sleep } from '@/lib/sleep';

type SearchParams = {
  genre?: string;
};

const PAGE_SIZE = 5;

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {

  await sleep(400);
  const { genre } = await searchParams;
  const books = getAllBooks();
  const authors = getAllAuthors();

  const filteredBooks = genre ?
    books.filter((b) => b.genre === genre) :
    books;

  return (
    <BooksClient
      initialBooks={filteredBooks}
      authors={authors}
      selectedGenre={genre ?? `all`} />);
}
