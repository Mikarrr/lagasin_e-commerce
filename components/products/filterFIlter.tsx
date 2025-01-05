import React, { useState } from "react";
import "./style.css"; // Importujemy styl dla popupu
import Image from "next/image";
import ButtonRevFill from "../utils/buttonRevFill/page";

const Filter = ({
  onPriceRangeChange,
}: {
  onPriceRangeChange: (min: number | null, max: number | null) => void;
}) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = () => {
    onPriceRangeChange(minPrice, maxPrice);
    setIsOpen(false);
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const closeFilter = () => {
    setIsOpen(false);
  };

  return (
    <div className="filter-container">
      <button className="filter-toggle" onClick={toggleFilter}>
        <Image
          src="/filter.svg"
          alt="filter-icon"
          width={20}
          height={20}
          loading="lazy"
          className={`filter-icon ${isOpen ? "rotated" : ""}`}
        />
        <span>Filter</span>
      </button>

      <div className={`price-filter ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeFilter}>
          <Image
            src="/close.svg"
            alt="filter-icon"
            width={18}
            height={18}
            loading="lazy"
          />
        </button>
        <h3>FILTER</h3>
        <div>
          <label htmlFor="price">Price range</label>
          <input
            type="number"
            placeholder="Min price"
            value={minPrice || ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? parseInt(e.target.value) : null)
            }
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice || ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseInt(e.target.value) : null)
            }
          />
        </div>
        <ButtonRevFill
          param="APPLY FILTER"
          color="white"
          bgcolor="black"
          onClick={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default Filter;
