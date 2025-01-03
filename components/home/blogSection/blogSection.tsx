// app/components/BlogSection/index.tsx
import React from "react";
import "./style.css";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import Link from "next/link";
import ButtonRev from "@/components/utils/buttonRev/page";
import { decode } from "html-entities";
import { Category } from "@/app/api/types/category";
import { Post } from "@/app/api/types/posts";

// Funkcja do pobierania URL miniaturki
const getThumbnailUrl = (post: Post) => {
  const media = post._embedded["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.full?.source_url || "";
};

const BlogSection = async () => {
  try {
    // Pobieranie postów i kategorii asynchronicznie z API
    const postsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/posts`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const posts: Post[] = await postsResponse.json();

    const categoriesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/category`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const categories: Category[] = await categoriesResponse.json();

    // Funkcja do pobierania nazwy kategorii
    const getCategoryName = (categoryId: number) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? decode(category.name) : "Uncategorized";
    };

    return (
      <section className="blog-container">
        <div className="blog-container-up">
          <div>
            <h2>NEWS FASHION SHOW</h2>
            <p>Discover fashion news, and check out our fashion shows</p>
          </div>
          <Link href="/fashion-show">
            <ButtonRevFill
              param="FASHION SHOW"
              color="white"
              bgcolor="black"
              size="small"
            />
          </Link>
        </div>
        <div className="blog-container-down">
          {/* Sekcja dla pierwszego posta z tłem */}
          <div className="section-one">
            <div
              className="section-one-image"
              style={{
                backgroundImage: `url(${getThumbnailUrl(posts[0])})`, // Używamy miniaturki obrazu jako tło
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="section-one-description">
              <div>
                <p>{getCategoryName(posts[0].categories[0])}</p>
                <h2>{decode(posts[0].title.rendered)}</h2>
                <div
                  className="text-l"
                  dangerouslySetInnerHTML={{
                    __html: decode(posts[0].excerpt.rendered),
                  }}
                />
              </div>
              <Link href={`/fashion-show/${posts[0].slug}`}>
                <ButtonRev param="Read more" size="small" color="black" />
              </Link>
            </div>
          </div>

          {/* Sekcja dla kolejnych dwóch postów */}
          <div className="section-two">
            {posts.slice(1, 3).map((post) => (
              <div key={post.id} className="section-two-description">
                <div>
                  <p>{getCategoryName(post.categories[0])}</p>
                  <h3>{decode(post.title.rendered)}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decode(post.excerpt.rendered),
                    }}
                  />
                </div>
                <Link href={`/fashion-show/${post.slug}`}>
                  <ButtonRev param="Read more" size="small" color="black" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error loading posts</div>;
  }
};

export default BlogSection;
