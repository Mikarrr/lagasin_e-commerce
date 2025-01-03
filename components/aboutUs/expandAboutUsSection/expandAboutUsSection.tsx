import React from "react";
import "./style.css";

const ExpandAboutUsSection = () => {
  return (
    <section className="expand-about-us-container" id="more-about-us">
      <div className="expand-about-us-container-up">
        <p className="text-xl">
          AT LUIS DE LAGASIN, WE BELIEVE THAT FASHION IS MORE THAN CLOTHING –
          IT’S AN EXPRESSION OF ART, LUXURY, AND INDIVIDUALITY. <br></br>
          <br></br> WITH A PASSION FOR REDEFINING HIGH FASHION, WE CURATE
          EXQUISITE COLLECTIONS THAT EMBODY TIMELESS ELEGANCE AND MODERN
          SOPHISTICATION.
        </p>
        <div className="image-large"></div>
      </div>
      <div className="expand-about-us-container-down">
        <div className="image-small"></div>
        <p className="text-xl">
          EACH PIECE IS CAREFULLY CRAFTED TO REFLECT THE HIGHEST STANDARDS OF
          QUALITY AND DESIGN. <br></br>
          <br></br> OUR MISSION IS TO INSPIRE CONFIDENCE AND EMPOWER INDIVIDUALS
          THROUGH STYLE THAT SPEAKS TO THE HEART AND SPIRIT.<br></br>
          <br></br> ROM HANDPICKED FABRICS TO EXCEPTIONAL CRAFTSMANSHIP, WE ARE
          DEDICATED TO BRINGING YOU UNPARALLELED BEAUTY AND REFINEMENT.{" "}
          <br></br>
          <br></br> JOIN US ON A JOURNEY INTO THE WORLD OF LUXURY FASHION, WHERE
          EVERY DETAIL TELLS A STORY OF ELEGANCE AND PASSION.
        </p>
      </div>
    </section>
  );
};

export default ExpandAboutUsSection;
