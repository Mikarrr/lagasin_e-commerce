"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import ButtonRevFill from "../buttonRevFill/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

// Schema validation with Yup
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/\d/, "Password must contain at least one number.")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character."
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  })
  .required();

const RegisterForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Sending data to the custom WordPress endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const customMessage =
          errorResponse.message || "Registration error. Please try again.";
        setStatusMessage(customMessage);
        return;
      }

      const result = await response.json();
      setStatusMessage(result.message || "Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setStatusMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container-register"
      >
        <div className="form-container-left">
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email *"
              {...register("email")}
              className="input-required"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password *"
              {...register("password")}
              className="input-required"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password *"
              {...register("confirmPassword")}
              className="input-required"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <input
              id="firstName"
              type="text"
              placeholder="First Name *"
              {...register("firstName")}
              className="input-required"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>
          <div>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name *"
              {...register("lastName")}
              className="input-required"
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
          <br />
          <div className="button-form">
            <ButtonRevFill
              size="small"
              color="white"
              bgcolor="black"
              param="REGISTER"
            />
            <Link href="/login">
              <ButtonRevFill
                size="small"
                color="black"
                bgcolor="rgb(219, 219, 219)"
                param="LOGIN"
              />
            </Link>
          </div>
        </div>
      </form>

      <br />
      {statusMessage && (
        <div className="status-message">
          <p>{statusMessage}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
