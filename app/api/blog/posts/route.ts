// app/api/blog/posts/route.ts
import { NextResponse } from "next/server";
import { Post } from "../../types/posts"; // Typ Post

// Funkcja GET do pobierania postów
export async function GET(): Promise<NextResponse> {
  const response = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed`,
    { cache: "no-cache" }
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać postów");
  }

  const posts: Post[] = await response.json();
  return NextResponse.json(posts); // Zwraca posty w odpowiedzi
}
