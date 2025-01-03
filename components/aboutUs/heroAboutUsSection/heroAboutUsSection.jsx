import React from "react";
import "./style.css";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import Link from "next/link";
import ButtonScroll from "@/components/utils/buttonScroll/buttonScroll";

const HeroAboutUsSection = () => {
  return (
    <section className="about-us-hero-container">
      <div className="about-us-hero-container-bg">
        <div className="about-us-hero-container-up">
          <h1>
            DISCOVER THE ART OF <br></br> LUXURY FASHION
          </h1>
        </div>
        <div className="about-us-hero-container-down">
          <div className="products-buttons">
            <Link href="/products/women">
              <ButtonRevFill
                param="SHOP WOMEN"
                color="white"
                bgcolor="black"
                size="small"
              />
            </Link>
            <Link href="/products/men">
              <ButtonRevFill
                param="SHOP MEN"
                color="white"
                bgcolor="black"
                size="small"
              />
            </Link>
          </div>
        </div>
        <a href="#more-about-us">
          <ButtonScroll />
        </a>
      </div>
    </section>
  );
};

export default HeroAboutUsSection;
