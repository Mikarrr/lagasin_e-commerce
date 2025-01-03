import ContactSection from "@/components/contact/contactSection/contactSection";
import FaqSection from "@/components/utils/faq/faq";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: " Contact - Luis de Lagasin",
  description: "Contact us!",
  robots: {
    index: false,
    follow: false,
  },
};
const Contact = () => {
  return (
    <>
      <ContactSection />
      <FaqSection />
    </>
  );
};

export default Contact;
