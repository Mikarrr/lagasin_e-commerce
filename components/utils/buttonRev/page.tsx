"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

type ButtonProps = {
  param: string;
  size?: "small" | "medium" | "large" | "xlarge";
  color: string;
};

const ButtonRev: React.FC<ButtonProps> = ({ param, size = "small", color }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textSizeConfig = {
    small: {
      fontSize: isMobile ? "0.9rem" : "0.9rem",
      height: isMobile ? "16px" : "15px",
    },
    medium: {
      fontSize: isMobile ? "1" : "1rem",
      height: isMobile ? "16px" : "15px",
    },
    large: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      height: isMobile ? "25px" : "34px",
    },
    xlarge: {
      fontSize: isMobile ? "40px" : "60px",
      height: isMobile ? "44px" : "65px",
    },
  };

  return (
    <button
      className="rev-button"
      style={{
        fontSize: textSizeConfig[size].fontSize,
        height: textSizeConfig[size].height,
      }}
    >
      <p
        style={{
          color: color,
        }}
      >
        {param}
      </p>
      <p
        style={{
          color: color,
        }}
      >
        {param}
      </p>
    </button>
  );
};

export default ButtonRev;
