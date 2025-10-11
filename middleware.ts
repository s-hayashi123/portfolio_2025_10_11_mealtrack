import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoots = ["/", "login", "register"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isPrivateRoutes = !publicRoots.includes(request.nextUrl.pathname);

  if (!sessionCookie && isPrivateRoutes) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Next.jsの公式推奨に近い、標準的なWebアプリ用matcher
      (APIやNext.jsの内部リソース、公開リソースへのアクセスは除外)
    */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
