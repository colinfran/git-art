import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./lib/auth"

// Pages that need a signed-in user. API routes check the session themselves
// (lib/auth/session.ts), so they aren't handled here.
const authenticatedRoutes = ["/home", "/images", "/generate", "/credits"]

const isAuthenticatedRoute = (pathname: string): boolean =>
  authenticatedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const session = await auth()
  const { pathname } = req.nextUrl

  // Send signed-in users from the landing page to their home page
  if (pathname === "/" && session?.user) {
    return NextResponse.redirect(new URL("/home", req.url))
  }

  // Send signed-out users away from pages that need an account
  if (isAuthenticatedRoute(pathname) && !session?.user) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

// Only invoke Middleware on routes where it can redirect. Each run is a billed
// Edge Middleware invocation, so static files and bot probes should skip it.
export const config = {
  matcher: ["/", "/home/:path*", "/images/:path*", "/generate/:path*", "/credits/:path*"],
}
