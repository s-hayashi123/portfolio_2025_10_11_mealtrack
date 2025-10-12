import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoots = ["/", "/signup"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isPrivateRoutes = !publicRoots.includes(request.nextUrl.pathname);

  if (!sessionCookie && isPrivateRoutes) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|_next|.*\\..*).*)"],
};
