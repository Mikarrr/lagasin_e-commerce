"use client";

import Image from "next/image";
import React, { useState } from "react";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const SortFilter = ({
  onSortChange,
}: {
  onSortChange: (sortOption: SortOption) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortOption: SortOption) => {
    onSortChange(sortOption);
    setIsOpen(false);
  };

  return (
    <div className="sort-filter">
      <div className="sort-select-btn" onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/sort.svg"
          alt="sort-icon"
          width={15}
          height={15}
          loading="lazy"
          className={`sort-icon ${isOpen ? "rotated" : ""}`}
        />
        <span>Sort</span>
      </div>

      {/* Niestandardowa lista rozwijana */}
      {isOpen && (
        <div className="sort-options">
          <div
            className="sort-option"
            onClick={() => handleSortChange("name-asc")}
          >
            <p>Name (A-Z)</p>
          </div>
          <div
            className="sort-option"
            onClick={() => handleSortChange("name-desc")}
          >
            <p>Name (Z-A)</p>
          </div>
          <div
            className="sort-option"
            onClick={() => handleSortChange("price-asc")}
          >
            <p>Price (Low to High)</p>
          </div>
          <div
            className="sort-option"
            onClick={() => handleSortChange("price-desc")}
          >
            <p>Price (High to Low)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortFilter;
