import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("next-auth.session-token");
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
export const config = {
  matcher: ['/admin/:path*','/'],
};
