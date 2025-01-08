import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
    console.log("Received email verification request.");
    const { token } = params;

    console.log("Token received from URL:", token);

    if (!token) {
      console.warn("Token is missing in the request.");
      return new NextResponse(JSON.stringify({ message: "Invalid token." }), {
        status: 400,
      });
    }

    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/my-api/v1/verify-email/${token}`,
      {
        method: "GET", // Upewnij się, że metoda GET jest odpowiednia
      }
    );

    console.log("WordPress verification API response status:", response.status);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("WordPress API verification error:", errorResponse);
      return new NextResponse(
        JSON.stringify({
          message: errorResponse.message || "Verification failed.",
        }),
        { status: response.status }
      );
    }

    console.log("Email verified successfully for token:", token);

    // Ustawienie odpowiedzi z kodem 302 (przekierowanie)
    const verificationSuccessResponse = new NextResponse(
      JSON.stringify({ message: "Your email has been verified successfully!" }),
      { status: 302 } // Ustawiamy status na 302, który oznacza przekierowanie
    );

    // Dodajemy nagłówek Location, aby przekierować użytkownika na stronę logowania
    verificationSuccessResponse.headers.set("Location", "/login");

    // Zwracamy odpowiedź z nagłówkiem Location i kodem 302
    return verificationSuccessResponse;
  } catch (error) {
    console.error("Verification error:", error);
    return new NextResponse(
      JSON.stringify({ message: "An unexpected error occurred." }),
      { status: 500 }
    );
  }
}
