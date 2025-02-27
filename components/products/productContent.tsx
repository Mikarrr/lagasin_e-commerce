"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { motion } from "framer-motion";

const ProductContent = ({
  products,
  categories,
  initialCategoryId,
}: {
  products: Product[];
  categories: Category[];
  initialCategoryId?: number | null;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage = 6;
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    initialCategoryId || null
  );
  const [sortOption, setSortOption] = useState<
    "name-asc" | "name-desc" | "price-asc" | "price-desc"
  >("name-asc");
  const [priceRange, setPriceRange] = useState<{
    min: number | null;
    max: number | null;
  }>({
    min: null,
    max: null,
  });

  const currentPage = useMemo(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page <= 0 ? 1 : page;
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    handlePageChange(1);
  };

  const handleSortChange = (
    sortOption: "name-asc" | "name-desc" | "price-asc" | "price-desc"
  ) => {
    setSortOption(sortOption);
  };

  const handlePriceRangeChange = (min: number | null, max: number | null) => {
    setPriceRange({ min, max });
  };

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
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-desc":
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, perPage]);

  const totalPages = Math.ceil(sortedProducts.length / perPage);

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
          <div className="products-filter-right">
            {" "}
            <CountFilter
              products={filteredProducts}
              selectedCategory={selectedCategory}
            />
            <div className="pagination">
              {totalPages > 1 && (
                <>
                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .filter(
                      (page) =>
                        page === 1 || // Pokaż stronę 1
                        page === totalPages || // Pokaż stronę ostatnią
                        (page >= currentPage - 1 && page <= currentPage + 1) // Pokaż sąsiednie strony
                    )
                    .map((page, index, pages) => (
                      <>
                        {index > 0 && pages[index - 1] !== page - 1 && (
                          <span>-</span> // Pokazuje "..." pomiędzy stronami
                        )}
                        <button
                          key={page}
                          className={`page-button ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          <p>{page}</p>
                        </button>
                      </>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="products-main">
          {paginatedProducts.length === 0 ? (
            <div>Brak produktów do wyświetlenia.</div>
          ) : (
            paginatedProducts.map((product, index) => (
              <div key={product.id} className="product-card">
                <motion.div
                  initial={{ y: "10vh", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: "100vh", opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                >
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
                </motion.div>
              </div>
            ))
          )}
        </div>
        <br />
        <div className="pagination">
          {totalPages > 1 && (
            <>
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (page) =>
                    page === 1 || // Pokaż stronę 1
                    page === totalPages || // Pokaż stronę ostatnią
                    (page >= currentPage - 1 && page <= currentPage + 1) // Pokaż sąsiednie strony
                )
                .map((page, index, pages) => (
                  <>
                    {index > 0 && pages[index - 1] !== page - 1 && (
                      <span>-</span> // Pokazuje "..." pomiędzy stronami
                    )}
                    <button
                      key={page}
                      className={`page-button ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      <p>{page}</p>
                    </button>
                  </>
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductContent;
