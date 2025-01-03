import CheckoutSection from "@/components/account/checkout/Checkout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: " Checkout - Luis de Lagasin",
  description: "Please check out to push your order.",
  robots: {
    index: false,
    follow: false,
  },
};

const Checkout = async () => {
  return (
    <main>
      <CheckoutSection />
    </main>
  );
};

export default Checkout;
