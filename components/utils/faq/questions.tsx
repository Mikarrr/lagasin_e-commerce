import React from "react";
import "./style.css";

interface FaqQuestionProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle: () => void; // Function to trigger when the question is clicked
}

const Question: React.FC<FaqQuestionProps> = ({
  question,
  answer,
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="faq-questions">
      <button onClick={onToggle} aria-expanded={isOpen}>
        <p className={`text-l ${isOpen ? "open" : ""}`}>{question}</p>
        <svg
          width="18"
          height="18"
          viewBox="0 0 11 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`arrow-icon ${isOpen ? "rotate" : ""}`}
        >
          <path
            d="M0.336914 0.77417L5.23297 4.80877L10.129 0.77417"
            stroke="gray"
            className={`${isOpen ? "open" : ""}`}
          />
        </svg>
      </button>
      <p className={`faq-answer ${isOpen ? "show" : "hide"}`}>{answer}</p>
      <hr className={`faq-line ${isOpen ? "expand" : ""}`} />
    </div>
  );
};

export default Question;
