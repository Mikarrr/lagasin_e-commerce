import { NextResponse } from "next/server";
import { Category } from "@/app/api/types/productCategory";

export async function GET() {
  let allCategories: Category[] = [];
  let page = 1;
  const perPage = 100; // Maximum number of items per page

  while (true) {
    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}&per_page=${perPage}&page=${page}&_fields=id,name,slug,parent,count`,
      { cache: "no-cache" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: response.status }
      );
    }

    const categories: Category[] = await response.json();

    if (categories.length === 0) {
      break;
    }

    allCategories = allCategories.concat(categories);
    page++;
  }

  return NextResponse.json(allCategories);
}
