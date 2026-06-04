import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/dev-token" &&
    (process.env.NODE_ENV === "production" || !LOCAL_HOSTS.has(request.nextUrl.hostname))
  ) {
    return new Response("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dev-token"],
};
