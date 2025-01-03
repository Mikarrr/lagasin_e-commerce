export type EditableFields =
  | "phone"
  | "address_1"
  | "city"
  | "postcode"
  | "country"
  | "company"
  | "state"
  | "first_name"
  | "last_name";

export type ShippingData = {
  shipping: {
    phone: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
    company: string;
    state: string;
    first_name: string;
    last_name: string;
  };
};
