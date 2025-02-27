export interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  parent?: number | null;
  count?: number;
}
