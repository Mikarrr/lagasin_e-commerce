export interface Variant {
  id: number;
  name: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  description: string;
  price: string;
  regular_price: string;
  sale_price: string | null;
  status: string;
  attributes: Array<{
    id: number;
    name: string;
    option: string;
  }>;
  image?: {
    id: number;
    src: string;
    alt: string;
  }; // Optional image
  stock_status?: string; // Add stock_status to the Variant interface
}
