// app/api/blog/category/route.ts
import { NextResponse } from "next/server";
import { Category } from "../../types/category"; // Typ Category

// Funkcja GET do pobierania kategorii
export async function GET(): Promise<NextResponse> {
  const response = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/categories?&_fields=id,name`
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać kategorii");
  }

  const categories: Category[] = await response.json();
  return NextResponse.json(categories); // Zwraca kategorie w odpowiedzi
}
