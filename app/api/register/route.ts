import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Konfiguracja transportera Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Możesz użyć innej usługi, jak SendGrid
  auth: {
    user: process.env.EMAIL_USER, // Twój adres e-mail
    pass: process.env.EMAIL_PASS, // Hasło aplikacji lub hasło do konta e-mail
  },
});

async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.NEXT_PUBLIC_API_URL}/api/verifyEmail/${token}`;
  console.log("Preparing to send email. Verification link:", verificationLink);

  const mailOptions = {
    from: process.env.EMAIL_USER, // Adres nadawcy
    to: email,
    subject: "Verify your email",
    text: `Click the link to verify your email: ${verificationLink}`,
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };

  try {
    console.log("Sending email to:", email);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email.");
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Received registration request.");
    const { email, password, firstName, lastName } = await req.json();

    console.log("Request body:", { email, firstName, lastName });

    if (!email || !password || !firstName || !lastName) {
      console.warn("Validation failed: Missing fields.");
      return new NextResponse(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    // Generowanie tokenu weryfikacji
    const token = crypto.randomBytes(32).toString("hex");
    console.log("Generated verification token:", token);

    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/my-api/v1/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          token,
        }),
      }
    );

    console.log("WordPress registration API response status:", response.status);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("WordPress API error:", errorResponse);
      return new NextResponse(
        JSON.stringify({ message: errorResponse.message }),
        { status: response.status }
      );
    }

    // Wysyłanie e-maila z linkiem weryfikacyjnym
    console.log("Sending verification email to:", email);
    await sendVerificationEmail(email, token);
    console.log("Verification email sent successfully.");

    return new NextResponse(
      JSON.stringify({ message: "Check your email to verify your account!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return new NextResponse(
      JSON.stringify({ message: "An unexpected error occurred." }),
      { status: 500 }
    );
  }
}
