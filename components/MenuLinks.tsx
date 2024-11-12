// components/MenuLinks.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Product } from "@/types/product";

interface MenuLinksProps {
  apiEndpoint: string;
  pageHeader: string;
}

export default function MenuLinks({ apiEndpoint, pageHeader }: MenuLinksProps) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        
        const sortedProducts = data.data.sort(
          (a: Product, b: Product) => 
            new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
        );
        
        setProducts(data.data);
        setFilterProducts(sortedProducts);
        setDisplayedProducts(sortedProducts.slice(0, 12));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiEndpoint]);

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
      <div className="page-header">
        <div>
          <h1>{pageHeader}</h1>
        </div>
      </div>
      
      {!loading ? (
        <>
          <div className="all-products">
            {displayedProducts.map((product) => (
              <div key={product.id} className="products">
                <Link
                  href={`/products/pdp/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src={product.image}
                    alt="Modern Furniture Pacific Product"
                    width={405}
                    height={475}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8+R8AAvcB+vBGZskAAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                  <br />
                  {product.product_name}
                </Link>
                <br />Ksh{product.price}
              </div>
            ))}
          </div>
          
          {displayedProducts.length < products.length && (
            <div className="load-button">
              <button 
                id="loadBtn" 
                onClick={loadProducts} 
                disabled={loading}
              >
                Load
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="all-products">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="products">
              <Skeleton className="mobile-skeleton" height={"12em"} />
              <Skeleton className="mobile-skeleton" width={292} />
              <Skeleton className="mobile-skeleton" width={60} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}