import React from "react";

import ProductContent from "@/components/products/productContent";
import { Product } from "@/app/api/types/product";

const CategoryPage = async ({
  params,
}: {
  params: { subcategory: string };
}) => {
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

  const selectedSubcategorySlug = params.subcategory;

  const selectedSubCategory = categories.find(
    (category: Product) => category.slug === selectedSubcategorySlug
  );

  return (
    <main>
      <ProductContent
        products={products}
        categories={categories}
        initialCategoryId={selectedSubCategory?.id || null}
      />
    </main>
  );
};

export default CategoryPage;
