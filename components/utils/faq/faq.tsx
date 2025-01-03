"use client";

import React, { useState } from "react";
import Question from "./questions";

interface FaqData {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // To track the index of the currently open question

  const faqData: FaqData[] = [
    {
      question: "What sizes are available in your collections?",
      answer:
        "Our collections include standard sizes from XS to XL, and select models are also available in plus sizes. We recommend checking the size guide provided with each product.",
    },
    {
      question: "Can I return a product if it doesn't meet my expectations?",
      answer:
        "Yes, we offer a return policy for products that do not meet your expectations. You can return items within 30 days of purchase as long as they are unworn and in their original condition. Please check our returns page for full details and instructions.",
    },
    {
      question: "What materials are used in your clothing?",
      answer:
        "Our clothing is made from a variety of high-quality materials, including organic cotton, sustainable wool, and eco-friendly blends. We carefully select materials that ensure comfort, durability, and minimal environmental impact. Refer to individual product pages for detailed material information.",
    },
    {
      question: "How long does it take to ship an order?",
      answer:
        "Shipping times depend on your location and the shipping method chosen at checkout. Typically, standard shipping takes 3-5 business days, while expedited shipping may take 1-2 business days. You will receive a tracking number once your order has been dispatched.",
    },
    {
      question: "What sizes are available in your collections?",
      answer:
        "Our collections include standard sizes from XS to XL, and select models are also available in plus sizes. We recommend checking the size guide provided with each product to ensure the best fit for you.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close state
  };

  return (
    <section className="faq-container">
      <div className="faq-container-left">
        <div>
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
          <p>
            Find answers to frequently asked questions about shopping with Luis
            de Lagasin
          </p>
        </div>
        <div className="faq-questions-container">
          {faqData.map((faq, index) => (
            <Question
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex} // Only the open question will have isOpen set to true
              onToggle={() => handleToggle(index)} // Pass the handler to each Question component
            />
          ))}
        </div>
      </div>
      <div className="faq-container-right">
        <div className="image-faq-small"></div>
      </div>
    </section>
  );
};

export default FaqSection;
