// app/api/users/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwtToken")?.value;

  if (!jwtToken) {
    return NextResponse.json(
      { error: "JWT token is missing or invalid" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error body:", errorBody);
      throw new Error(`Failed to fetch user data: ${errorBody}`);
    }

    const userData = await response.json();

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}
