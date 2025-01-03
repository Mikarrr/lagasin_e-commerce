import React from "react";
import SingleProductContent from "@/components/products/singleProduct/singleProductContent";
import FaqSection from "@/components/utils/faq/faq";
import MoreProductSection from "@/components/products/moreProduct/MoreProduct";
import { Product } from "@/app/api/types/product";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;

  // Fetch the product using the slug
  const productResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/product/${slug}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const product: Product = await productResponse.json();

  if (!product) {
    return {
      metadataBase: new URL("http://localhost:3000"),
      title: "Product not found",
      description: "The product you are looking for is not available",
      keywords: ["E-commerce", "Luis de Lagasin", "Online Shop"],
      openGraph: {
        title: "Product not found",
        description: "The product you are looking for is not available",
        url: "https://lagasin.deskar.pl",
        siteName: "Luis de Lagasin",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Product not found",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Product not found",
        description: "The product you are looking for is not available",
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
  }

  const { yoastHeadJson } = product;
  const metaTitle = yoastHeadJson?.ogTitle || product.name;
  const metaDescription =
    yoastHeadJson?.ogDescription || product.short_description;
  const metaKeywords = [
    "E-commerce",
    "Luis de Lagasin",
    "Online Shop",
    "New Arrivals",
    "Shopping",
    "Buy Online",
  ];
  const metaImage = product.images?.[0]?.src || "/og-image.jpg";

  return {
    metadataBase: new URL("http://localhost:3000"),
    title: `${metaTitle} - Luis de Lagasin`,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: "Luis de Lagasin", url: "https://lagasin.deskar.pl" }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: product.permalink,
      siteName: "Luis de Lagasin",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: "en_US",
      type: "website", // Changed from "product" to "website"
    },
    twitter: {
      card: yoastHeadJson?.twitterCard || "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      site: "@luisdelagasin",
      creator: "@luisdelagasin",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: yoastHeadJson?.canonical || "https://lagasin.deskar.pl",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Fetch the product using the slug
  const productResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/product/${slug}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const product: Product = await productResponse.json();

  if (!product) {
    return (
      <section>
        <h1>Product Not Found</h1>
        <p>Sorry, the product you are looking for is not available.</p>
      </section>
    );
  }

  // Fetch the product variants using the product's ID
  const variantsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/variants/${product.id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const variants = await variantsResponse.json();

  // Get the main category of the product
  const mainCategory = product.categories[0]?.slug;

  return (
    <main>
      <SingleProductContent product={product} variants={variants} />
      <MoreProductSection categorySlug={mainCategory} />
      <FaqSection />
    </main>
  );
};

export default ProductPage;
