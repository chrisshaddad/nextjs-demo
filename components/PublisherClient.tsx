'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Publisher } from '@/lib/data';

type Props = {
    publishers: Publisher[];
};

export default function PublishersTableClient({ publishers }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const q = searchParams.get('q') ?? '';
    const sort = searchParams.get('sort') ?? 'name';
    const dir = searchParams.get('dir') ?? 'asc';

    function push(next: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(next).forEach(([k, v]) => {
            if (v === null) params.delete(k);
            else params.set(k, v);
        });
        const qs = params.toString();
        router.push(qs ? `/publishers?${qs}` : '/publishers');
    }

    function toggleSort(nextSort: string) {
        if (sort === nextSort) {
            push({ sort: nextSort, dir: dir === 'asc' ? 'desc' : 'asc' });
            return;
        }
        push({ sort: nextSort, dir: 'asc' });
    }

    const filteredSorted = useMemo(() => {
        const query = q.trim().toLowerCase();

        const filtered = query.length === 0
            ? publishers
            : publishers.filter((p) => {
                return (
                    p.name.toLowerCase().includes(query) ||
                    p.country.toLowerCase().includes(query)
                );
            });

        const sorted = [...filtered].sort((a, b) => {
            const factor = dir === 'asc' ? 1 : -1;

            if (sort === 'country') {
                return a.country.localeCompare(b.country) * factor;
            }
            if (sort === 'foundedYear') {
                return (a.foundedYear - b.foundedYear) * factor;
            }
            return a.name.localeCompare(b.name) * factor;
        });

        return sorted;
    }, [publishers, q, sort, dir]);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <input
                    value={q}
                    onChange={(e) => push({ q: e.target.value, })}
                    placeholder="Filter publishers by name or country..."
                    className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200">
                        <tr>
                            <th className="px-4 py-3">Logo</th>
                            <th className="px-4 py-3 cursor-pointer select-none" onClick={() => toggleSort('name')}>
                                Name {sort === 'name' ? (dir === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th className="px-4 py-3 cursor-pointer select-none" onClick={() => toggleSort('country')}>
                                Country {sort === 'country' ? (dir === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th className="px-4 py-3 cursor-pointer select-none" onClick={() => toggleSort('foundedYear')}>
                                Founded {sort === 'foundedYear' ? (dir === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {filteredSorted.length === 0 ? (
                            <tr>
                                <td className="px-4 py-6 text-zinc-600 dark:text-zinc-400" colSpan={5}>
                                    No publishers found.
                                </td>
                            </tr>
                        ) : (
                            filteredSorted.map((p) => (
                                <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                                    <td className="px-4 py-3">
                                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                                            <Image src={p.logoUrl} alt={p.name} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                                        {p.name}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                        {p.country}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                        {p.foundedYear}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/publishers/${p.id}`}
                                            className="text-zinc-900 dark:text-zinc-50 underline underline-offset-4"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
                Showing {filteredSorted.length} publisher{filteredSorted.length === 1 ? '' : 's'}
            </div>
        </div>
    );
}
