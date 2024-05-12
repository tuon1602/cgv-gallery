import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("next-auth.session-token");
  const productSessionToken = req.cookies.get("__Secure-next-auth.session-token")
  if (!sessionToken || !productSessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico)|/login.*)",
    "/create-image/:path*",
    "/faq/:path*",
    "/profile/:path*",
    "/photo/:path*",
    "/admin/:path*",
    "/saved/:path*",
  ],
};
