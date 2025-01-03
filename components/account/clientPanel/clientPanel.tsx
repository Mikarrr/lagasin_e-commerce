"use client";
import "./style.css";
import React, { useState } from "react";
import LogoutButton from "@/components/utils/logoutButton/logoutButton";
import Profile from "./profile";
import Shipping from "./shipping";
import Orders from "./orders";

const ClientPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("profile");

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return <Profile />;
      case "shipping":
        return <Shipping />;
      case "orders":
        return <Orders />;
      default:
        return null;
    }
  };

  return (
    <section className="account-container">
      <div className="account-container-left">
        <p className="text-xl">ACCOUNT</p>
        <br />
        <button
          className={activeSection === "profile" ? "active" : ""}
          onClick={() => setActiveSection("profile")}
        >
          <p>PROFILE</p>
        </button>
        <button
          className={activeSection === "shipping" ? "active" : ""}
          onClick={() => setActiveSection("shipping")}
        >
          <p>SHIPPING</p>
        </button>
        <button
          className={activeSection === "orders" ? "active" : ""}
          onClick={() => setActiveSection("orders")}
        >
          <p>ORDERS</p>
        </button>

        <LogoutButton />
      </div>
      <div className="account-container-right">{renderSectionContent()}</div>
    </section>
  );
};

export default ClientPanel;
