import { NextResponse } from "next/server";
import { Post } from "../../types/posts";

export async function GET(): Promise<NextResponse> {
  const response = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&_fields=_links.wp:featuredmedia,_embedded.wp:featuredmedia,id,title,slug,content,categories,excerpt`,
    { cache: "no-cache" }
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać postów");
  }

  const posts: Post[] = await response.json();

  return NextResponse.json(posts);
}
