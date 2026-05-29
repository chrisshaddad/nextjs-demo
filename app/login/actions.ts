'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(_: unknown, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const from = formData.get('from') as string;

  if (!username?.trim() || !password?.trim()) {
    return { error: 'Please enter a username and password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('auth', 'true', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect(from || '/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
  redirect('/login');
}
