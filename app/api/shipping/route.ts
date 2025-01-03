import { NextResponse } from "next/server";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "";
const WOO_API_CONSUMER = process.env.WOO_API_CONSUMER || "";
const WOO_API_SECRET = process.env.WOO_API_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, field, value } = body;

    if (!userId || !field || !value) {
      return NextResponse.json(
        { message: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const authHeader = `Basic ${Buffer.from(
      `${WOO_API_CONSUMER}:${WOO_API_SECRET}`
    ).toString("base64")}`;

    const apiResponse = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wc/v3/customers/${userId}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipping: {
            [field]: value,
          },
        }),
      }
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return NextResponse.json(
        { message: `WooCommerce API Error: ${errorText}` },
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
