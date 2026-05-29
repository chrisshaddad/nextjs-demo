'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirectTo = sp.get('redirect') ?? '/';

  const login = async () => {
    await fetch('/api/login', { method: 'POST' });
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Login
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Fake auth: click login to set a cookie.
        </p>
        <button
          onClick={login}
          className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-3 rounded-lg font-semibold"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
