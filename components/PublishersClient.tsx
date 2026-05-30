"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Publisher } from "@/lib/data";

interface PublishersClientProps {
  publishers: Publisher[];
}

export default function PublishersClient({
  publishers,
}: PublishersClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "name";
  const sortDir = searchParams.get("sortDir") ?? "asc";

  // 1. filter publishers by search
  const filteredPublishers = publishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(search.toLowerCase()),
  );

  // 2. sort publishers by sortBy + sortDir
  const sortedPublishers = [...filteredPublishers].sort((a, b) => {
    if (sortBy === "name") {
      return sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === "foundedYear") {
      return sortDir === "asc"
        ? a.foundedYear - b.foundedYear
        : b.foundedYear - a.foundedYear;
    }
    return 0;
  });

  // 3. render a table
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Publishers
      </h1>

      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("search", e.target.value);
          router.push(`${pathname}?${params.toString()}`);
        }}
        placeholder="Search publishers..."
        className="mb-6 w-full px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
      />

      {/* Table goes here */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wide">
            <th
              className="py-3 pr-8 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("sortBy", "name");
                params.set(
                  "sortDir",
                  sortBy === "name" && sortDir === "asc" ? "desc" : "asc",
                );
                router.push(`${pathname}?${params.toString()}`);
              }}
            >
              Name {sortBy === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="py-3 pr-8 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("sortBy", "foundedYear");
                params.set(
                  "sortDir",
                  sortBy === "foundedYear" && sortDir === "asc"
                    ? "desc"
                    : "asc",
                );
                router.push(`${pathname}?${params.toString()}`);
              }}
            >
              Founded{" "}
              {sortBy === "foundedYear" ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="py-3">Website</th>
          </tr>
        </thead>
        <tbody>
          {sortedPublishers.map((publisher) => (
            <tr
              key={publisher.id}
              className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <td className="py-4 pr-8 font-medium text-zinc-900 dark:text-zinc-50">
                <Link
                  href={`/publishers/${publisher.id}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {publisher.name}
                </Link>
              </td>
              <td className="py-4 pr-8 text-zinc-600 dark:text-zinc-400">{publisher.foundedYear}</td>
              <td className="py-4">
                <a
                  href={publisher.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {publisher.website}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
