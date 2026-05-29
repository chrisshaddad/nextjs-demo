'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Publisher } from '@/lib/data';

type SortKey = 'name' | 'country' | 'foundedYear' | 'bookCount';

interface PublisherRow extends Publisher {
  bookCount: number;
}

interface PublishersClientProps {
  publishers: PublisherRow[];
}

export default function PublishersClient({ publishers }: PublishersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = (searchParams.get('sort') ?? 'name') as SortKey;
  const order = searchParams.get('order') ?? 'asc';
  const country = searchParams.get('country') ?? 'all';

  const countries = ['all', ...Array.from(new Set(publishers.map((p) => p.country)))];

  const setCountry = (c: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (c === 'all') {
      params.delete('country');
    } else {
      params.set('country', c);
    }
    router.push(`?${params.toString()}`);
  };

  const buildSortHref = (key: SortKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === key) {
      params.set('order', order === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sort', key);
      params.set('order', 'asc');
    }
    return `?${params.toString()}`;
  };

  const filtered = publishers.filter((p) => country === 'all' || p.country === country);

  const sorted = [...filtered].sort((a, b) => {
    const dir = order === 'asc' ? 1 : -1;
    if (sort === 'name') return a.name.localeCompare(b.name) * dir;
    if (sort === 'country') return a.country.localeCompare(b.country) * dir;
    if (sort === 'foundedYear') return (a.foundedYear - b.foundedYear) * dir;
    if (sort === 'bookCount') return (a.bookCount - b.bookCount) * dir;
    return 0;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sort !== col) return <span className="ml-1 text-zinc-400">↕</span>;
    return <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>;
  };

  const thClass =
    'px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider';
  const thLinkClass =
    'flex items-center hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Publishers
      </h1>

      {/* Country filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {countries.map((c) => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              country === c
                ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {c === 'all' ? 'All Countries' : c}
          </button>
        ))}
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {sorted.length} {sorted.length === 1 ? 'publisher' : 'publishers'}
      </p>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className={thClass}>
                <Link href={buildSortHref('name')} className={thLinkClass}>
                  Name <SortIcon col="name" />
                </Link>
              </th>
              <th className={thClass}>
                <Link href={buildSortHref('country')} className={thLinkClass}>
                  Country <SortIcon col="country" />
                </Link>
              </th>
              <th className={thClass}>
                <Link href={buildSortHref('foundedYear')} className={thLinkClass}>
                  Founded <SortIcon col="foundedYear" />
                </Link>
              </th>
              <th className={thClass}>
                <Link href={buildSortHref('bookCount')} className={thLinkClass}>
                  Books <SortIcon col="bookCount" />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400"
                >
                  No publishers found.
                </td>
              </tr>
            ) : (
              sorted.map((publisher) => (
                <tr
                  key={publisher.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/publishers/${publisher.id}`}
                      className="font-medium text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    >
                      {publisher.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.country}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.foundedYear}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-700 dark:text-zinc-300">
                      {publisher.bookCount}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
