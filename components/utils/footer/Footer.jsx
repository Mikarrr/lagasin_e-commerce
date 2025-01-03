import React from "react";
import "./style.css";
import ButtonRev from "../buttonRev/page";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-container-up">
        <div className="footer-container-left">
          <div>
            <p className="tag-bold">Menu</p>
            <Link href="/about-us">
              <ButtonRev param="About us" size="medium" color="black" />
            </Link>
            <Link href="/products">
              <ButtonRev param="Products" size="medium" color="black" />
            </Link>
            <Link href="/fashion-show">
              <ButtonRev param="Fashion show" size="medium" color="black" />
            </Link>
            <Link href="/contact">
              <ButtonRev param="Contact" size="medium" color="black" />
            </Link>
          </div>
          <div>
            <p className="tag-bold">Social media</p>
            <Link href="#">
              <ButtonRev param="Instagram" size="medium" color="black" />
            </Link>
            <Link href="#">
              <ButtonRev param="LinkedIn" size="medium" color="black" />
            </Link>
            <Link href="#">
              <ButtonRev param="TikTok" size="medium" color="black" />
            </Link>
          </div>
          <div>
            <p className="tag-bold">Products</p>
            <Link href="/products">
              <ButtonRev param="Men" size="medium" color="black" />
            </Link>
            <Link href="/products">
              <ButtonRev param="Women" size="medium" color="black" />
            </Link>
          </div>
        </div>
        <div className="footer-container-right">
          <h2>LUIS DE LAGASIN</h2>
          <div>
            <p>We have been creating art since 1996</p>
            <p>Life, passion, tradition for every art lover</p>
          </div>
        </div>
      </div>
      <div className="footer-container-down">
        <div>
          <Link href="/privacy-policy">
            <ButtonRev param="Privacy Policy" size="medium" color="black" />
          </Link>
          <Link href="/terms-of-use">
            <ButtonRev param="Terms of Use" size="medium" color="black" />
          </Link>
        </div>
        <p>© 2024 Luis de Lagasin</p>
      </div>
    </footer>
  );
};

export default Footer;
