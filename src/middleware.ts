import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  // اگر لاگین نکرده و مسیر /admin هست
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    // URL کامل بساز
    const loginUrl = new URL("/login", "https://sarminco.ir");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
