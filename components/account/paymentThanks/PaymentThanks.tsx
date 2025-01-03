"use client";
import "./style.css";
import { useRouter } from "next/navigation";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";

const PaymentThanks = () => {
  const router = useRouter();

  return (
    <section className="thank-you-page">
      <h2>THANK YOU!</h2>
      <p>Your order was placed successfully.</p>
      <br />
      <p>We have sent the order confirmation details to you.</p>

      <ButtonRevFill
        param="BACK HOME"
        color="white"
        bgcolor="black"
        onClick={() => router.push("/")} // Przycisk prowadzący na stronę główną
      />
    </section>
  );
};

export default PaymentThanks;
