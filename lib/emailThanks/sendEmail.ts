import nodemailer from "nodemailer";

interface OrderEmailData {
  email: string;
  orderNumber: string;
  orderDate: string;
}

export async function sendOrderConfirmationEmail({
  email,
  orderNumber,
  orderDate,
}: OrderEmailData) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "Luis de Lagasin",
      to: email,
      subject: `Order Confirmation - ${orderNumber}`,
      text: `Thank you for your order!\n\nOrder Number: ${orderNumber}\nOrder Date: ${new Date(
        orderDate
      ).toLocaleDateString()}\n\nWe are processing your order and will notify you once it has shipped.`,
      html: `<p><strong>Order Number:</strong> ${orderNumber}</p>
             <p><strong>Order Date:</strong> ${new Date(
               orderDate
             ).toLocaleDateString()}</p>
             <p>Thank you for your order! We are processing it and will notify you once it has shipped.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
