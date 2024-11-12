'use client';

import Link from "next/link";
import Image from "next/image";
import facebookLogo from "@/public/icons/Logo--facebook.svg";
import instagramLogo from "@/public/icons/Logo--instagram.svg";
import linkedinLogo from "@/public/icons/Logo--linkedin.svg";
import pinterestLogo from "@/public/icons/Logo--pinterest.svg";
import skypeLogo from "@/public/icons/Logo--skype.svg";
import twitterLogo from "@/public/icons/Logo--twitter.svg";

export default function Footer() {
  return (
    <footer style={{ position: "sticky" }}>
      <div className="foot">
        <div className="adress">
          <h1 className="foot-name">Modern Furniture Pacific</h1>
          <address>
            <p>21st St, Brooklyn</p>
            <p>New York City</p>
            <p>United States of America</p>
            <p>112 15</p>
          </address>
        </div>
        <div className="socials">
          <h2>Social links</h2>
          <Image src={facebookLogo} alt="Facebook" />
          <Image src={instagramLogo} alt="Instagram" />
          <Image src={twitterLogo} alt="Twitter" />
          <Image src={linkedinLogo} alt="LinkedIn" />
          <Image src={pinterestLogo} alt="Pinterest" />
          <Image src={skypeLogo} alt="Skype" />
        </div>
        <nav className="menu">
          <h2>Menu</h2>
          <Link href="/products">All products</Link>
          <Link href="/products/type/best-sellers">Best sellers</Link>
          <Link href="/products/type/new-arrivals">New arrivals</Link>
          <Link href="/products/type/popular-this-week">Popular this week</Link>
          <Link href="/products">Recently viewed</Link>
        </nav>
        <nav className="categories">
          <h2>Categories</h2>
          <Link href="/products/category/chairs">Chairs</Link>
          <Link href="/products/category/lamps">Lamps</Link>
          <Link href="/products/category/pots">Plant Pots</Link>
          <Link href="/products/category/sofas">Sofas</Link>
          <Link href="/products/category/tables">Tables</Link>
        </nav>
        <nav className="company">
          <h2>Our company</h2>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/">Return policy</Link>
          <Link href="/">Privacy</Link>
          <Link href="/">Vacancies</Link>
        </nav>
        <div className="credit">
          <h3>Copyright {new Date().getFullYear()} Modern Furniture Pacific LLC</h3>
        </div>
      </div>
    </footer>
  );
}