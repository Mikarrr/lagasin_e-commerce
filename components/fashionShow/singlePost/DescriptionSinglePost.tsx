import React from "react";
import { decode } from "html-entities";
import { Post } from "@/app/api/types/posts";

interface DescriptionProps {
  post: Post;
}

const Description: React.FC<DescriptionProps> = ({ post }) => {
  return (
    <section className="post-description" id="more-single-post">
      <div
        dangerouslySetInnerHTML={{
          __html: decode(post.content.rendered),
        }}
      />
    </section>
  );
};

export default Description;
