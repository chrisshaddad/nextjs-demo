import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ ok: true });

    res.cookies.set({
        name: 'demo_auth',
        value: '1',
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return res;
}
