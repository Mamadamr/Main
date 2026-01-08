import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token");
    if (!token && !req.nextUrl.pathname.includes("/login")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
