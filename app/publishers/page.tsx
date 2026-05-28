import Link from 'next/link';
import Image from 'next/image';
import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';

const PAGE_SIZE = 3;

export default async function PublishersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params.page ?? 1));
  const search = params.search || '';
  const sortBy = params.sortBy || 'name';
  const sortOrder = params.sortOrder || 'asc';

  let allPublishers = getAllPublishers();

  // 1. Filtering
  if (search) {
    const lowerSearch = search.toLowerCase();
    allPublishers = allPublishers.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.country.toLowerCase().includes(lowerSearch)
    );
  }

  // 2. Sorting
  allPublishers.sort((a, b) => {
    let valA: any = a[sortBy as keyof typeof a];
    let valB: any = b[sortBy as keyof typeof b];

    if (sortBy === 'books') {
      valA = getBooksByPublisherId(a.id).length;
      valB = getBooksByPublisherId(b.id).length;
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  // 3. Pagination
  const totalPages = Math.ceil(allPublishers.length / PAGE_SIZE);

  const publishers = allPublishers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const createSortLink = (field: string) => {
    const query = new URLSearchParams();
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    query.set('sortBy', field);
    query.set('sortOrder', newOrder);
    if (search) query.set('search', search);
    return `/publishers?${query.toString()}`;
  };

  const buildPaginationLink = (page: number) => {
    const query = new URLSearchParams();
    query.set('page', page.toString());
    if (search) query.set('search', search);
    if (sortBy) query.set('sortBy', sortBy);
    if (sortOrder) query.set('sortOrder', sortOrder);
    return `/publishers?${query.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Publishers
      </h1>

      {/* Filter Form */}
      <form method="GET" action="/publishers" className="mb-6 flex gap-4">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Filter by name or country..."
          className="px-4 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 flex-1 max-w-sm"
        />
        {sortBy && <input type="hidden" name="sortBy" value={sortBy} />}
        {sortOrder && <input type="hidden" name="sortOrder" value={sortOrder} />}
        <button
          type="submit"
          className="px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
        >
          Filter
        </button>
      </form>

      {/* Table View */}
      <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors">
                <Link href={createSortLink('name')} className="flex items-center gap-1">
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Link>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors">
                <Link href={createSortLink('country')} className="flex items-center gap-1">
                  Country {sortBy === 'country' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Link>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors">
                <Link href={createSortLink('foundedYear')} className="flex items-center gap-1">
                  Founded {sortBy === 'foundedYear' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Link>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors">
                <Link href={createSortLink('books')} className="flex items-center gap-1">
                  Total Books {sortBy === 'books' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
            {publishers.map((publisher) => {
              const bookCount = getBooksByPublisherId(publisher.id).length;

              return (
                <tr
                  key={publisher.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 rounded-md overflow-hidden">
                        <Image
                          src={publisher.logoUrl}
                          alt={publisher.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Link
                        href={`/publishers/${publisher.id}`}
                        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {publisher.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {publisher.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {publisher.foundedYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {bookCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {publishers.length === 0 && (
          <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
            No publishers found matching your criteria.
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        {currentPage > 1 && (
          <Link href={buildPaginationLink(currentPage - 1)} className="hover:text-blue-600 dark:hover:text-blue-400">
            Previous
          </Link>
        )}

        <span>
          {totalPages > 0 ? currentPage : 0} / {totalPages}
        </span>

        {currentPage < totalPages && (
          <Link href={buildPaginationLink(currentPage + 1)} className="hover:text-blue-600 dark:hover:text-blue-400">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}