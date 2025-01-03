"use client";

import React from "react";
import { decode } from "html-entities";
import { Category } from "@/app/api/types/category";
import { Post } from "@/app/api/types/posts";

const PostsFilter = ({
  categories,
  posts,
  onFilterChange,
}: {
  categories: Category[];
  posts: Post[];
  onFilterChange: (categoryId: number | null) => void;
}) => {
  const filteredCategories = categories.filter((category) =>
    posts.some((post) => post.categories.includes(category.id))
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    onFilterChange(categoryId || null);
  };

  return (
    <div className="filter">
      <div className="filter-container">
        <select
          className="category-filter"
          onChange={handleCategoryChange}
          defaultValue=""
        >
          <option value="">All Categories</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {decode(category.name)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PostsFilter;
