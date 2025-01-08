import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Order } from "@/app/api/types/orders";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [showDetails, setShowDetails] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");

    if (jwtToken) {
      // Fetch the user data
      fetch("/api/users/me")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((userData) => {
          if (userData.id) {
            // Fetch orders for this user
            return fetch(`/api/orders/account/${userData.id}`);
          } else {
            throw new Error("User ID is not available");
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          return response.json();
        })
        .then((orderData) => {
          setOrders(orderData);
        })
        .catch((err) => {
          setError(err.message);
          setOrders([]);
        });
    } else {
      setError("JWT token not found");
    }
  }, []);

  const toggleDetails = (orderId: number) => {
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [orderId]: !prevShowDetails[orderId],
    }));
  };

  if (error) {
    return (
      <div className="account-container-right-orders">
        <div className="account-container-right-orders-top">
          <h3>ORDERS</h3>
          <p>
            View your previous orders and their status. You can also create
            returns or exchanges for your orders if needed.
          </p>
        </div>
        <p>No orders found.</p>
      </div>
    );
  }

  if (orders === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="account-container-right-orders">
      <div className="account-container-right-orders-top">
        <h3>ORDERS</h3>
        <p>
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-summary">
                <div>
                  <div className="small-info">
                    <p className="text-s">
                      {new Date(order.date_created).toLocaleDateString()} |
                    </p>
                    <p className="text-s">{order.total} PLN |</p>
                    <p className="text-s">
                      {order.line_items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{" "}
                      {order.line_items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      ) === 1
                        ? "item"
                        : "items"}
                    </p>
                  </div>
                  <p className="text-xl">#{order.id}</p>
                </div>

                <ButtonRevFill
                  param={showDetails[order.id] ? "BACK" : "VIEW"}
                  color="black"
                  bgcolor="rgb(219, 219, 219)"
                  onClick={() => toggleDetails(order.id)}
                />
              </div>

              {showDetails[order.id] && (
                <div
                  className={`order-details ${
                    showDetails[order.id] ? "show" : ""
                  }`}
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date_created).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Total:</strong> {order.total} {order.currency}
                  </p>
                  <div>
                    <strong>Items:</strong>
                    <ul>
                      {order.line_items.map((item, index) => (
                        <li key={index}>
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
