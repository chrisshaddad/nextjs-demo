'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';

type SortDirection = 'asc' | 'desc';
type SortField = 'name' | 'location' | 'foundedYear' | 'bookCount';

export default function PublishersClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const allPublishers = getAllPublishers();

  // Filter publishers based on search query
  const filteredPublishers = useMemo(() => {
    return allPublishers.filter(publisher => {
      const matchesSearch = 
        publisher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        publisher.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [allPublishers, searchQuery]);

  // Sort publishers
  const sortedPublishers = useMemo(() => {
    return [...filteredPublishers].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortField === 'bookCount') {
        aValue = getBooksByPublisherId(a.id).length;
        bValue = getBooksByPublisherId(b.id).length;
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });
  }, [filteredPublishers, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-zinc-400">↕</span>;
    }
    return sortDirection === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Publishers
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {sortedPublishers.length} {sortedPublishers.length === 1 ? 'publisher' : 'publishers'}
      </p>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-2">
                    Name
                    <SortIcon field="name" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    onClick={() => handleSort('location')}>
                  <div className="flex items-center gap-2">
                    Location
                    <SortIcon field="location" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    onClick={() => handleSort('foundedYear')}>
                  <div className="flex items-center gap-2">
                    Founded
                    <SortIcon field="foundedYear" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    onClick={() => handleSort('bookCount')}>
                  <div className="flex items-center gap-2">
                    Books
                    <SortIcon field="bookCount" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {sortedPublishers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-600 dark:text-zinc-400">
                    No publishers found matching your search.
                  </td>
                </tr>
              ) : (
                sortedPublishers.map((publisher) => {
                  const bookCount = getBooksByPublisherId(publisher.id).length;
                  return (
                    <tr key={publisher.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                          {publisher.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {publisher.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {publisher.foundedYear}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {bookCount} {bookCount === 1 ? 'book' : 'books'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href={`/publishers/${publisher.id}`}
                          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

