// src/components/FilterMenu.tsx
'use client';

import { useState } from "react";
import DropDown from "@/components/DropMenu";
import { FilterProps, DropDownOption } from "@/types";

export default function Filter({ onPriceChange, onSortingChange }: FilterProps) {
  const [priceOption, setPriceOption] = useState<string>("");
  const [sortingOption, setSortingOption] = useState<string>("");

  const price: DropDownOption[] = [
    { value: "low-to-high", label: "Price: Low to High" },
    { value: "high-to-low", label: "Price: High to Low" },
  ];

  const sorting: DropDownOption[] = [
    { value: "new", label: "New" },
    { value: "old", label: "Old" },
    { value: "alphabitical_a-z", label: "Alphabitical A-Z" },
    { value: "alphabitical_z-a", label: "Alphabitical Z-A" },
  ];

  const handlePriceChange = (value: string): void => {
    setPriceOption(value);
    onPriceChange(value);
    setSortingOption("");
    onSortingChange("");
  };

  const handleSortingChange = (value: string): void => {
    setSortingOption(value);
    onSortingChange(value);
    setPriceOption("");
    onPriceChange("");
  };

  return (
    <div className="filter">
      <DropDown
        options={price}
        label="Price"
        selectedOption={priceOption}
        onOptionChange={handlePriceChange}
      />
      <DropDown
        options={sorting}
        label="Sort by"
        selectedOption={sortingOption}
        onOptionChange={handleSortingChange}
      />
    </div>
  );
}