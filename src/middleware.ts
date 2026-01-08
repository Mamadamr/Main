import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const pathname = req.nextUrl.pathname;

  // محافظت از admin
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", "https://sarminco.ir"));
  }

  // اگر لاگین شده دوباره نره لاگین
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", "https://sarminco.ir"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
