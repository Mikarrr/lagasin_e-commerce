import PaymentThanks from "@/components/account/paymentThanks/PaymentThanks";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Thank you! - Luis de Lagasin",
  description: "We have sent the order confirmation details to you.",
  robots: {
    index: false,
    follow: false,
  },
};

const Thankyou = () => {
  return (
    <main>
      <PaymentThanks />
    </main>
  );
};

export default Thankyou;
