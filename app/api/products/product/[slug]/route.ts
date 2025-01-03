import { NextResponse } from "next/server";
import { Product } from "@/app/api/types/product";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json(
      { error: "Product slug is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products?slug=${slug}&consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}`,
      { cache: "no-cache" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch product" },
        { status: response.status }
      );
    }

    const products: Product[] = await response.json();

    if (products.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(products[0]); // Return the first product matching the slug
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
