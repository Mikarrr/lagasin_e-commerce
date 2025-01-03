// types/category.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number; // ID rodzica (0 jeśli brak)
  count: number; // Liczba produktów w kategorii
  _links: {
    self: { href: string };
    collection: { href: string };
  };
}
