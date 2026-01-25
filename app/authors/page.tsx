import AuthorsClient from '@/components/AuthorsClient';
import { getAllAuthors, getBooksByAuthorId } from '@/lib/data';

export default async function AuthorsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? params.page : '1';

  const authors = getAllAuthors();
  const authorsWithBookCount = authors.map(author => ({
    ...author,
    bookCount: getBooksByAuthorId(author.id).length
  }));

  return <AuthorsClient authors={authorsWithBookCount} page={page} />;
}
