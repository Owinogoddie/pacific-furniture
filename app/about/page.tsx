// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import Brand from "@/components/Brand";
import Esign from "@/components/Esignup";
import AboutUsImg1 from "@/public/img/about-us-img-1.webp";
import AboutUsImg2 from "@/public/img/about-us-img-2.webp";
import "react-loading-skeleton/dist/skeleton.css";
import { FC } from "react";

export const metadata = {
  title: "About | Modern Furniture Pacific",
};

const About: FC = () => {
  return (
    <div className="about-us">
      <div className="about-title">
        <h1>
          A brand built on the love of craftmanship, quality, and outstanding
          customer service
        </h1>
      </div>
      <div className="about-1st">
        <div className="about-idea">
          <h2>It started with a small idea</h2>
          <p>
            A global brand with local beginnings, our story began in a small
            studio in South London in early 2014.
          </p>
          <div className="about-viewBtn">
            <Link href="/products">
              <button id="about-view-colBtn">View Collection</button>
            </Link>
          </div>
        </div>
        <div className="about-img">
          <Image
            src={AboutUsImg1}
            alt="About us image"
            placeholder="blur"
            priority
          />
        </div>
      </div>
      <div className="about-2nd">
        <div className="about-img">
          <Image
            src={AboutUsImg2}
            alt="About us image"
            placeholder="blur"
            priority
          />
        </div>
        <div className="about-brand">
          <h2>Our service isn&apos;t just personal; it&apos;s actually hyper personally exquisite</h2>
          <p>
            When we started Furniture , the idea was simple: make high-quality
            furniture affordable and available to the mass market.
          </p>
          <p>
            Handmade and lovingly crafted furniture and homeware is what we live,
            breathe, and design. Our Nyeri boutique has become a hub for the
            Nyeri interior design community.
          </p>
          <div className="about-getBtn">
            <Link href="/contact">
              <button id="about-getInTouchBtn">Get in touch</button>
            </Link>
          </div>
        </div>
      </div>
      <Brand />
      <Esign />
    </div>
  );
};

export default About;
