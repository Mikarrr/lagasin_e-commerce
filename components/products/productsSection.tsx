// ProductsSection.tsx
import React from "react";
import ProductContent from "./productContent";

const ProductsSection = async () => {
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

  return (
    <>
      <ProductContent products={products} categories={categories} />
    </>
  );
};

export default ProductsSection;
