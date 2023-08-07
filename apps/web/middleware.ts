import { NextResponse, type NextRequest } from "next/server";

import { verify } from "@/lib/jsonwebtoken";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/login")) {
    const token = request.cookies.get("token")?.value;
    const uid = request.cookies.get("uid")?.value;

    try {
      if (token && uid) {
        if ((await verify(token)).uid === uid) {
          return NextResponse.next();
        } else {
          throw new Error("Token and uid mismatch");
        }
      } else {
        throw new Error("Token or uid not found");
      }
    } catch (error) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
