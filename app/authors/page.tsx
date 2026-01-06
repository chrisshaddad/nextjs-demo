'use client';
import { getAllAuthors, getBooksByAuthorId } from '@/lib/data';
import AuthorCard from '@/components/AuthorCard';
import { useQueryState } from '@/hooks';
import PageSelector from '@/components/PageSelector';

export default function AuthorsPage() {
  const authors = getAllAuthors();
  const [page, setPage] = useQueryState('page', '1');
  const elementsPerPage = 3;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8'>
        All Authors
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {authors
          .slice(
            (parseInt(page) - 1) * elementsPerPage,
            parseInt(page) * elementsPerPage
          )
          .map((author) => {
            const bookCount = getBooksByAuthorId(author.id).length;

            return (
              <AuthorCard
                author={author}
                bookCount={bookCount}
                key={author.id}
              />
            );
          })}
      </div>
      {authors.length > elementsPerPage ? (
        <PageSelector
          pageCount={Math.ceil(authors.length / elementsPerPage)}
          setPage={(page: number) => setPage(page.toString())}
          currentPage={parseInt(page)}
        />
      ) : undefined}
    </div>
  );
}
