import ContactSection from "@/components/contact/contactSection/contactSection";
import AboutUsSection from "@/components/home/aboutUsSection/aboutUsSection";
import BlogSection from "@/components/home/blogSection/blogSection";
import HeroHomeSection from "@/components/home/heroHomeSection/heroHomeSection";
import NewArrivalsSection from "@/components/home/newArrivalsSection/newArrivalsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Luis de Lagasin",
  description: "Luis de Lagasin - E-commerce shop",
  keywords: [
    "E-commerce",
    "Luis de Lagasin",
    "Online Shop",
    "New Arrivals",
    "Shopping",
    "Buy Online",
  ],
  authors: [{ name: "Luis de Lagasin", url: "https://lagasin.deskar.pl" }],
  openGraph: {
    title: "Luis de Lagasin - E-commerce Shop",
    description:
      "Discover the best products at Luis de Lagasin - E-commerce Shop",
    url: "https://luisdelagasin.com",
    siteName: "Luis de Lagasin",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luis de Lagasin E-commerce Shop",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis de Lagasin - E-commerce Shop",
    description:
      "Discover the best products at Luis de Lagasin - E-commerce Shop",
    images: ["/twitter-image.jpg"],
    site: "@luisdelagasin",
    creator: "@luisdelagasin",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lagasin.deskar.pl",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <main>
      <HeroHomeSection />
      <NewArrivalsSection />
      <AboutUsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
