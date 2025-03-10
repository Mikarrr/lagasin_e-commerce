// app/components/PostsPage/index.tsx
import React from "react";
import PostsPageContent from "./postsContent";
import "./style.css";

const PostsPage = async () => {
  try {
    const postsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/posts`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    const posts = await postsResponse.json();

    const categoriesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/category`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    const categories = await categoriesResponse.json();

    return <PostsPageContent posts={posts} categories={categories} />;
  } catch (error) {
    console.error("Błąd:", error);
    return <div>Error posts loading</div>;
  }
};

export default PostsPage;
