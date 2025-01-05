"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import ButtonRevFill from "../buttonRevFill/page";

interface FormData {
  name: string;
  email: string;
  theme: string;
  message: string;
  agree: boolean;
}

// Walidacja formularza z użyciem Yup
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Email is invalid")
      .notOneOf(
        [
          "test@test.pl",
          "test@tes.t.pl",
          "example@example.com",
          "test@example.com",
          "fake@fake.com",
          "spam@spam.com",
          "user@domain.com",
          "noreply@noreply.com",
          "bot@bot.com",
          "admin@admin.com",
          "info@info.com",
          "contact@contact.com",
          "support@support.com",
          "no-reply@no-reply.com",
          "robot@robot.com",
        ],
        "This email is not allowed"
      )
      .required("Email is required"),
    theme: yup.string().required("Theme is required"),
    message: yup.string().required("Message is required"),
    agree: yup
      .boolean()
      .oneOf([true], "You must agree to the processing of your data")
      .required("You must agree to the processing of your data"),
  })
  .required();

const Form = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    setStatusMessage("Email sent successfully!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-container-left">
          <div>
            <input
              id="name"
              type="text"
              placeholder="Name *"
              {...register("name")}
              className="input-required"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
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
              id="theme"
              type="text"
              placeholder="Theme *"
              {...register("theme")}
              className="input-required"
            />
            {errors.theme && <p>{errors.theme.message}</p>}
          </div>
        </div>
        <div className="form-container-right">
          <div>
            <textarea
              id="message"
              placeholder="Message *"
              {...register("message")}
              className="input-required"
            />
            {errors.message && <p>{errors.message.message}</p>}
          </div>
        </div>
        <div>
          <div className="agree">
            <div>
              <input
                id="agree"
                className="styled-checkbox"
                type="checkbox"
                {...register("agree")}
              />
              <span className="agree-text">
                I agree to the processing of my data in accordance with the
                Privacy Policy
              </span>
            </div>
            {errors.agree && <p>{errors.agree.message}</p>}
          </div>

          <div className="button-form">
            <ButtonRevFill
              size="small"
              color="white"
              bgcolor="black"
              param="SEND"
            />
          </div>
        </div>
      </form>

      {/* Wyświetlanie statusu wiadomości */}
      <br />
      {statusMessage && (
        <div className="status-message">
          <p>{statusMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
