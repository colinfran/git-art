import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  // const { pathname } = req.nextUrl;

  // // Redirect signed-in users from '/' to '/app'
  // if (pathname === '/' && token) {
  //   return NextResponse.redirect(new URL('/app', req.url));
  // }

  // // Redirect unauthenticated users from '/app' to '/'
  // if (pathname.startsWith('/app') && !token) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  // Allow other routes to proceed
  return NextResponse.next();
}

// Don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};