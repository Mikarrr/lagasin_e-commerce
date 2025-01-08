"use client";

import React, { useState } from "react";
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
  // State to manage the selected color and image
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Function to handle color selection change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  // Find the image corresponding to the selected color
  const selectedImage = selectedColor
    ? variants.find((variant) =>
        variant.attributes.some(
          (attr) => attr.name === "color" && attr.option === selectedColor
        )
      )?.image?.src || product.images[0]?.src
    : product.images[0]?.src;

  return (
    <section className="single-product-container">
      <div className="product-images">
        <Image
          src={selectedImage}
          alt={product.name}
          width={500}
          height={500}
        />
        <Image
          src={selectedImage}
          alt={product.name}
          width={500}
          height={500}
        />
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>
        <div className="product-description">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <VariantSelector
            product={product}
            variants={variants}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleProductContent;
