import React, { useState } from "react";
import Cookies from "js-cookie";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import * as yup from "yup";
import {
  EditableFields,
  FormData,
  IsEditing,
  UpdateMessage,
  UserData,
} from "@/app/api/types/profile";

// Funkcja do pobierania danych API (oddzielna od komponentu)
const fetchUserData = async (): Promise<UserData | null> => {
  const jwtToken = Cookies.get("jwtToken");

  if (!jwtToken) {
    console.error("JWT Token is not available.");
    return null;
  }

  try {
    const response = await fetch("/api/users/me");

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData: UserData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const Profile: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [updateMessage, setUpdateMessage] = useState<UpdateMessage>({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
  });
  const [isEditing, setIsEditing] = useState<IsEditing>({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const passwordSchema = yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character."
    );

  function formatField(field: string) {
    return field
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^(\w)/, (match) => match.toUpperCase());
  }

  // Funkcja do pobierania danych użytkownika
  const handleFetchData = async () => {
    const userData = await fetchUserData();
    if (userData) {
      setData(userData);
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        password: "",
      });
    }
  };

  // Wywołanie pobrania danych po załadowaniu komponentu
  React.useEffect(() => {
    handleFetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      passwordSchema
        .validate(value)
        .then(() => setPasswordError(null))
        .catch((err) => setPasswordError(err.message));
    }
  };

  const handleUpdateField = async (field: EditableFields) => {
    const jwtToken = Cookies.get("jwtToken");

    if (!jwtToken) {
      console.error("User is not authenticated.");
      return;
    }

    if (field === "password" && passwordError) {
      console.error("Password validation failed.");
      return;
    }

    try {
      const updatedData = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: jwtToken,
          field,
          value: formData[field],
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update ${formatField(field)}`);
        }
        return res.json();
      });

      setData((prevData) => ({
        ...prevData,
        ...updatedData,
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
        <h3>PROFILE</h3>
        <p>
          View and update your profile information, including your name, email,
          and change your password.
        </p>
      </div>

      {/* First Name */}
      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">FIRST NAME</p>
            <p className="input-up">{data.first_name || "Not set"}</p>
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
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="Enter new first name"
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

      {/* Last Name */}
      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">LAST NAME</p>
            <p className="input-up">{data.last_name || "Not set"}</p>
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
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Enter new first name"
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

      {/* Email */}
      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">EMAIL</p>
            <p className="input-up">{data.email || "Not set"}</p>
          </div>
          <ButtonRevFill
            param={isEditing.email ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("email")}
          />
        </div>
        <div className={`info-field-down ${isEditing.email ? "show" : ""}`}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter new email"
          />
          <div className="info-field-down-message-button">
            <div>{updateMessage.email && <p>{updateMessage.email}</p>}</div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("email")}
            />
          </div>
        </div>

        <hr />
      </div>

      {/* Password */}
      <div className="info-field">
        <div className="info-field-up">
          <div>
            <p className="text-s">PASSWORD</p>
            <p className="input-up">**********</p>
          </div>
          <ButtonRevFill
            param={isEditing.password ? "CANCEL" : "EDIT"}
            color="black"
            bgcolor="rgb(219, 219, 219)"
            onClick={() => toggleEdit("password")}
          />
        </div>
        <div className={`info-field-down ${isEditing.password ? "show" : ""}`}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <div className="info-field-down-message-button">
            <div>
              {updateMessage.password && <p>{updateMessage.password}</p>}
            </div>
            <ButtonRevFill
              param="SAVE"
              color="white"
              bgcolor="black"
              onClick={() => handleUpdateField("password")}
            />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Profile;
