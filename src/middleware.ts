import { NextRequest, NextResponse, userAgent } from "next/server";
import Cookies from "js-cookie";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Cookies.set("pathname", request.nextUrl.pathname);
    // Cookies.set("tes", "ok");
    // console.log("userAgent", userAgent(request));
    // This logic is only applied to /dashboard
  }
}
