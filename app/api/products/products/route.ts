import { NextResponse } from "next/server";
import { Product } from "@/app/api/types/product";

export async function GET() {
  const perPage = 100;
  const allProducts: Product[] = [];
  let page = 1;
  let totalPages = 1;

  // Pobierz pierwszą stronę, aby określić liczbę stron
  const initialResponse = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}&per_page=${perPage}&page=${page}`,
    { cache: "no-cache" }
  );

  if (!initialResponse.ok) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: initialResponse.status }
    );
  }

  const products: Product[] = await initialResponse.json();
  totalPages = Math.ceil(
    Number(initialResponse.headers.get("X-WP-TotalPages")) / perPage
  );

  // Pobierz wszystkie strony równolegle
  const productPromises = [];
  for (let page = 2; page <= totalPages; page++) {
    productPromises.push(
      fetch(
        `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}&per_page=${perPage}&page=${page}`,
        { cache: "no-cache" }
      ).then((response) => response.json())
    );
  }

  const allProductPages = await Promise.all(productPromises);
  const allProductsFromPages = allProductPages.flat();

  allProducts.push(...products, ...allProductsFromPages);

  return NextResponse.json(allProducts);
}
