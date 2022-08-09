import { NextRequest, NextResponse } from "next/server";
import { getHealtcheck } from "./api/GET_Healtcheck";

export async function middleware(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // console.log("request", request);
    // console.log("response", response);
    // const available = await getHealtcheck();
    // console.log('available',availa)
    // if (!available) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = "/maintenance";
    //   return NextResponse.rewrite(url);
    // }
    return NextResponse.next();
  }
}
