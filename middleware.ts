import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('bookhub_auth')?.value === '1';

  if (isLoggedIn) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/login';
  loginUrl.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search);

  return NextResponse.redirect(loginUrl);
}

// Protect these routes:
export const config = {
  matcher: ['/books/:path*', '/authors/:path*', '/publishers/:path*'],
};
