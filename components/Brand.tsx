'use client';

import Image from "next/image";

// NEED:: to properly type your SVG imports
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

import Delivery from "@/public/icons/Delivery.svg";
import Checkmark from "@/public/icons/Checkmark--outline.svg";
import Purchase from "@/public/icons/Purchase.svg";
import Sprout from "@/public/icons/Sprout.svg";

interface BrandFeature {
  icon: StaticImageData;
  title: string;
  description: string;
}

export default function Brand() {
  const brandFeatures: BrandFeature[] = [
    {
      icon: Delivery,
      title: "Next day as standard",
      description: "Order before 3pm and get your order the next day as standard"
    },
    {
      icon: Checkmark,
      title: "Made by true artisans",
      description: "Handmade crafted goods made with real passion and craftmanship"
    },
    {
      icon: Purchase,
      title: "Unbeatable prices",
      description: "For our materials and quality you won't find better prices anywhere"
    },
    {
      icon: Sprout,
      title: "Recycled packaging",
      description: "We use 100% recycled packaging to ensure our footprint is more manageable"
    }
  ];

  return (
    <section className="brand-section">
      <div className="brand-info">
        <h2>What makes our brand different</h2>
      </div>
      
      <div className="brand-info-grid">
        {brandFeatures.map((feature, index) => (
          <div key={index} className={`grid-${index + 1}`}>
            <Image 
              src={feature.icon} 
              alt={feature.title}
              width={48}  // Adjust these values based on your needs
              height={48}
              quality={100}
            />
            <h2>{feature.title}</h2>
            <h3>{feature.description}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}