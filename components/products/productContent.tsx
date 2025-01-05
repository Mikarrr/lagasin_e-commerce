"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Product } from "@/app/api/types/product";
import { Category } from "@/app/api/types/productCategory";
import CategoryFilter from "./categoryFilter";
import SortFilter from "./sortFilter";
import CountFilter from "./countFilter";
import ButtonRevFill from "../utils/buttonRevFill/page";
import Link from "next/link";
import Image from "next/image";
import Filter from "./filterFIlter";
import "./style.css";

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
  const [priceRange, setPriceRange] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

  const handleCategoryChange = useCallback((categoryId: number | null) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleSortChange = useCallback(
    (sortOption: "name-asc" | "name-desc" | "price-asc" | "price-desc") => {
      setSortOption(sortOption);
    },
    []
  );

  const handlePriceRangeChange = useCallback(
    (min: number | null, max: number | null) => {
      setPriceRange({ min, max });
    },
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.categories.some(
            (category) => category.id === selectedCategory
          )
        : true;

      const matchesPrice =
        (priceRange.min === null ||
          parseFloat(product.price) >= priceRange.min) &&
        (priceRange.max === null ||
          parseFloat(product.price) <= priceRange.max);

      return matchesCategory && matchesPrice;
    });
  }, [products, selectedCategory, priceRange]);

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
          <div className="products-filter-left">
            <Filter onPriceRangeChange={handlePriceRangeChange} />
            <SortFilter onSortChange={handleSortChange} />
          </div>
          <CountFilter
            products={filteredProducts}
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
                    width={1200}
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
