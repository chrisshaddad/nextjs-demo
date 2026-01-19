'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const next = searchParams.get('next') || '/books';

    const [loading, setLoading] = useState(false);

    async function onLogin() {
        setLoading(true);
        try {
            await fetch('/api/auth/login', { method: 'POST' });
            router.push(next);
            router.refresh();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Login
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Demo login (fake). Click the button to set an auth cookie.
                </p>

                <button
                    onClick={onLogin}
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-lg font-medium ${loading
                            ? 'opacity-60 cursor-not-allowed bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                            : 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90'
                        }`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-xs text-zinc-500 mt-4">
                    After login you will be redirected to: <span className="font-mono">{next}</span>
                </p>
            </div>
        </div>
    );
}
