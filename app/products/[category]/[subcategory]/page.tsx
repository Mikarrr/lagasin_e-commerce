import React from "react";

import ProductContent from "@/components/products/productContent";
import { Product } from "@/app/api/types/product";
import defaultFetchOptions from "@/components/utils/fetchOptions/fetchOptions";

const CategoryPage = async ({
  params,
}: {
  params: { subcategory: string };
}) => {
  const selectedSubcategorySlug = params.subcategory;

  const productsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/products`,
    {
      ...defaultFetchOptions,
      method: "GET",
    }
  );
  const products = await productsResponse.json();

  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/category`,
    {
      ...defaultFetchOptions,
      method: "GET",
    }
  );

  const categories = await categoriesResponse.json();

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
