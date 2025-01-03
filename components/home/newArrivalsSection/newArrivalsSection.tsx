import React from "react";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import { Product } from "@/app/api/types/product";
import "./style.css";

import Link from "next/link";
import Image from "next/image";

const NewArrivalsSection = async () => {
  const productsResponse = await fetch(
    ` ${process.env.NEXT_PUBLIC_API_URL}/api/products/products`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const products = await productsResponse.json();

  const latestProducts = products.slice(0, 4);

  return (
    <section className="new-arrivals-container" id="new-arrivals">
      <div className="new-arrivals-container-up">
        <h2>NEW ARRIVALS</h2>
        <p>Each product is limited, limited quantity available.</p>
      </div>
      <div className="new-arrivals-container-down">
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

export default NewArrivalsSection;
