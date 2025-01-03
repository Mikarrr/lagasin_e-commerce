import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Receiving data from the request body
    const { email, password, firstName, lastName } = await req.json();

    // Validate that all required fields are present
    if (!email || !password || !firstName || !lastName) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sending data to WordPress for registration
    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/my-api/v1/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();

      // Custom error messages based on the error code
      let customMessage =
        "An error occurred during registration. Please try again.";
      switch (errorResponse.code) {
        case "[register] email_already_exists":
          customMessage =
            "The provided email address is already registered. Please use a different email.";
          break;
        case "[register] weak_password":
          customMessage =
            "The password is too weak. Please choose a stronger password.";
          break;
        case "[register] invalid_email":
          customMessage =
            "The provided email address is invalid. Please check and try again.";
          break;
        case "[register] missing_required_fields":
          customMessage =
            "Some required fields are missing. Please fill in all fields.";
          break;
        default:
          customMessage =
            errorResponse.message ||
            "An error occurred during registration. Please try again.";
          break;
      }

      return new NextResponse(
        JSON.stringify({ message: customMessage, details: errorResponse }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await response.json();

    if (result.message !== "Registration successful") {
      return new NextResponse(
        JSON.stringify({ message: "Registration failed. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Registration successful
    return new NextResponse(
      JSON.stringify({ message: "Registration successful!" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return new NextResponse(
      JSON.stringify({
        message: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
