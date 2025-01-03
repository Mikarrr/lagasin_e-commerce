"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import ButtonRevFill from "../buttonRevFill/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    rememberMe: yup.boolean(),
  })
  .required();

const LoginForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      setIsLoggedIn(true);
      router.push("/account");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      if (result.jwtToken) {
        Cookies.set("jwtToken", result.jwtToken, { expires: 7 });
        setStatusMessage("Login successful!");
        setIsLoggedIn(true);
        router.push("/account");
      } else {
        setStatusMessage("No token received. Please try again.");
      }
    } else {
      switch (result.code) {
        case "[jwt_auth] invalid_email":
          setStatusMessage(
            "Unknown email address. Please check again or try using your username."
          );
          break;
        case "[jwt_auth] incorrect_password":
          setStatusMessage("Incorrect password. Please try again.");
          break;
        case "[jwt_auth] user_not_found":
          setStatusMessage(
            "User not found. Please check your email or username."
          );
          break;
        case "[jwt_auth] invalid_credentials":
          setStatusMessage("Invalid credentials. Please try again.");
          break;
        default:
          setStatusMessage(
            result.message ||
              "An error occurred during login. Please try again."
          );
      }
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <p>
          You are already logged in. You will be redirected to your account
          page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container-login">
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
          <br />
          <div className="button-form">
            <ButtonRevFill
              size="small"
              color="white"
              bgcolor="black"
              param="LOGIN"
            />
            <Link href="/register">
              <ButtonRevFill
                size="small"
                color="black"
                bgcolor="rgb(219, 219, 219)"
                param="REGISTER"
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

export default LoginForm;
