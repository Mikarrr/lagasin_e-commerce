import { Post } from "@/app/api/types/posts";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const response = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch post data" },
      { status: response.status }
    );
  }

  const posts: Post[] = await response.json();
  return NextResponse.json(posts);
}
