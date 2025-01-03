import React from "react";
import "./style.css";
import Form from "@/components/utils/form/form";

const ContactSection = () => {
  return (
    <section className="contact-container">
      <div className="contact-container-up">
        <p className="text-xl">
          GET IN TOUCH WITH US TO EXPLORE COLLABORATION OPPORTUNITIES OR RECEIVE
          PERSONALIZED GUIDANCE IN SELECTING FROM OUR EXCLUSIVE COLLECTIONS.
          <br></br>
          <br></br> OUR TEAM IS HERE TO ASSIST YOU IN DISCOVERING THE ESSENCE OF
          LUXURY AND UNIQUE STYLE WITH LUIS DE LAGASIN. LET’S CREATE SOMETHING
          EXTRAORDINARY TOGETHER THAT REFLECTS THE HIGHEST STANDARDS OF HIGH
          FASHION.
        </p>
      </div>
      <div className="conatct-container-down">
        <Form />
      </div>
    </section>
  );
};

export default ContactSection;
