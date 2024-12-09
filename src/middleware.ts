import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    if (
      request.url.includes("/auth/login") ||
      request.url.includes("/auth/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard/home", request.url));
    }
  } else {
    if (request.url.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/auth/login",
    "/auth/register",
    "/profile",
    "/question-details",
  ],
};
