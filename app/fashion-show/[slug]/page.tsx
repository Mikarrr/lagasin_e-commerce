import React from "react";
import SinglePostPage from "@/components/fashionShow/singlePost/SinglePost";
import { notFound } from "next/navigation";
import defaultFetchOptions from "@/components/utils/fetchOptions/fetchOptions";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;

  const postResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/singlePost/${slug}`,
    {
      method: "GET",
      ...defaultFetchOptions,
    }
  );
  const post0 = await postResponse.json();
  const post = post0[0];

  if (!post) {
    return {
      metadataBase: new URL("http://localhost:3000"),
      title: "Post not found",
      description: "The requested post is not available",
      keywords: ["E-commerce", "Luis de Lagasin", "Online Shop"],
      openGraph: {
        title: "Post not found",
        description: "The requested post is not available",
        url: "https://lagasin.deskar.pl",
        siteName: "Luis de Lagasin",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Post not found",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Post not found",
        description: "The requested post is not available",
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

  const { title, excerpt, link, _embedded, yoast_head_json } = post;

  const metaTitle = yoast_head_json?.og_title || title.rendered;
  const metaDescription = yoast_head_json?.og_description || excerpt.rendered;
  const metaKeywords = [
    "E-commerce",
    "Luis de Lagasin",
    "Online Shop",
    "New Arrivals",
    "Shopping",
    "Buy Online",
    ...(yoast_head_json?.keywords || []),
  ];

  const metaImage =
    _embedded["wp:featuredmedia"]?.[0]?.source_url || "/og-image.jpg";

  return {
    metadataBase: new URL("http://localhost:3000"),
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: "Luis de Lagasin", url: "https://lagasin.deskar.pl" }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: link,
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
      type: "article",
    },
    twitter: {
      card: yoast_head_json?.twitter_card || "summary_large_image",
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
      canonical: yoast_head_json?.canonical || "https://lagasin.deskar.pl",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  };
};

const FashionShowSingle = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const postsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/posts`,
    {
      method: "GET",
      ...defaultFetchOptions,
    }
  );
  const posts = await postsResponse.json();

  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/category`,
    {
      method: "GET",
      ...defaultFetchOptions,
    }
  );
  const categories = await categoriesResponse.json();

  const postResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/singlePost/${slug}`,
    {
      method: "GET",
      ...defaultFetchOptions,
    }
  );
  const post0 = await postResponse.json();
  const post = post0[0];

  if (!post) {
    notFound();
  }

  return (
    <main>
      <SinglePostPage post={post} posts={posts} categories={categories} />
    </main>
  );
};

export default FashionShowSingle;
