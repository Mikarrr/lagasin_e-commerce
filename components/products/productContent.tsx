"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Product } from "@/app/api/types/product";
import { Category } from "@/app/api/types/productCategory";
import "./style.css";
import CategoryFilter from "./categoryFilter";
import SortFilter from "./sortFilter";
import CountFilter from "./countFilter";
import ButtonRevFill from "../utils/buttonRevFill/page";
import Link from "next/link";
import Image from "next/image";

const ProductContent = ({
  products,
  categories,
  initialCategoryId,
}: {
  products: Product[];
  categories: Category[];
  initialCategoryId?: number | null;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    initialCategoryId || null
  );
  const [sortOption, setSortOption] = useState<
    "name-asc" | "name-desc" | "price-asc" | "price-desc"
  >("name-asc");

  const handleCategoryChange = useCallback((categoryId: number | null) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleSortChange = useCallback(
    (sortOption: "name-asc" | "name-desc" | "price-asc" | "price-desc") => {
      setSortOption(sortOption);
    },
    []
  );

  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) =>
          product.categories.some(
            (category) => category.id === selectedCategory
          )
        )
      : products;
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    switch (sortOption) {
      case "name-asc":
        return [...filteredProducts].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "name-desc":
        return [...filteredProducts].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      case "price-asc":
        return [...filteredProducts].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "price-desc":
        return [...filteredProducts].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      default:
        return filteredProducts;
    }
  }, [filteredProducts, sortOption]);

  return (
    <section className="products-content-container">
      <CategoryFilter
        categories={categories}
        onCategoryChange={handleCategoryChange}
        products={products}
      />
      <div className="products-con">
        <div className="products-filter">
          <SortFilter onSortChange={handleSortChange} />
          <CountFilter
            products={products}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="products-main">
          {sortedProducts.length === 0 ? (
            <div>Brak produktów do wyświetlenia.</div>
          ) : (
            sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link
                  href={`/products/${product.categories[1]?.slug}/${
                    product.categories[0]?.slug || product.categories[0]?.slug
                  }/${product.slug}`}
                >
                  <Image
                    src={product.images[0]?.src || "/placeholder.png"}
                    alt={product.images[0]?.alt || "Product Image"}
                    className="image"
                    width={500}
                    height={500}
                    priority
                  />
                  <div className="description">
                    <div>
                      <p className="category text-s">
                        {product.categories
                          .map((category) => category.name)
                          .join(", ")}
                      </p>
                      <p className="text-xl">{product.name}</p>
                      <p>{product.price} PLN</p>
                    </div>

                    <ButtonRevFill
                      param="SHOW MORE"
                      size="small"
                      color="white"
                      bgcolor="black"
                    />
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductContent;
