import React from "react";
import { Product } from "@/app/api/types/product";
import { Variant } from "@/app/api/types/variants";
import "./style.css";
import Image from "next/image";
import VariantSelector from "./variantSingleProduct";

interface SingleProductContentProps {
  product: Product;
  variants: Variant[];
}

const SingleProductContent = ({
  product,
  variants,
}: SingleProductContentProps) => {
  return (
    <section className="single-product-container">
      <div className="product-images">
        <Image
          src={product.images[0]?.src}
          alt={product.name}
          width={500}
          height={500}
        />
        <Image
          src={product.images[1]?.src || product.images[0]?.src}
          alt={product.name}
          width={500}
          height={500}
        />
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>
        <div className="product-description">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <VariantSelector product={product} variants={variants} />
        </div>
      </div>
    </section>
  );
};

export default SingleProductContent;
