import { NextResponse } from "next/server";
import { Product } from "@/app/api/types/product";

export async function GET() {
  let allProducts: Product[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}&per_page=${perPage}&page=${page}&_fields=id,name,slug,price,categories,images,atttributes`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: response.status }
      );
    }

    const products: Product[] = await response.json();

    if (products.length === 0) {
      break;
    }

    allProducts = allProducts.concat(products);

    page++;
  }

  return NextResponse.json(allProducts);
}
