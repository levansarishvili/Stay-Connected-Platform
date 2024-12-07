// app/api/tags/route.ts

import { NextResponse } from "next/server";
import axios from "axios";
import { getAccessToken } from "@/lib/cookies"; // Make sure this function is correct and accessible

export async function GET() {
  const accessToken = getAccessToken();

  const url = process.env.DATA_API_URL;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(`${url}/api/tags/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
