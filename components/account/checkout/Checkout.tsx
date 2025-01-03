"use client";
import "./style.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Product } from "@/app/api/types/product";
import { Variant } from "@/app/api/types/variants";
import {
  LineItem,
  OrderData,
  PaymentMethod,
  ShippingMethod,
  ShippingZone,
} from "@/app/api/types/checkout";
import countries from "i18n-iso-countries";
import pl from "i18n-iso-countries/langs/pl.json";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";

countries.registerLocale(pl);

interface CartItem {
  product: Product;
  variant: Variant | null;
  quantity: number;
}

const CheckoutSection = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "cod",
    shippingMethod: "",
    shippingCost: "",
    shippingZone: "",
    shippingTitle: "",
  });

  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  const loadCartItems = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart: Product[] = JSON.parse(savedCart);
      const processedItems: CartItem[] = parsedCart.reduce(
        (acc: CartItem[], product) => {
          const variant = product.variants ? product.variants[0] : null;
          const existingItemIndex = acc.findIndex(
            (item) =>
              item.product.id === product.id && item.variant?.id === variant?.id
          );
          if (existingItemIndex > -1) {
            acc[existingItemIndex].quantity += 1;
          } else {
            acc.push({ product, variant, quantity: product.quantity || 1 });
          }
          return acc;
        },
        []
      );

      setCartItems(processedItems);
    }
  };

  useEffect(() => {
    loadCartItems();
    fetchShippingMethods();
    fetchPaymentMethods();

    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      fetch("/api/users/me")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((userData) => {
          if (userData.id) {
            setUserId(userData.id);
            setFormData((prevState) => ({
              ...prevState,
              firstName: userData.first_name || "",
              lastName: userData.last_name || "",
              email: userData.email || "",
            }));
            fetch(`/api/customers/${userData.id}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to fetch customer data");
                }
                return response.json();
              })
              .then((customerData) => {
                setFormData((prevState) => ({
                  ...prevState,
                  address: customerData.shipping.address_1 || "",
                  city: customerData.shipping.city || "",
                  postalCode: customerData.shipping.postcode || "",
                  country: customerData.shipping.country || "",
                  phone: customerData.shipping.phone || "",
                }));
              })
              .catch((error) => {
                console.error("Error fetching customer data:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const fetchShippingMethods = async () => {
    try {
      const response = await fetch("/api/orders/shipping");
      const data: ShippingZone[] = await response.json();
      setShippingZones(data);

      const polskaZone = data.find((zone) => zone.zone.name === "Polska");
      if (polskaZone) {
        setFormData((prevState) => ({
          ...prevState,
          shippingZone: polskaZone.zone.id,
        }));
      }
    } catch (error) {
      console.error("Error fetching shipping methods:", error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("/api/orders/payment");
      const data: PaymentMethod[] = await response.json();
      const activePaymentMethods = data.filter((method) => method.enabled);
      setPaymentMethods(activePaymentMethods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const line_items: LineItem[] = cartItems.map((item) => ({
      product_id: item.product.id,
      variation_id: item.variant?.id,
      quantity: item.quantity,
    }));

    const orderData: OrderData = {
      customer_id: userId || undefined,
      payment_method: formData.paymentMethod,
      payment_method_title:
        formData.paymentMethod === "cod" ? "Cash on Delivery" : "PayPal",
      set_paid: formData.paymentMethod !== "cod",
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        postcode: formData.postalCode,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        postcode: formData.postalCode,
        country: formData.country,
        shipping_method: formData.shippingMethod,
        phone: formData.phone,
      },
      line_items,
      shipping_lines: [
        {
          method_id: formData.shippingMethod,
          method_title: formData.shippingTitle,
          total: formData.shippingCost,
        },
      ],
    };

    try {
      const response = await fetch("/api/orders/orderThanks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.removeItem("cart");

        const cartUpdatedEvent = new Event("cartUpdated");
        window.dispatchEvent(cartUpdatedEvent);

        await fetch("/api/orders/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            orderNumber: data.orderNumber,
            orderDate: data.orderDate,
          }),
        });

        router.push(`/thank-you?orderId=${data.orderNumber}`);
      } else {
        setErrorMessages([
          data.error || "An error occurred while processing the order.",
        ]);
      }
    } catch (error) {
      setErrorMessages([
        "An unexpected error occurred. Please try again later.",
      ]);
      console.error("Error during order submission:", error);
    }
  };

  return (
    <div className="checkout-section">
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>SHIPPING ADDRESS</h3>

        <div className="all-form-groups">
          <div className="form-group-left">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="EMAIL *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="FIRST NAME *"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                placeholder="ADDRESS *"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="postalCode"
                placeholder="POSTAL CODE *"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group-right">
            <div className="form-group">
              <input
                type="text"
                name="phone"
                placeholder="PHONE *"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="LAST NAME *"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="CITY *"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <div className="custom-select">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country</option>
                  {Object.entries(countries.getNames("pl")).map(
                    ([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h3>DELIVERY</h3>
        <div className="form-group-select">
          {shippingZones
            .find((zone) => zone.zone.id === formData.shippingZone)
            ?.methods?.map((method: ShippingMethod) => {
              const cost = method.settings?.cost?.value || "10";
              return (
                <div key={method.id} className="custom-radio">
                  <input
                    type="radio"
                    id={method.id}
                    className="custom-radio-input"
                    name="shippingMethod"
                    value={method.id}
                    onChange={(e) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        shippingMethod: e.target.value,
                        shippingCost: cost,
                        shippingTitle: method.title,
                      }));
                    }}
                    checked={
                      String(formData.shippingMethod) === String(method.id)
                    }
                  />
                  <label htmlFor={method.id} className="custom-radio-label">
                    {method.title} - {parseFloat(cost).toFixed(2)} PLN
                    <span className="custom-radio-checkmark"></span>
                  </label>
                </div>
              );
            }) || <p>No shipping methods available</p>}
        </div>
        <br />
        <h3>PAYMENT METHOD</h3>
        <div className="form-group-select">
          {paymentMethods.map((method) => (
            <div key={method.id} className="custom-radio">
              <input
                type="radio"
                id={method.id}
                className="custom-radio-input"
                name="paymentMethod"
                value={method.id}
                onChange={handleInputChange}
                checked={formData.paymentMethod === method.id}
              />
              <label htmlFor={method.id} className="custom-radio-label">
                {method.title}
                <span className="custom-radio-checkmark"></span>
              </label>
            </div>
          ))}
        </div>
        <br></br>
        <ButtonRevFill param="PLACE ORDER" color="white" bgcolor="black" />
        <br />
        <div className="error-messages">
          {errorMessages.map((error, index) => (
            <p key={index} className="error-text">
              {error}
            </p>
          ))}
        </div>
      </form>
    </div>
  );
};

export default CheckoutSection;
