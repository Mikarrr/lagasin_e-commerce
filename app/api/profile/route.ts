import { NextResponse } from "next/server";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "";

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();

    const { token, field, value } = requestBody;

    if (!token || !field || !value) {
      return NextResponse.json(
        { message: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/users/me`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      }
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return NextResponse.json(
        { message: `WordPress API Error: ${errorText}` },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in POST handler:", error.message);
      return NextResponse.json(
        { message: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error type:", error);
      return NextResponse.json(
        { message: "Internal Server Error: Unexpected error type" },
        { status: 500 }
      );
    }
  }
}
