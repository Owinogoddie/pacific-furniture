'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Filter from "./FilterMenu";

interface Product {
  id: number;
  product_name: string;
  price: number;
  image: string;
  date_added: string;
}

interface ProductsProps {
  apiEndpoint: string;
  pageHeader: string;
}

type FilterFunction = (a: Product, b: Product) => number;

interface FilterFunctions {
  [key: string]: FilterFunction;
}

export default function Products({ apiEndpoint, pageHeader }: ProductsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [selectedPriceOption, setSelectedPriceOption] = useState<string>("");
  const [selectedSortingOption, setSelectedSortingOption] = useState<string>("");
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [noProduct, setNoProduct] = useState<boolean>(false);

  const filterFunctions = useMemo<FilterFunctions>(() => ({
    "low-to-high": (a: Product, b: Product) => a.price - b.price,
    "high-to-low": (a: Product, b: Product) => b.price - a.price,
    "alphabitical_a-z": (a: Product, b: Product) => a.product_name.localeCompare(b.product_name),
    "alphabitical_z-a": (a: Product, b: Product) => b.product_name.localeCompare(a.product_name),
    "new": (a: Product, b: Product) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime(),
    "old": (a: Product, b: Product) => new Date(a.date_added).getTime() - new Date(b.date_added).getTime(),
  }), []);

  const filteringProducts = useCallback(() => {
    const filteredProducts = [...filterProducts];
    if (selectedPriceOption && filterFunctions[selectedPriceOption]) {
      filteredProducts.sort(filterFunctions[selectedPriceOption]);
    } else {
      filteredProducts.sort((a, b) => a.id - b.id);
    }

    if (selectedSortingOption && filterFunctions[selectedSortingOption]) {
      filteredProducts.sort(filterFunctions[selectedSortingOption]);
    }
    setDisplayedProducts(filteredProducts.slice(0, displayedProducts.length));
    setFilterProducts(filteredProducts);
  }, [filterProducts, selectedPriceOption, selectedSortingOption, displayedProducts.length, filterFunctions]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data: { data: Product[] }) => {
        const sortedProducts = data.data.sort((a, b) => a.id - b.id);
        setProducts(data.data);
        setFilterProducts(sortedProducts);
        setDisplayedProducts(sortedProducts.slice(0, 12));
        setLoading(false);
        setNoProduct(sortedProducts.length === 0);
      });
  }, [apiEndpoint]);

  useEffect(() => {
    filteringProducts();
  }, [selectedPriceOption, selectedSortingOption, filteringProducts]);

  const loadProducts = () => {
    const currentProducts = displayedProducts.length;
    const remainingProducts = filterProducts.slice(
      currentProducts,
      currentProducts + 12
    );
    setDisplayedProducts([...displayedProducts, ...remainingProducts]);
  };

  return (
    <>
      {noProduct ? (
        <div className="no-product">
          <h1>
            We are sorry,
            <br />
            there are no products found that fits your search
          </h1>
        </div>
      ) : (
        <>
          <div className="page-header">
            <div>
              <h1>{pageHeader}</h1>
            </div>
            <div>
              <Filter
                onPriceChange={setSelectedPriceOption}
                onSortingChange={setSelectedSortingOption}
              />
            </div>
          </div>
          {loading ? (
            <div className="all-products">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="products">
                  <Skeleton className="mobile-skeleton" height={"12.5em"} />
                  <Skeleton className="mobile-skeleton" width={292} />
                  <Skeleton className="mobile-skeleton" width={60} />
                </div>
              ))}
            </div>
          ) : (
            <div className="all-products">
              {displayedProducts.map((product) => (
                <div key={product.id} className="products">
                  <Link
                    href={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Image
                      src={product.image}
                      alt="Modern Furniture Pacific Product"
                      width={405}
                      height={475}
                      blurDataURL="data:image/png>;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8+R8AAvcB+vBGZskAAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                    <br />
                    {product.product_name}
                  </Link>
                  <br />Ksh{product.price}
                </div>
              ))}
            </div>
          )}
          {displayedProducts.length < products.length && (
            <div className="load-button">
              <button id="loadBtn" onClick={loadProducts} disabled={loading}>
                Load
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}