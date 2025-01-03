import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const consumerKey = process.env.WOO_API_CONSUMER;
  const consumerSecret = process.env.WOO_API_SECRET;

  if (!consumerKey || !consumerSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Tworzenie nagłówka Basic Auth z kluczy API
  const authHeader = `Basic ${Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64")}`;

  const userId = params.id; // Extract userId from params
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // API request to WooCommerce with the extracted userId
    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/orders?customer=${userId}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader, // Using Basic Auth header
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text(); // Get the error body for debugging
      console.error(
        `Failed to fetch orders. Response status: ${response.status}`
      );
      console.error(`Error body: ${errorBody}`);
      throw new Error(`Failed to fetch orders: ${errorBody}`);
    }

    const orders = await response.json();
    if (!orders || orders.length === 0) {
      console.warn("No orders found for the user.");
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error occurred while fetching orders:", error);
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}
