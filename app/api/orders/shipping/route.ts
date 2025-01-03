import { NextResponse } from "next/server";

interface ShippingZone {
  id: number;
  name: string;
}

interface ShippingMethod {
  id: number;
  method_title: string;
}

export async function GET() {
  try {
    // Fetch all shipping zones
    const response = await fetch(
      "https://panelcmslagasin.deskar.pl/wp-json/wc/v3/shipping/zones",
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

    const zones: ShippingZone[] = await response.json();

    // For each zone, fetch the associated shipping methods
    const shippingMethodsPromises = zones.map(async (zone: ShippingZone) => {
      const methodsResponse = await fetch(
        `https://panelcmslagasin.deskar.pl/wp-json/wc/v3/shipping/zones/${zone.id}/methods`,
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
      const methods: ShippingMethod[] = await methodsResponse.json();
      return {
        zone: zone,
        methods: methods,
      };
    });

    const shippingMethodsData = await Promise.all(shippingMethodsPromises);

    return NextResponse.json(shippingMethodsData);
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping methods" },
      { status: 500 }
    );
  }
}
