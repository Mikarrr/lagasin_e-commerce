import React from "react";
import "./style.css";
import Hero from "./HeroSinglePost";
import Description from "./DescriptionSinglePost";
import MoreSinglePost from "./MoreSinglePost";
import { Post } from "@/app/api/types/posts";
import { Category } from "@/app/api/types/category";

interface SinglePostPageProps {
  post: Post;
  posts: Post[];
  categories: Category[];
}

const SinglePostPage: React.FC<SinglePostPageProps> = ({
  post,
  posts,
  categories,
}) => {
  return (
    <section className="single-post-section-container">
      <article key={post.id} className="single-post" lang="pl">
        <Hero post={post} categories={categories} />
        <Description post={post} />
        <MoreSinglePost posts={posts} categories={categories} />
      </article>
    </section>
  );
};

export default SinglePostPage;
