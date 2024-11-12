// src/types/index.ts

export interface Product {
    id: number;
    product_name: string;
    price: number;
    image: string;
    date_added: string;
  }
  
  export interface DropDownOption {
    value: string;
    label: string;
  }
  
  export interface DropDownProps {
    label: string;
    options: DropDownOption[];
    selectedOption: string;
    onOptionChange: (value: string) => void;
  }
  
  export interface ProductsProps {
    apiEndpoint: string;
    pageHeader: string;
  }
  
  export interface FilterProps {
    onPriceChange: (value: string) => void;
    onSortingChange: (value: string) => void;
  }