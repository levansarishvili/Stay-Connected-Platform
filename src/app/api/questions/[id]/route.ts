import { NextRequest, NextResponse } from "next/server";

// Update to GET request since you are fetching data based on the `id`
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Retrieve the access token from cookies
    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized. Access token is missing." },
        { status: 401 }
      );
    }

    // Fetch question details using the provided `id`
    const response = await fetch(
      `http://ios-stg.stayconnected.digital/api/questions/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to retrieve question details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
