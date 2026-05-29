import Link from 'next/link';
import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';

const PAGE_SIZE = 8;

type SortKey = 'name' | 'country' | 'foundedYear' | 'books';

export default async function PublishersPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    dir?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;

  const q = (sp.q ?? '').trim().toLowerCase();
  const sort: SortKey = (sp.sort as SortKey) ?? 'name';
  const dir = sp.dir === 'desc' ? 'desc' : 'asc';

  const requestedPage = parseInt(sp.page ?? '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const rows = getAllPublishers().map((publisher) => ({
    publisher,
    bookCount: getBooksByPublisherId(publisher.id).length,
  }));

  const filtered = q
    ? rows.filter(({ publisher }) => {
        return (
          publisher.name.toLowerCase().includes(q) ||
          publisher.country.toLowerCase().includes(q)
        );
      })
    : rows;

  const sorted = [...filtered].sort((a, b) => {
    const factor = dir === 'asc' ? 1 : -1;

    const aVal =
      sort === 'books'
        ? a.bookCount
        : (a.publisher as any)[sort];

    const bVal =
      sort === 'books'
        ? b.bookCount
        : (b.publisher as any)[sort];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * factor;
    }

    return String(aVal).localeCompare(String(bVal)) * factor;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageRows = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const buildHref = (overrides: Record<string, string | null>) => {
    const params = new URLSearchParams();

    if (sp.q) params.set('q', sp.q);
    if (sp.sort) params.set('sort', sp.sort);
    if (sp.dir) params.set('dir', sp.dir);
    if (sp.page) params.set('page', sp.page);

    for (const [k, v] of Object.entries(overrides)) {
      if (v === null || v === '') params.delete(k);
      else params.set(k, v);
    }

    const qs = params.toString();
    return qs ? `/publishers?${qs}` : '/publishers';
  };

  const sortLink = (key: SortKey) => {
    const nextDir = sort === key && dir === 'asc' ? 'desc' : 'asc';
    return buildHref({ sort: key, dir: nextDir, page: '1' });
  };

  const hrefForPage = (p: number) => buildHref({ page: String(p) });

  const sortIndicator = (key: SortKey) => {
    if (sort !== key) return null;
    return dir === 'asc' ? ' ↑' : ' ↓';
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        Publishers
      </h1>

      {/* Filter */}
      <form action="/publishers" method="get" className="mb-6 flex gap-2">
        <input
          name="q"
          defaultValue={sp.q ?? ''}
          placeholder="Filter by name or country..."
          className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
        />
        {/* preserve sort/dir when filtering */}
        <input type="hidden" name="sort" value={sort} />
        <input type="hidden" name="dir" value={dir} />
        <button
          className="px-5 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-semibold"
          type="submit"
        >
          Apply
        </button>
      </form>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="p-4">
                <Link className="hover:underline" href={sortLink('name')}>
                  Name{sortIndicator('name')}
                </Link>
              </th>
              <th className="p-4">
                <Link className="hover:underline" href={sortLink('country')}>
                  Country{sortIndicator('country')}
                </Link>
              </th>
              <th className="p-4">
                <Link className="hover:underline" href={sortLink('foundedYear')}>
                  Founded{sortIndicator('foundedYear')}
                </Link>
              </th>
              <th className="p-4">
                <Link className="hover:underline" href={sortLink('books')}>
                  Books{sortIndicator('books')}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map(({ publisher, bookCount }) => (
              <tr
                key={publisher.id}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="p-4">
                  <Link
                    href={`/publishers/${publisher.id}`}
                    className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline"
                  >
                    {publisher.name}
                  </Link>
                </td>
                <td className="p-4 text-zinc-700 dark:text-zinc-300">
                  {publisher.country}
                </td>
                <td className="p-4 text-zinc-700 dark:text-zinc-300">
                  {publisher.foundedYear}
                </td>
                <td className="p-4 text-zinc-700 dark:text-zinc-300">
                  {bookCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Link
            href={hrefForPage(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-sm ${
              currentPage === 1
                ? 'pointer-events-none opacity-50 border-zinc-200 dark:border-zinc-800'
                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Previous
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={hrefForPage(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                p === currentPage
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {p}
            </Link>
          ))}

          <Link
            href={hrefForPage(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-sm ${
              currentPage === totalPages
                ? 'pointer-events-none opacity-50 border-zinc-200 dark:border-zinc-800'
                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
