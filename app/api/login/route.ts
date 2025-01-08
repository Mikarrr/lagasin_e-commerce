import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: password }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.json();

      let customMessage = "An error occurred during login. Please try again.";
      switch (errorMessage.code) {
        case "[jwt_auth] invalid_email":
          customMessage =
            "Unknown email address. Please check your email or try using your username.";
          break;
        case "[jwt_auth] incorrect_password":
          customMessage = "Incorrect password. Please try again.";
          break;
        case "[jwt_auth] user_not_found":
          customMessage =
            "User not found. Please check your email or username.";
          break;
        case "[jwt_auth] invalid_credentials":
          customMessage = "Invalid credentials. Please try again.";
          break;
        default:
          customMessage =
            errorMessage.message ||
            "An error occurred during login. Please try again.";
          break;
      }

      return new NextResponse(
        JSON.stringify({
          message: customMessage,
          details: errorMessage,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await response.json();
    const token = result.token;

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Token not received." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const cookie = serialize("jwtToken", token, {
      httpOnly: false,
      secure: false, // Set `true` in production
      sameSite: "strict",
      path: "/",
    });

    return new NextResponse(
      JSON.stringify({
        message: "Login successful!",
        jwtToken: token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse(
      JSON.stringify({
        message: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
