"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/app/api/types/product"; // Import Product type
import { Variant } from "@/app/api/types/variants"; // Import Variant type
import { useRouter } from "next/navigation"; // do nawigacji do strony checkout
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import "./style.css";
import Image from "next/image";

interface CartItem {
  product: Product;
  variant: Variant | null;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      const processedItems: CartItem[] = parsedCart.map((product: Product) => ({
        product,
        variant: product.variants ? product.variants[0] : null,
        quantity: product.quantity || 1,
      }));

      setCartItems(processedItems);
    }
  }, []);

  // Calculate total price
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) =>
        sum +
        (parseFloat(item.variant?.price || item.product.price) || 0) *
          item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const increaseQuantity = (productId: number, variantId?: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product.id === productId && item.variant?.id === variantId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCart.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }))
      )
    );

    // Wywołanie eventu aktualizacji koszyka
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const decreaseQuantity = (productId: number, variantId?: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.product.id === productId && item.variant?.id === variantId) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCart.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }))
      )
    );

    // Wywołanie eventu aktualizacji koszyka
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const removeFromCart = (productId: number, variantId?: number) => {
    const updatedCart = cartItems.filter(
      (item) =>
        item.product.id !== productId ||
        (variantId && item.variant?.id !== variantId)
    );

    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCart.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }))
      )
    );

    // Wywołanie eventu aktualizacji koszyka
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  // Funkcja obsługująca przejście do strony checkout
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push("/checkout"); // Przejście na stronę checkout
    } else {
      alert("Your cart is empty! Add items to proceed to checkout.");
    }
  };

  return (
    <div className="cart-section">
      <div className="cart-description">
        <h2>CART</h2>
        <p>
          Welcome to your cart! <br />
          Here you will find all the products you have added to your shopping
          list.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-details">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-details">
                  <Image
                    src={
                      item.variant?.image?.src || item.product.images[0]?.src
                    }
                    alt={item.variant?.image?.alt || item.product.name}
                    className="cart-item-image"
                    width={100}
                    height={100}
                  />
                  <div className="cart-items-details-des">
                    <p className="text-xl">{item.product.name}</p>
                    <div className="item-info">
                      {item.variant?.attributes.some(
                        (attr) => attr.name === "color"
                      ) && (
                        <p>
                          {
                            item.variant?.attributes.find(
                              (attr) => attr.name === "color"
                            )?.option
                          }{" "}
                          |{" "}
                        </p>
                      )}
                      <p>
                        {(parseFloat(
                          item.variant?.price || item.product.price
                        ) || 0) * item.quantity}{" "}
                        PLN |
                      </p>
                      {item.variant?.attributes.some(
                        (attr) => attr.name === "size"
                      ) && (
                        <p>
                          {
                            item.variant?.attributes.find(
                              (attr) => attr.name === "size"
                            )?.option
                          }{" "}
                          |{" "}
                        </p>
                      )}
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="cart-buttons">
                  <ButtonRevFill
                    param="-"
                    color="black"
                    bgcolor="rgb(219, 219, 219)"
                    onClick={() =>
                      decreaseQuantity(item.product.id, item.variant?.id)
                    }
                  />
                  <ButtonRevFill
                    param="+"
                    color="black"
                    bgcolor="rgb(219, 219, 219)"
                    onClick={() =>
                      increaseQuantity(item.product.id, item.variant?.id)
                    }
                  />
                  <ButtonRevFill
                    param="REMOVE"
                    color="black"
                    bgcolor="rgb(219, 219, 219)"
                    onClick={() =>
                      removeFromCart(item.product.id, item.variant?.id)
                    }
                  />
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <p className="text-xl">ORDER SUMMARY</p>
        <div className="info">
          <p>Subtotal</p>
          <p>{totalPrice} PLN</p>
        </div>
        <div className="info">
          <p>Shipping</p>
          <p>0.00 PLN</p>
        </div>
        <div className="info">
          <p>Total</p>
          <p>{totalPrice} PLN</p>
        </div>

        <hr />
        <br />
        <div className="cart-checkout-btn">
          {cartItems.length > 0 ? (
            <ButtonRevFill
              param="CHECKOUT"
              color="white"
              bgcolor="black"
              onClick={handleCheckout}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
