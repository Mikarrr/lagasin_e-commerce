// app/api/orders/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    const response = await fetch(
      "https://panelcmslagasin.deskar.pl/wp-json/wc/v3/orders",
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${process.env.WOO_API_CONSUMER}:${process.env.WOO_API_SECRET}`
          )}`,
        },
        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();

    if (response.status === 201 && data.id) {
      // Zwrócenie orderId
      return NextResponse.json({
        message: "Order placed successfully!",
        orderNumber: data.id, // WooCommerce returns the order id
        orderDate: data.date_created,
      });
    } else {
      return NextResponse.json(
        { error: "There was an error processing your order." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { error: "There was an error processing your order." },
      { status: 500 }
    );
  }
}
