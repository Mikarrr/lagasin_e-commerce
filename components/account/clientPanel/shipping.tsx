"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import countries from "i18n-iso-countries";
import pl from "i18n-iso-countries/langs/pl.json";
import { EditableFields, ShippingData } from "@/app/api/types/shipping";

countries.registerLocale(pl);

const ShippingForm: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [data, setData] = useState<ShippingData | null>(null);
  const [formData, setFormData] = useState({
    phone: "",
    company: "",
    address_1: "",
    city: "",
    postcode: "",
    country: "",
    state: "",
    first_name: "",
    last_name: "",
  });
  const [updateMessage, setUpdateMessage] = useState({
    phone: null,
    company: null,
    address_1: null,
    city: null,
    postcode: null,
    country: null,
    state: null,
    first_name: null,
    last_name: null,
  });
  const [isEditing, setIsEditing] = useState<Record<EditableFields, boolean>>({
    phone: false,
    address_1: false,
    city: false,
    postcode: false,
    country: false,
    company: false,
    state: false,
    first_name: false,
    last_name: false,
  });

  // Pobieranie listy krajów
  const countryOptions = Object.entries(countries.getNames("pl")).map(
    ([code, name]) => ({ code, name })
  );

  function formatField(field: string) {
    return field
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^(\w)/, (match) => match.toUpperCase());
  }

  // Pobieranie danych użytkownika i klienta
  const jwtToken = Cookies.get("jwtToken");

  if (jwtToken && !userId) {
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

          return fetch(`/api/customers/${userData.id}`);
        } else {
          throw new Error("User ID is not available");
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        return response.json();
      })
      .then((customerData: ShippingData) => {
        setData(customerData);

        // Set initial form data from customer data
        setFormData({
          phone: customerData.shipping.phone || "",
          address_1: customerData.shipping.address_1 || "",
          city: customerData.shipping.city || "",
          postcode: customerData.shipping.postcode || "",
          country: customerData.shipping.country || "",
          company: customerData.shipping.company || "",
          state: customerData.shipping.state || "",
          first_name: customerData.shipping.first_name || "",
          last_name: customerData.shipping.last_name || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user or customer data:", error);
      });
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateField = async (field: EditableFields) => {
    const jwtToken = Cookies.get("jwtToken");

    if (!jwtToken) {
      console.error("User is not authenticated.");
      return;
    }

    const value = formData[field];

    try {
      const response = await fetch("/api/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          field,
          value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update shipping data");
      }

      const updatedData = await response.json();

      setData(updatedData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: updatedData.shipping?.[field] || "",
      }));

      setUpdateMessage((prevMessage) => ({
        ...prevMessage,
        [field]: `${formatField(field)} updated successfully.`,
      }));

      setTimeout(() => {
        setUpdateMessage((prevMessage) => ({
          ...prevMessage,
          [field]: null,
        }));
      }, 3000);
    } catch (error) {
      console.error(`Error updating ${formatField(field)}:`, error);
      setUpdateMessage((prevMessage) => ({
        ...prevMessage,
        [field]: `Failed to update ${formatField(field)}. Please try again.`,
      }));
      setTimeout(() => {
        setUpdateMessage((prevMessage) => ({
          ...prevMessage,
          [field]: null,
        }));
      }, 3000);
    }
  };

  const toggleEdit = (field: EditableFields) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [field]: !prevIsEditing[field],
    }));
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="account-container-right-profile">
      <div className="account-container-right-profile-top">
        <h3>SHIPPING INFORMATION</h3>
        <p>
          View and update your shipping information, including your name,
          address, and others.
        </p>
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">FIRST NAME</p>
            <p className="input-up">{data.shipping.first_name || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.first_name ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("first_name")}
          />
        </div>
        <div
          className={`info-field-down ${isEditing.first_name ? "show" : ""}`}
        >
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>
              {updateMessage.first_name && <p>{updateMessage.first_name}</p>}
            </div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("first_name")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">LAST NAME</p>
            <p className="input-up">{data.shipping.last_name || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.last_name ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("last_name")}
          />
        </div>
        <div className={`info-field-down ${isEditing.last_name ? "show" : ""}`}>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>
              {updateMessage.last_name && <p>{updateMessage.last_name}</p>}
            </div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("last_name")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">PHONE</p>
            <p className="input-up">{data.shipping.phone || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.phone ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("phone")}
          />
        </div>
        <div className={`info-field-down ${isEditing.phone ? "show" : ""}`}>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>{updateMessage.phone && <p>{updateMessage.phone}</p>}</div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("phone")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">COMPANY</p>
            <p className="input-up">{data.shipping.company || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.company ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("company")}
          />
        </div>
        <div className={`info-field-down ${isEditing.company ? "show" : ""}`}>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>{updateMessage.company && <p>{updateMessage.company}</p>}</div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("company")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">ADDRESS 1</p>
            <p className="input-up">{data.shipping.address_1 || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.address_1 ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("address_1")}
          />
        </div>
        <div className={`info-field-down ${isEditing.address_1 ? "show" : ""}`}>
          <input
            type="text"
            id="address_1"
            name="address_1"
            value={formData.address_1}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>
              {updateMessage.address_1 && <p>{updateMessage.address_1}</p>}
            </div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("address_1")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">CITY</p>
            <p className="input-up">{data.shipping.city || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.city ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("city")}
          />
        </div>
        <div className={`info-field-down ${isEditing.city ? "show" : ""}`}>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>{updateMessage.city && <p>{updateMessage.city}</p>}</div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("city")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">POSTCODE</p>
            <p className="input-up">{data.shipping.postcode || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.postcode ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("postcode")}
          />
        </div>
        <div className={`info-field-down ${isEditing.postcode ? "show" : ""}`}>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>
              {updateMessage.postcode && <p>{updateMessage.postcode}</p>}
            </div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("postcode")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">COUNTRY</p>
            <div>
              <p className="input-up">
                {data.shipping.country
                  ? countries.getName(data.shipping.country, "pl") ||
                    data.shipping.country
                  : "Not set"}
              </p>
            </div>
          </div>
          <ButtonRevFill
            param={isEditing.country ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("country")}
          />
        </div>
        <div className={`info-field-down ${isEditing.country ? "show" : ""}`}>
          <div className="custom-select">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="">Select a country</option>
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="info-field-down-message-button">
            <div>{updateMessage.country && <p>{updateMessage.country}</p>}</div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("country")}
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">STATE</p>
            <p className="input-up">{data.shipping.state || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.state ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("state")}
          />
        </div>
        <div className={`info-field-down ${isEditing.state ? "show" : ""}`}>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
          <div className="info-field-down-message-button">
            <div>{updateMessage.state && <p>{updateMessage.state}</p>}</div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("state")}
            />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ShippingForm;
