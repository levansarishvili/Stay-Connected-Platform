import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email, password, first_name, last_name, confirmPassword } =
      await req.json();

    // Send the data to your backend API for registration
    const response = await axios.post(
      "http://ios-stg.stayconnected.digital/api/users/",
      {
        email,
        password,
        first_name,
        last_name,
        confirmPassword,
      }
    );

    const { id } = response.data;

    // Set the user ID in a cookie
    const res = NextResponse.json({
      message: "Registration successful",
      userId: id,
    });

    return res;
  } catch (error: unknown) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: "Registration failed",
          error: error.response?.data || error.message,
        },
        { status: 400 }
      );
    }

    // Fallback for unexpected errors
    return NextResponse.json(
      { message: "An unexpected error occurred", error },
      { status: 500 }
    );
  }
}
