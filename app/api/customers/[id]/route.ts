// app/api/customers/[id]/route.ts
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

  const userId = params.id;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Wysłanie zapytania do API WooCommerce w celu pobrania danych klienta
    const response = await fetch(
      `${
        process.env.WORDPRESS_API_URL
      }/wp-json/wc/v3/customers/${userId}?timestamp=${new Date().getTime()}`,
      {
        headers: {
          Authorization: authHeader, // Dodanie nagłówka autoryzacji
          "Content-Type": "application/json", // Upewnienie się, że typ danych jest JSON
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text(); // Pobranie treści odpowiedzi w przypadku błędu
      console.error(
        `Failed to fetch customer data. Response status: ${response.status}`
      );
      console.error(`Error body: ${errorBody}`);
      throw new Error(`Failed to fetch customer data: ${errorBody}`);
    }

    const customerData = await response.json();

    if (!customerData || Object.keys(customerData).length === 0) {
      console.warn("Fetched data is empty or invalid.");
      return NextResponse.json(
        { error: "No customer data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(customerData);
  } catch (error) {
    console.error("Error occurred while fetching customer data:", error);
    return NextResponse.json(
      { error: "Error fetching customer data" },
      { status: 500 }
    );
  }
}
