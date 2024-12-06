import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  // Clear the authentication cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userId");

  // Return a success response or redirect
  return NextResponse.json({ message: "Logged out successfully" });
}
