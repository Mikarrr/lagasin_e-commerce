import RegisterSection from "@/components/register/registerSection";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Register - Luis de Lagasin",
  description: "Please register in to access your account.",
  robots: {
    index: false,
    follow: false,
  },
};

const Register = () => {
  return (
    <main>
      <RegisterSection />
    </main>
  );
};

export default Register;
