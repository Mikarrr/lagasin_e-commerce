// app/api/orders/email/route.ts

import { sendOrderConfirmationEmail } from "@/lib/emailThanks/sendEmail";

export async function POST(req: Request) {
  const { email, orderNumber, orderDate } = await req.json();

  const result = await sendOrderConfirmationEmail({
    email,
    orderNumber,
    orderDate,
  });

  if (result.success) {
    return new Response("Email sent successfully");
  } else {
    return new Response("Error sending email", { status: 500 });
  }
}
