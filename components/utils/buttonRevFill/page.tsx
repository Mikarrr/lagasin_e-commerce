"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

type ButtonProps = {
  param: string;
  size?: "small" | "medium" | "large" | "xlarge";
  color: string;
  bgcolor: string;
  onClick?: () => void; // Added onClick prop
};

const ButtonRevFill: React.FC<ButtonProps> = ({
  param,
  size = "small",
  color = "white",
  bgcolor = "black",
  onClick, // Destructure onClick from props
}) => {
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
      height: isMobile ? "15px" : "15px",
    },
    medium: {
      fontSize: isMobile ? "1rem" : "1.25rem",
      height: isMobile ? "19px" : "21px",
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
    <div
      className="rev-button-fill"
      style={{
        backgroundColor: bgcolor,
      }}
    >
      <button
        className="rev-button-fill-content"
        style={{
          fontSize: textSizeConfig[size].fontSize,
          height: textSizeConfig[size].height,
        }}
        type="submit"
        onClick={onClick} // Attach the onClick prop to the button
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
    </div>
  );
};

export default ButtonRevFill;
