import PublishersClient from '@/components/PublishersClient';
import { getAllPublishers } from '@/lib/data';

type SortField = 'name' | 'country' | 'foundedYear';
type SortOrder = 'asc' | 'desc';

export default async function PublishersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? params.page : '1';
  const sortBy = (typeof params.sortBy === 'string' && ['name', 'country', 'foundedYear'].includes(params.sortBy) 
    ? params.sortBy 
    : 'name') as SortField;
  const sortOrder = (typeof params.sortOrder === 'string' && ['asc', 'desc'].includes(params.sortOrder)
    ? params.sortOrder 
    : 'asc') as SortOrder;
  const countryFilter = typeof params.country === 'string' ? params.country : '';

  const publishers = getAllPublishers();

  return (
    <PublishersClient
      publishers={publishers}
      page={page}
      sortBy={sortBy}
      sortOrder={sortOrder}
      countryFilter={countryFilter}
    />
  );
}
