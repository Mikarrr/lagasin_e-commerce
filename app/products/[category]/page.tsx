import React from "react";

import ProductContent from "@/components/products/productContent";
import { Product } from "@/app/api/types/product";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const productsResponse = await fetch(
    ` ${process.env.NEXT_PUBLIC_API_URL}/api/products/products`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const products = await productsResponse.json();

  const categoriesResponse = await fetch(
    ` ${process.env.NEXT_PUBLIC_API_URL}/api/products/category`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const categories = await categoriesResponse.json();

  const selectedCategorySlug = params.category;

  const selectedCategory = categories.find(
    (category: Product) => category.slug === selectedCategorySlug
  );

  return (
    <main>
      <ProductContent
        products={products}
        categories={categories}
        initialCategoryId={selectedCategory?.id || null}
      />
    </main>
  );
};

export default CategoryPage;
