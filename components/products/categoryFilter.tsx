"use client";

import React, { useState, useEffect } from "react";
import { Category } from "@/app/api/types/productCategory";
import { Product } from "@/app/api/types/product";
import { useRouter, usePathname } from "next/navigation";

const CategoryFilter = ({
  categories,
  onCategoryChange,
  products,
}: {
  categories: Category[];
  onCategoryChange: (categoryId: number | null) => void;
  products: Product[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    number | null
  >(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );

  useEffect(() => {
    const pathParts = pathname.split("/"); // Dzieli URL na segmenty
    const currentCategorySlug = pathParts[2]; // products/[category] -> [2] zawiera kategorię
    const currentSubCategorySlug = pathParts[3]; // products/[category]/[subcategory] -> [3] zawiera subkategorię

    // Znajdź kategorię odpowiadającą slug
    const matchingCategory = categories.find(
      (category) => category.slug === currentCategorySlug
    );

    // Znajdź subkategorię odpowiadającą slug
    const matchingSubCategory = categories.find(
      (category) => category.slug === currentSubCategorySlug
    );

    if (currentCategorySlug && !matchingCategory) {
      router.push("/products"); // Przekieruj na stronę 404, jeśli slug nie istnieje
    } else {
      setSelectedMainCategory(matchingCategory ? matchingCategory.id : null);
      setSelectedSubCategory(
        matchingSubCategory ? matchingSubCategory.id : null
      );
    }
  }, [pathname, categories, router]);

  useEffect(() => {
    // Filtr głównych kategorii
    const mainCats = categories.filter(
      (category) => category.parent === 0 && category.count > 0
    );
    setMainCategories(mainCats);
  }, [categories]);

  useEffect(() => {
    // Filtr podrzędnych kategorii
    if (selectedMainCategory) {
      const subCats = categories.filter(
        (category) => category.parent === selectedMainCategory
      );
      setSubCategories(subCats);
    } else {
      setSubCategories([]);
    }
  }, [categories, selectedMainCategory]);

  // Handle main category change
  const handleMainCategoryChange = (categoryId: number | null) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory(null); // Resetujemy subkategorię, gdy zmieniamy główną kategorię
    onCategoryChange(categoryId); // Przekazanie zmiany kategorii do rodzica

    // Zaktualizowanie URL
    if (categoryId === null) {
      router.push("/products"); // Jeśli "ALL", to wracamy do ogólnych produktów
    } else {
      const mainCategory = categories.find(
        (category) => category.id === categoryId
      );
      if (mainCategory?.slug) {
        router.push(`/products/${mainCategory.slug}`); // Zmiana URL na kategorię
      }
    }
  };

  // Handle subcategory change
  const handleSubCategoryChange = (categoryId: number | null) => {
    setSelectedSubCategory(categoryId); // Ustawiamy wybraną subkategorię
    onCategoryChange(categoryId);

    // Zaktualizowanie URL
    const subCategory = categories.find(
      (category) => category.id === categoryId
    );
    if (subCategory?.slug && selectedMainCategory) {
      const mainCategory = categories.find(
        (category) => category.id === selectedMainCategory
      );
      if (mainCategory?.slug) {
        router.push(`/products/${mainCategory.slug}/${subCategory.slug}`); // Zmiana URL na subkategorię
      }
    }
  };

  // Function to count products in a given category (including subcategories)
  const getProductCountForCategory = (categoryId: number) => {
    let count = 0;

    // Liczymy główne produkty w wybranej kategorii
    products.forEach((product) => {
      // Sprawdzamy, czy produkt należy do kategorii
      if (product.categories.some((category) => category.id === categoryId)) {
        count++;
      }

      // Liczymy warianty dla produktów zmiennych
      if (product.type === "variable") {
        product.variants?.forEach(() => {
          // Sprawdzamy, czy produkt zmienny należy do kategorii
          if (
            product.categories.some((category) => category.id === categoryId)
          ) {
            count++;
          }
        });
      }
    });

    return count;
  };

  // Obliczanie liczby produktów w widocznych kategoriach
  const getAllProductCount = () => {
    // Tylko kategorie główne (men, women itp.)
    const visibleCategories = categories.filter(
      (category) => category.parent === 0 && category.count > 0
    );

    return visibleCategories.reduce(
      (total, category) => total + getProductCountForCategory(category.id),
      0
    );
  };

  return (
    <div className="category-main">
      <p className="text-xl">Products categories</p>
      <br />
      <div className="category-items">
        <div>
          <p
            className={`category-item ${
              selectedMainCategory === null ? "active" : ""
            }`}
            onClick={() => handleMainCategoryChange(null)}
          >
            ALL{" "}
          </p>
          <span className="category-count">{getAllProductCount()}</span>
        </div>
      </div>

      {mainCategories.map((category) => (
        <div key={category.id} className="category-items">
          <div>
            <p
              className={`category-item ${
                selectedMainCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleMainCategoryChange(category.id)}
            >
              {category.name}{" "}
            </p>
            <span className="category-count">
              {getProductCountForCategory(category.id)}
            </span>
          </div>

          {selectedMainCategory === category.id && subCategories.length > 0 && (
            <div className="subcategory-container">
              <ul>
                {subCategories
                  .filter((sub) => sub.parent === category.id)
                  .map((subCategory) => (
                    <li key={subCategory.id}>
                      <div
                        className={`subcategory-item ${
                          selectedSubCategory === subCategory.id ? "active" : ""
                        }`}
                        onClick={() => handleSubCategoryChange(subCategory.id)}
                      >
                        {subCategory.name}{" "}
                      </div>
                      <span className="subcategory-count">
                        {getProductCountForCategory(subCategory.id)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
