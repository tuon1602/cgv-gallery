import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("next-auth.session-token"); //development session token
  const productSessionToken = req.cookies.get("__Secure-next-auth.session-token") // product session token
  if (process.env.NODE_ENV === "development" && !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (process.env.NODE_ENV === "production" && !productSessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // if (req.nextUrl.pathname.startsWith('/api') && !sessionToken) {
  //   return NextResponse.json({message:"Not authorized",stats:403})
  // }
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
// export { default } from "next-auth/middleware"
// import { withAuth } from "next-auth/middleware"
// export default withAuth({
//   // Matches the pages config in `[...nextauth]`
//   pages: {
//     signIn: "/login",
//   },
// })
