import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const url = process.env.NEXT_PUBLIC_DATA_API_URL;
  const baseUrl = process.env.FRONTEND_URL;

  // If no accessToken or refreshToken, redirect to login
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(`${baseUrl}/login`);
  }

  // Check if the accessToken is expired
  const isAccessTokenExpired = isTokenExpired(accessToken);

  if (isAccessTokenExpired) {
    try {
      // Make a POST request to refresh the accessToken
      const refreshResponse = await fetch(`${url}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();

        // Update the cookies with the new accessToken
        const res = NextResponse.next();
        res.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 10,
        });

        return res;
      } else {
        // If refreshToken is expired or invalid, log out the user
        return redirectToLogin();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return redirectToLogin();
    }
  }

  // If accessToken is valid, proceed with the request
  return NextResponse.next();
}

// Helper function to check if a token is expired
function isTokenExpired(token: string) {
  try {
    // Decode the payload
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    // Compare current time with token expiration
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

//  Function to redirect to login
function redirectToLogin() {
  const baseUrl = process.env.FRONTEND_URL;
  const res = NextResponse.redirect(`${baseUrl}/login`);
  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");
  return res;
}
