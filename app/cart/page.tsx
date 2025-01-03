import React from "react";
import CartComponent from "@/components/account/cart/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: " Cart - Luis de Lagasin",
  description: "Thank you! Your order was placed successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

const Cart = () => {
  return (
    <main>
      <CartComponent />
    </main>
  );
};

export default Cart;
