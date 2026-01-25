'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Pagination from './Pagination';
import { Publisher } from '@/lib/data';

const ITEMS_PER_PAGE = 10;

type SortField = 'name' | 'country' | 'foundedYear';
type SortOrder = 'asc' | 'desc';

interface PublishersClientProps {
  publishers: Publisher[];
  page?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  countryFilter?: string;
}

interface SortIconProps {
  field: SortField;
  sortBy: SortField;
  sortOrder: SortOrder;
}

const SortIcon = ({ field, sortBy, sortOrder }: SortIconProps) => {
  if (sortBy !== field) return <span className="text-gray-400">⇅</span>;
  return sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>;
};

export default function PublishersClient({
  publishers,
  page = '1',
  sortBy = 'name',
  sortOrder = 'asc',
  countryFilter = ''
}: PublishersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(page, 10) || 1;

  // Get unique countries for filter
  const countries = useMemo(() => {
    const countrySet = new Set(publishers.map(p => p.country));
    return ['All', ...Array.from(countrySet).sort()];
  }, [publishers]);

  // Filter by country
  const filteredPublishers = useMemo(() => {
    if (!countryFilter || countryFilter === 'All') {
      return publishers;
    }
    return publishers.filter(p => p.country === countryFilter);
  }, [publishers, countryFilter]);

  // Sort publishers
  const sortedPublishers = useMemo(() => {
    const sorted = [...filteredPublishers].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredPublishers, sortBy, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sortedPublishers.length / ITEMS_PER_PAGE);
  const validPage = Math.min(currentPage, Math.max(1, totalPages));
  const paginatedPublishers = useMemo(() => {
    const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedPublishers.slice(startIndex, endIndex);
  }, [sortedPublishers, validPage]);

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams.toString());
    const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    params.set('sortBy', field);
    params.set('sortOrder', newSortOrder);
    params.delete('page');
    router.push(`/publishers?${params.toString()}`);
  };

  const handleCountryFilter = (country: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (country === 'All') {
      params.delete('country');
    } else {
      params.set('country', country);
    }
    params.delete('page');
    router.push(`/publishers?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Publishers
      </h1>

      {/* Country Filter */}
      <div className="mb-8">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
          Filter by Country:
        </label>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => handleCountryFilter(country)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (countryFilter === country || (country === 'All' && !countryFilter))
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {paginatedPublishers.length} of {sortedPublishers.length} {sortedPublishers.length === 1 ? 'publisher' : 'publishers'}
      </p>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <table className="w-full">
          <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  Name <SortIcon field="name" sortBy={sortBy} sortOrder={sortOrder} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('country')}
                  className="font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  Country <SortIcon field="country" sortBy={sortBy} sortOrder={sortOrder} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('foundedYear')}
                  className="font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  Founded <SortIcon field="foundedYear" sortBy={sortBy} sortOrder={sortOrder} />
                </button>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-zinc-900 dark:text-zinc-50">
                Website
              </th>
              <th className="px-6 py-4 text-left font-semibold text-zinc-900 dark:text-zinc-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPublishers.map((publisher) => (
              <tr key={publisher.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-50">
                  {publisher.name}
                </td>
                <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                  {publisher.country}
                </td>
                <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                  {publisher.foundedYear}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://${publisher.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {publisher.website}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/publishers/${publisher.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      {sortedPublishers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No publishers found matching your criteria.
          </p>
        </div>
      )}

      <Pagination currentPage={validPage} totalPages={totalPages} baseUrl="/publishers" />
    </div>
  );
}
