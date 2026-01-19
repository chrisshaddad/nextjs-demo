import { getAllPublishers } from "@/lib/data";
import PublishersClient from '@/components/PublisherClient';
import { get } from "http";
import { sleep } from "@/lib/sleep";

export default async function PublishersPage() {
    await sleep(400);
    const publishers = getAllPublishers();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">Publishers</h1>
            <PublishersClient publishers={publishers} />
        </div>
    );
}
