import nodemailer from "nodemailer";

interface EmailData {
  name: string;
  email: string;
  theme: string;
  message: string;
}

export async function sendEmail({ name, email, theme, message }: EmailData) {
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
      from: email,
      to: "mikserkis@gmail.com",
      subject: `New Message from ${name} - ${theme}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Theme:</strong> ${theme}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
