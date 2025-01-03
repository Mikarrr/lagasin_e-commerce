import React from "react";
import { decode } from "html-entities";
import { Post } from "@/app/api/types/posts";
import { Category } from "@/app/api/types/category";
import ButtonScroll from "@/components/utils/buttonScroll/buttonScroll";

interface HeroProps {
  post: Post;
  categories: Category[];
}

const Hero: React.FC<HeroProps> = ({ post, categories }) => {
  const getFullImageUrl = (post: Post) => {
    const media = post._embedded["wp:featuredmedia"]?.[0];
    return media?.media_details?.sizes?.full?.source_url || "";
  };

  const fullImageUrl = getFullImageUrl(post);

  const getCategoryNames = (categoryIds: number[]) => {
    return categoryIds
      .map((categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? decode(category.name) : null;
      })
      .filter((name) => name !== null)
      .join(", ");
  };

  return (
    <section className="single-post-hero-container">
      <div
        className="single-post-hero-container-bg"
        style={{
          backgroundImage: `url(${fullImageUrl})`,
        }}
      >
        <div className="single-post-hero-container-up">
          <h1>{decode(post.title.rendered)}</h1>
          <p>{getCategoryNames(post.categories)}</p>
        </div>

        <a href="#more-single-post">
          <ButtonScroll />
        </a>
      </div>
    </section>
  );
};

export default Hero;
