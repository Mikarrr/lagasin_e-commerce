import React from "react";
import "./style.css";
import ButtonRevFill from "@/components/utils/buttonRevFill/page";
import Link from "next/link";

const AboutUsSection = () => {
  return (
    <section className="about-us-container">
      <div className="about-us-container-up">
        <p className="text-xl">
          Luis de lagasin deviates from convention. It tackles topics that are
          often overlooked and difficult in the fashion industry.<br></br>
          <br></br> Our brand engages in dialogue about ethics in apparel
          production, sustainable fashion and the environmental impact of the
          textile industry.
        </p>
        <Link href="/about-us">
          <ButtonRevFill
            param="ABOUT US"
            size="small"
            color="white"
            bgcolor="black"
          />
        </Link>
      </div>
      <div className="about-us-container-down">
        <div className="image-left"></div>
        <div className="image-right"></div>
      </div>
    </section>
  );
};

export default AboutUsSection;
