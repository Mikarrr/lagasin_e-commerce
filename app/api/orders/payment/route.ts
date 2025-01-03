// app/api/shipping-methods/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://panelcmslagasin.deskar.pl/wp-json/wc/v3/payment_gateways",
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${process.env.WOO_API_CONSUMER}:${process.env.WOO_API_SECRET}`
          )}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping methods" },
      { status: 500 }
    );
  }
}
