"use client";

import { useSearch } from "@/context/SearchContext";
import Products from "@/components/Products";

export default function All() {
  const { searchQuery } = useSearch();
  const all = `/api/products?search=${searchQuery}`;

  return <Products pageHeader="All products" apiEndpoint={all} />;
}
