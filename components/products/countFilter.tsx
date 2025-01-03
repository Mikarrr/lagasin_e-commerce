"use client";

import React from "react";
import { Product } from "@/app/api/types/product";

const CountFilter = ({
  products,
  selectedCategory,
}: {
  products: Product[];
  selectedCategory: number | null;
}) => {
  const getProductCountForCategory = (categoryId: number | null) => {
    let count = 0;

    products.forEach((product) => {
      if (
        !categoryId ||
        product.categories.some((category) => category.id === categoryId)
      ) {
        count++;
      }
    });

    return count;
  };

  return (
    <p>Showing all {getProductCountForCategory(selectedCategory)} products</p>
  );
};

export default CountFilter;
