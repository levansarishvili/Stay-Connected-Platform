import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Retrieve the access token from cookies
    const accessToken = req.cookies.get("accessToken")?.value;

    const url = process.env.NEXT_PUBLIC_DATA_API_URL;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized. Access token is missing." },
        { status: 401 }
      );
    }

    const response = await fetch(`${url}/api/questions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create question" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
