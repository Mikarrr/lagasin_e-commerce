export interface Order {
  id: number;
  date_created: string;
  status: string;
  total: string;
  currency: string;
  line_items: { name: string; quantity: number }[];
}
