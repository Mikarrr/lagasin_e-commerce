import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email/sendEmail";

export async function POST(req: Request) {
  try {
    const { name, email, theme, message } = await req.json();

    if (!name || !email || !theme || !message) {
      return NextResponse.json(
        { message: "Wszystkie pola są wymagane" },
        { status: 400 }
      );
    }
    const result = await sendEmail({ name, email, theme, message });

    if (result.success) {
      return NextResponse.json(
        { message: "Email wysłany pomyślnie!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Nie udało się wysłać emaila", error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd serwera", error },
      { status: 500 }
    );
  }
}
