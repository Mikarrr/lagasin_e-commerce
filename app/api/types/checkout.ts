export interface ShippingMethod {
  id: string;
  title: string;
  settings?: {
    cost?: {
      value: string;
    };
  };
}

export interface ShippingZone {
  zone: {
    id: string;
    name: string;
  };
  methods: ShippingMethod[];
}

export interface PaymentMethod {
  id: string;
  title: string;
  enabled: boolean;
}

export interface LineItem {
  product_id: number;
  variation_id?: number;
  quantity: number;
}

export interface ShippingLine {
  method_id: string;
  method_title: string;
  total: string;
}

export interface OrderData {
  customer_id?: string;
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
    shipping_method: string;
    phone: string;
  };
  line_items: LineItem[];
  shipping_lines: ShippingLine[]; // Dodano pole shipping_lines
}
