import { Suspense } from 'react';
import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';
import { delay } from '@/lib/delay';
import PublishersClient from '@/components/PublishersClient';

export default async function PublishersPage() {
  await delay();
  const publishers = getAllPublishers().map((p) => ({
    ...p,
    bookCount: getBooksByPublisherId(p.id).length,
  }));

  return (
    <Suspense>
      <PublishersClient publishers={publishers} />
    </Suspense>
  );
}
