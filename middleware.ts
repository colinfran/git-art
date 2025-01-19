import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;
  // Redirect signed-in users from '/' to '/app'
  if (pathname === '/' && session?.user) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  // Redirect unauthenticated users from '/app' to '/'
  if (pathname.startsWith('/app') && !session?.user) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

// Don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};