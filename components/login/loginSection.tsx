import React from "react";
import "./style.css";
import LoginForm from "../utils/formLogin/loginForm";
const LoginSection = () => {
  return (
    <section className="login-container">
      <div className="login-container-up">
        <p className="text-xl">
          HI! WELCOME BACK.
          <br></br>
          <br></br> WE ARE GLAD YOU ARE HERE! LOG IN TO GAIN EXCLUSIVE ACCESS TO
          OUR LATEST COLLECTIONS AND SPECIAL MEMBER-ONLY OFFERS.<br></br>
          <br></br>SAVE YOUR PREFERENCES TO ENJOY FASTER CHECKOUT AND RECEIVE
          PERSONALIZED RECOMMENDATIONS TAILORED JUST FOR YOU. STEP INTO A WORLD
          OF TIMELESS ELEGANCE AND STYLE!
        </p>
      </div>
      <div className="conatct-container-down">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginSection;
