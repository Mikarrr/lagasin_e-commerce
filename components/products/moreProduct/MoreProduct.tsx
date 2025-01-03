import React from "react";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import { Product } from "@/app/api/types/product";
import "./style.css";

import Link from "next/link";
import Image from "next/image";

interface MoreProductSectionProps {
  categorySlug: string | undefined;
}

const MoreProductSection = async ({
  categorySlug,
}: MoreProductSectionProps) => {
  const productsResponse = await fetch(
    ` ${process.env.NEXT_PUBLIC_API_URL}/api/products/products`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const products = await productsResponse.json();

  const filteredProducts = products.filter((product: Product) =>
    product.categories.some((category) => category.slug === categorySlug)
  );

  const latestProducts = filteredProducts.slice(0, 4);

  return (
    <section className="more-product-container" id="more-product">
      <div className="more-product-container-up">
        <h2>SHOW MORE</h2>
        <p>Each product is limited, limited quantity available.</p>
      </div>
      <div className="more-product-container-down">
        {latestProducts.map((product: Product) => {
          return (
            <div className="product" key={product.id}>
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
                />

                <div className="description">
                  <div>
                    <p className="category text-s ">
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
          );
        })}
      </div>
    </section>
  );
};

export default MoreProductSection;
