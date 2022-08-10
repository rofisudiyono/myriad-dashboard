import { NextRequest, NextResponse } from "next/server";
import { getHealtcheck } from "./api/GET_Healtcheck";

export async function middleware(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }
}
