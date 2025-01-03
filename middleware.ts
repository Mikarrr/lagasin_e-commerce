import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("jwtToken");

  if (!jwtToken && req.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account"],
};
