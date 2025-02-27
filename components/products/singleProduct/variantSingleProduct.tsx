"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/app/api/types/product";
import { Variant } from "@/app/api/types/variants";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import Image from "next/image";

interface VariantSelectorProps {
  product: Product;
  variants: Variant[];
  selectedColor: string | null;
  onColorChange: (color: string) => void;
}

const VariantSelector = ({
  product,
  variants,
  selectedColor,
  onColorChange,
}: VariantSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []); // Run only once after the component mounts

  const handleSizeChange = (size: string) => {
    setSelectedSize(selectedSize === size ? null : size);
  };

  const handleColorChange = (color: string) => {
    onColorChange(color); // Call the parent handler to update the color
  };

  useEffect(() => {
    const variant = variants.find((variant) => {
      const hasSelectedSize = selectedSize
        ? variant.attributes.some(
            (attr) => attr.name === "size" && attr.option === selectedSize
          )
        : true;
      const hasSelectedColor = selectedColor
        ? variant.attributes.some(
            (attr) => attr.name === "color" && attr.option === selectedColor
          )
        : true;
      return hasSelectedSize && hasSelectedColor;
    });
    setSelectedVariant(variant || null);
  }, [selectedSize, selectedColor, variants]);

  const hasSizeVariant = variants.some((variant) =>
    variant.attributes.some((attr) => attr.name === "size")
  );
  const hasColorVariant = variants.some((variant) =>
    variant.attributes.some((attr) => attr.name === "color")
  );

  const addToCart = () => {
    if (hasSizeVariant && !selectedSize) {
      setNotification("Please select a size.");
      return;
    }
    if (hasColorVariant && !selectedColor) {
      setNotification("Please select a color.");
      return;
    }

    const updatedCart = [...cart];
    const isSameVariant = (cartVariant: Variant | undefined) => {
      if (!cartVariant) return false;

      const isSizeMatch = selectedSize
        ? cartVariant.attributes.some(
            (attr) => attr.name === "size" && attr.option === selectedSize
          )
        : true;

      const isColorMatch = selectedColor
        ? cartVariant.attributes.some(
            (attr) => attr.name === "color" && attr.option === selectedColor
          )
        : true;

      return isSizeMatch && isColorMatch;
    };

    const existingCartItemIndex = cart.findIndex((cartItem) => {
      const cartVariant = cartItem.variants?.[0];
      if (cartItem.id === product.id) {
        if (cartItem.variants && cartItem.variants.length > 0) {
          return isSameVariant(cartVariant);
        }
        return true;
      }
      return false;
    });

    if (existingCartItemIndex !== -1) {
      updatedCart[existingCartItemIndex].quantity =
        (updatedCart[existingCartItemIndex].quantity || 1) + 1;
    } else {
      const newCartItem = {
        ...product,
        variants: selectedVariant ? [selectedVariant] : [],
        quantity: 1,
      };
      updatedCart.push(newCartItem);
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);

    setNotification("Product added to cart!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <div>
        <p className="price">{selectedVariant?.price || product.price} PLN</p>
        <p>Stock Status: {selectedVariant?.stock_status || "In Stock"}</p>
      </div>

      {hasColorVariant && (
        <div className="color-selection">
          <label>Color:</label>
          <div className="color-checkboxes">
            {Array.from(
              new Set(
                variants.map(
                  (variant) =>
                    variant.attributes.find((attr) => attr.name === "color")
                      ?.option
                )
              )
            ).map(
              (color, index) =>
                color && (
                  <label key={index} className="color-label">
                    <input
                      type="checkbox"
                      checked={selectedColor === color}
                      onChange={() => handleColorChange(color)}
                      className="hidden-checkbox"
                    />
                    <Image
                      src={
                        variants.find((variant) =>
                          variant.attributes.some(
                            (attr) =>
                              attr.name === "color" && attr.option === color
                          )
                        )?.image?.src || product.images[0]?.src
                      }
                      alt={`Product in ${color}`}
                      className={`color-image ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      width={500}
                      height={500}
                    />
                  </label>
                )
            )}
          </div>
        </div>
      )}

      {hasSizeVariant && (
        <div className="size-selection">
          <label>Size:</label>
          <div className="size-checkboxes">
            {Array.from(
              new Set(
                variants.map(
                  (variant) =>
                    variant.attributes.find((attr) => attr.name === "size")
                      ?.option
                )
              )
            ).map(
              (size, index) =>
                size && (
                  <label key={index} className="size-label">
                    <input
                      type="checkbox"
                      className="styled-checkbox"
                      checked={selectedSize === size}
                      onChange={() => handleSizeChange(size)}
                    />
                    <span>{size}</span>
                  </label>
                )
            )}
          </div>
        </div>
      )}

      <ButtonRevFill
        param="ADD TO CART"
        color="white"
        bgcolor="black"
        onClick={addToCart}
      />
      {notification && <p className="notification text-xl">{notification}</p>}
    </>
  );
};

export default VariantSelector;
