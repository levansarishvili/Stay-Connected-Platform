import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const url = process.env.DATA_API_URL;

    // Make a POST request to your backend API for authentication
    const response = await axios.post(`${url}/api/token/`, {
      email,
      password,
    });
    console.log(response.data);

    const {
      access: accessToken,
      refresh: refreshToken,
      user: { id },
    }: {
      access: string;
      refresh: string;
      user: { id: number };
    } = response.data;
    console.log(accessToken, refreshToken, id);

    // Set cookies
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 50,
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 22,
    });

    // Ensure 'id' is stored as a string
    res.cookies.set("userId", String(id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 22,
    });

    return res;
  } catch (error: unknown) {
    // Check if error is an Axios error
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.detail || "Login failed" },
        { status: 401 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
