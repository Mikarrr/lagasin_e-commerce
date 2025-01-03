import React from "react";
import "./style.css";
import RegisterForm from "../utils/formRegister/Registerform";

const RegisterSection = () => {
  return (
    <section className="register-container">
      <div className="register-container-up">
        <p className="text-xl">
          REGISTER JOIN TO US!
          <br></br>
          <br></br> CREATE YOUR LUIS DE LAGASIN ACCOUNT TO ENJOY EXCLUSIVE
          ACCESS TO OUR NEWEST COLLECTIONS AND SPECIAL MEMBER-ONLY OFFERS.{" "}
          <br></br>
          <br></br>SAVE YOUR PREFERENCES AND ENJOY A FASTER CHECKOUT WITH
          PERSONALIZED RECOMMENDATIONS TAILORED JUST FOR YOU. JOIN US TODAY AND
          STEP INTO A WORLD OF TIMELESS ELEGANCE AND STYLE!
        </p>
      </div>
      <div className="conatct-container-down">
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterSection;
