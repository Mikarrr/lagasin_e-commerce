import React from "react";
import Image from "next/image";
import "./style.css";

const ButtonScroll = () => {
  return (
    <button className="scroll-down">
      <p>SCROLL TO DISCOVER</p>
      <Image
        src="/down.svg"
        alt="scroll down"
        width={18}
        height={8}
        loading="lazy"
      />
    </button>
  );
};

export default ButtonScroll;
