import type { Metadata } from "next";

import "./globals.css";
import MenuUpRev from "@/components/utils/menuUpRevSection/menuUpRevSection";
import Footer from "@/components/utils/footer/Footer";
export const metadata: Metadata = {
  title: "Luis de Lagasin",
  description: "Luis de Lagasin - E-commerce shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MenuUpRev />
        {children}
        <Footer />
      </body>
    </html>
  );
}
