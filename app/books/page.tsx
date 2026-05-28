import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

const BOOKS_PER_PAGE = 2;

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    genre?: string;
    q?: string;
  }>;
}) {
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params.page ?? 1));

  const allBooks = getAllBooks();
  const authors = getAllAuthors();

  const genre = params.genre ?? 'all';
  const query = params.q?.toLowerCase() ?? '';


  const filteredBooks = allBooks.filter((book) => {
    const matchesGenre = genre === 'all' || book.genre === genre;

    const matchesSearch =
      query === '' ||
      book.title.toLowerCase().includes(query);

    return matchesGenre && matchesSearch;
  });

  

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  );


  const safePage = Math.min(currentPage, totalPages);

  const books = filteredBooks.slice(
    (safePage - 1) * BOOKS_PER_PAGE,
    safePage * BOOKS_PER_PAGE
  );

  return (
    <BooksClient
      initialBooks={books}
      authors={authors}
      currentPage={safePage}
      totalPages={totalPages}
    />
  );
}