'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Product {
  id: number;
  product_name: string;
  price: number;
  image: string;
  date_added: string;
}

interface OurProductsProps {
  resetCount?: () => void;
}

export default function OurProducts({ resetCount }: OurProductsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?search=*")
      .then((res) => res.json())
      .then((data: { data: Product[] }) => {
        const sortedProducts = data.data.sort(
          (a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
        );
        setProducts(sortedProducts);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/popular")
      .then((res) => res.json())
      .then((data: { data: Product[] }) => {
        setPopularProducts(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="new-ceramics">
        <a>New products</a>
        {loading ? (
          <div className="new-products">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="product">
                <Skeleton className="mobile-skeleton" height={"50vmin"} />
                <Skeleton className="mobile-skeleton" width={292} />
                <Skeleton className="mobile-skeleton" width={60} />
              </div>
            ))}
          </div>
        ) : (
          <div className="new-products">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="product">
                <Link
                  onClick={resetCount}
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
      </div>
      <div className="view-col">
        <Link href={"/products"}>
          <button id="viewCol">View collection</button>
        </Link>
      </div>
      <div className="popular">
        <a>Our popular products</a>
        {loading ? (
          <div className="popular-products">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="our-products">
                <Skeleton className="mobile-skeleton" width={'100%'} height={"20em"} />
                <Skeleton className="mobile-skeleton" width={'12ch'} />
                <Skeleton className="mobile-skeleton" width={60} />
              </div>
            ))}
          </div>
        ) : (
          <div className="popular-products">
            {popularProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="our-product">
                <Link
                  onClick={resetCount}
                  href={`/products/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src={product.image}
                    alt="Modern Furniture Pacific Product"
                    width={405}
                    height={475}
                    sizes="100vw"
                    blurDataURL="data:image/png>;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8+R8AAvcB+vBGZskAAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                  {product.product_name}
                </Link>
                <br />Ksh{product.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="view-pop-col">
        <Link href={"/products"}>
          <button id="viewPopCol">View collection</button>
        </Link>
      </div>
    </>
  );
}