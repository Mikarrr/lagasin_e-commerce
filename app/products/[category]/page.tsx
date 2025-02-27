import React from "react";
import ProductContent from "@/components/products/productContent";
import { Product } from "@/app/api/types/product";
import defaultFetchOptions from "@/components/utils/fetchOptions/fetchOptions";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const selectedCategorySlug = params.category;

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

  // Find the selected category based on the slug
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
