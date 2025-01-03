"use client";

import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ButtonRev from "../buttonRev/page";
import Image from "next/image";
import Link from "next/link";
import { LineItem } from "@/app/api/types/checkout";

const mainMenuLinks = [
  { path: "/about-us", label: "ABOUT US" },
  { path: "/products", label: "PRODUCTS" },
  { path: "/fashion-show", label: "FASHION SHOW" },
  { path: "/contact", label: "CONTACT" },
];

const socialMediaLinks = [
  {
    href: "https://www.linkedin.com/in/mikołaj-karwacki-786a8b233/",
    imgSrc: "/linked.svg",
    alt: "LinkedIn",
  },
  {
    href: "/",
    imgSrc: "/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "/",
    imgSrc: "/tiktok.svg",
    alt: "Behance",
  },
];

const shopIcons = [
  {
    href: "/search",
    imgSrc: "/search.svg",
    alt: "Search",
  },
  {
    href: "/login",
    imgSrc: "/account.svg",
    alt: "Account",
  },
  {
    href: "/cart",
    imgSrc: "/cart.svg",
    alt: "Cart",
  },
];

const MenuUpRev = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef<GSAPTimeline | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      const cartItems = storedCart ? JSON.parse(storedCart) : [];
      const totalCount = cartItems.reduce(
        (total: number, item: LineItem) => total + item.quantity,
        0
      );
      setCartCount(totalCount);
    };

    // Inicjalizuj licznik na początku
    updateCartCount();

    // Nasłuchuj zdarzenia `cartUpdated`
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(
    () => {
      gsap.set(".menu-main-link-wrapper", { y: 85 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(
          ".menu-overlay",
          {
            duration: 0.5,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "ease-in-out",
          },
          0
        )
        .to(
          " .menu-main-link-wrapper",
          { y: 0, duration: 0.4, stagger: 0.05, ease: "power4.inOut" },
          0
        );
    },
    { scope: container }
  );

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isMenuOpen]);

  return (
    <header
      className={`menu-wrapper ${isScrolled ? "scrolled" : ""}`}
      ref={container}
    >
      <div className="menu-header">
        <div className="menu-logo">
          <Link href="/">LUIS DE LAGASIN</Link>
        </div>
        <div className="menu-header-center">
          <div className="menu-main-links">
            {mainMenuLinks.map((link, index) => (
              <div className="menu-main-link-item" key={index}>
                <Link href={link.path} className="menu-main-link">
                  <ButtonRev param={link.label} size="small" color="black" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="menu-header-right">
          <div className="menu-icons">
            <ul className="menu-icons-list">
              {shopIcons.map((link, index) => (
                <li
                  key={index}
                  className={link.alt === "Cart" ? "cart-icon" : ""}
                >
                  <Link href={link.href}>
                    <Image
                      src={link.imgSrc}
                      alt={link.alt}
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                    {link.alt === "Cart" && cartCount > 0 && (
                      <span className="cart-count">{cartCount}</span> // Wyświetlanie ilości przedmiotów
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="menu-toggle-button" onClick={toggleMenu}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <nav className="menu-overlay">
        <div className="menu-overlay-header">
          <div className="menu-close-button" onClick={toggleMenu}>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="menu-left">
          <div className="menu-links">
            {mainMenuLinks.map((link, index) => (
              <div className="menu-main-link-item" key={index}>
                <div className="menu-main-link-wrapper" onClick={toggleMenu}>
                  <Link href={link.path} className="menu-main-link">
                    <ButtonRev param={link.label} size="xlarge" color="white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-social">
            <ul className="menu-social-list">
              {socialMediaLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    rel="nofollow"
                    target="_blank"
                    aria-label={link.alt}
                  >
                    <Image
                      src={link.imgSrc}
                      alt={link.alt}
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="menu-right">
          <div className="menu-contact-info">
            <a href="mailto:karwacki.mikolaj123@gmail.com">
              infolagasin@lagasin.com
            </a>
            <a href="tel:724798688">(+48) 456 786 675</a>
            <p>Poznań, Poland</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MenuUpRev;
