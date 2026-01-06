import { delay } from '@/lib/utils';
import PublishersClient from '@/components/PublishersClient';

export default async function PublishersPage() {
  await delay(300);
  
  return <PublishersClient />;
}

