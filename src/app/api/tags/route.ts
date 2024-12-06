// app/api/tags/route.ts

import { NextResponse } from "next/server";
import axios from "axios";
import { getAccessToken } from "@/lib/cookies"; // Make sure this function is correct and accessible

export async function GET() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(
      "http://ios-stg.stayconnected.digital/api/tags/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);

    const tags = response.data.map((tag: { name: string; color: string }) => ({
      value: tag.name,
      label: tag.name,
      color: tag.color,
    }));

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
