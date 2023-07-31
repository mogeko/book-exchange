import { NextResponse, type NextRequest } from "next/server";

import { sign, verify } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value;
    const uid = request.cookies.get("uid")?.value;

    try {
      if (token && uid && (await verify(token)).uid === uid) {
        const jwt = await sign({ uid }, { expiresIn: "7d" });
        const response = NextResponse.next();
        response.cookies.set("token", jwt, {
          expires: new Date(Date.now() + 604800000), // 7 days
          path: "/",
        });
        response.cookies.set("uid", uid, {
          expires: new Date(Date.now() + 604800000), // 7 days
          path: "/",
        });

        return response;
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
