'use client';

import { DropDownProps } from "@/types";

export default function DropDown({
  label,
  options,
  selectedOption,
  onOptionChange,
}: DropDownProps) {
  const optionItems = Array.isArray(options) ? options : [];
  
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onOptionChange(event.target.value);
  }

  return (
    <div className="drop-down">
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">{label}</option>
        {optionItems.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}