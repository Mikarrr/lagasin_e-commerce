import React from "react";
import "./style.css";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import Link from "next/link";
import ButtonScroll from "@/components/utils/buttonScroll/buttonScroll";

const HeroHomeSection = () => {
  return (
    <section className="hero-container">
      <div className="hero-container-bg">
        <div className="hero-container-up">
          <h1>
            LUIS DE LAGASIN <br></br> LOVE COLLECTION
          </h1>
        </div>
        <div className="hero-container-down">
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
        <a href="#new-arrivals">
          <ButtonScroll />
        </a>
      </div>
    </section>
  );
};

export default HeroHomeSection;
