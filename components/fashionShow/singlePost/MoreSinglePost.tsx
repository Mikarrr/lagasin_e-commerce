"use client";

import React from "react";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import { decode } from "html-entities";
import { Category } from "@/app/api/types/category";
import { Post } from "@/app/api/types/posts";
import Link from "next/link";

const MoreSinglePost = ({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) => {
  // Sortujemy posty według daty w kolejności malejącej i bierzemy tylko 3 najnowsze
  const latestPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? decode(category.name) : "Uncategorized";
  };

  const getThumbnailUrl = (post: Post) => {
    const media = post._embedded["wp:featuredmedia"]?.[0];
    return media && media.media_details?.sizes?.full?.source_url
      ? media.media_details.sizes.full.source_url
      : "";
  };

  return (
    <>
      <section className="single-post-hero-fashion-show-container">
        <h2>READ MORE</h2>
        <p>
          Discover the latest fashion trends, runway highlights, and insider
          insights from top designers, all in one place.
        </p>
      </section>
      <section className="posts-section-container">
        <div className="posts-grid">
          {latestPosts.map((post) => {
            const thumbnailUrl = getThumbnailUrl(post); // Pobieramy URL miniaturki

            return (
              <article key={post.id} className="post" lang="pl">
                {/* Wyświetlanie miniaturki obrazu */}
                {thumbnailUrl ? (
                  <div
                    className="post-image"
                    style={{
                      backgroundImage: `url(${thumbnailUrl})`, // Używamy miniaturki jako tła
                    }}
                    aria-label={`Obraz dla postu ${decode(
                      post.title.rendered
                    )}`}
                  ></div>
                ) : (
                  <div
                    className="post-image"
                    aria-label={`Brak miniaturki dla postu ${decode(
                      post.title.rendered
                    )}`}
                  ></div>
                )}

                <div className="post-details-up">
                  <p className="category text-s">
                    {post.categories.length > 0
                      ? getCategoryName(post.categories[0])
                      : "Uncategorized"}
                  </p>
                  <Link href={`/fashion-show/${post.slug}`}>
                    <h2 className="post-title text-xl">
                      {decode(post.title.rendered)}
                    </h2>
                  </Link>
                </div>
                <div className="post-details-down">
                  <Link href={`/fashion-show/${post.slug}`}>
                    <ButtonRevFill
                      param="READ MORE"
                      color="white"
                      bgcolor="black"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default MoreSinglePost;
