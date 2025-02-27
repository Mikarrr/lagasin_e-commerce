import { NextResponse } from "next/server";
import { Variant } from "@/app/api/types/variants";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  let allVariants: Variant[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await fetch(
        `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products/${productId}/variations?consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}&per_page=${perPage}&page=${page}`
      );

      if (!response.ok) {
        return NextResponse.json(
          {
            error: `Failed to fetch variants for product ${productId}`,
          },
          { status: response.status }
        );
      }

      const variants: Variant[] = await response.json();

      if (variants.length === 0) {
        break; // Exit loop if no more variants are found
      }

      allVariants = allVariants.concat(variants);
      page++;
    }

    return NextResponse.json(allVariants); // Return all collected variants
  } catch (error) {
    console.error("Error fetching product variants:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
