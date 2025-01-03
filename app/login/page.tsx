import React from "react";
import { Metadata } from "next";
import LoginSection from "@/components/login/loginSection";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Login - Luis de Lagasin",
  description: "Please log in to access your account.",
  robots: {
    index: false,
    follow: false,
  },
};

const Login = () => {
  return (
    <main>
      <LoginSection />
    </main>
  );
};

export default Login;
