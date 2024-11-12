'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { usePathname, useRouter } from "next/navigation";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import searchIcon from "@/public/icons/Search.svg";
import cartIcon from "@/public/icons/Shopping--cart.svg";
import userIcon from "@/public/icons/User--avatar.svg";
import { deleteCookie } from "cookies-next";

// interface CartItem {
//   productId: number;
//   count: number;
// }

// interface Cart {
//   count: number;
//   items: CartItem[];
// }

export default function Header() {
  const { cart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const { searchQuery, updateSearchQuery } = useSearch();
  const [accountModal, setAccountModal] = useState<boolean>(false);
  const [isSearchVisible, setSearchVisible] = useState<boolean>(false);
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    console.log(error)
    deleteCookie("userId");
    router.refresh();
  };

  const handleInputQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    updateSearchQuery(query);
  };

  const handleCartIconClick = () => {
    const queryString = cart.items
      .map((item) => `${item.productId}-${item.count}`)
      .join(",");
    
    router.push(`/cart?count=${cart.count}&items=${queryString}`);
  };

  useEffect(() => {
    setAccountModal(false);
    if (!pathname?.includes("/products")) {
      setSearchVisible(false);
      updateSearchQuery("");
    }
  }, [pathname, updateSearchQuery]);

  const handleSearchIconClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (!isSearchVisible && trimmedQuery !== "") {
      updateSearchQuery(trimmedQuery);
    } else if (trimmedQuery !== "") {
      setSearchVisible(true);
      router.push(`/products?searchQuery=${trimmedQuery}`);
      return;
    }
    setSearchVisible(!isSearchVisible);
  };

  const handleAllPageLinkClick = () => {
    updateSearchQuery("");
    setSearchVisible(false);
    router.push("/products");
  };

  const handleAccountModal = () => {
    setAccountModal(!accountModal);
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      accountModal &&
      !target.closest(".account-modal") &&
      !target.closest(".account")
    ) {
      setAccountModal(false);
    }
  }, [accountModal]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);
 

  return (
    <>
      <div className="name">
        <h1>
          <Link href="/">Pacific</Link>
        </h1>
      </div>
      <div className="top-right">
        <h2 className="about">
          <Link href="/about">About us</Link>
        </h2>
        <h2 className="contact">
          <Link href="/contact">Contact</Link>
        </h2>
        {isSearchVisible && (
          <div className="search-input-container">
            <input
              onChange={handleInputQuery}
              value={searchQuery}
              type="text"
              name="search"
              placeholder="Search for an item"
            />
          </div>
        )}
        <div className="searchIcon">
          <Image
            src={searchIcon}
            onClick={handleSearchIconClick}
            alt="Search"
          />
          <Image src={cartIcon} onClick={handleCartIconClick} alt="Cart" />
          {cart.count > 0 && (
            <span onClick={handleCartIconClick} className="cart-count">
              {cart.count}
            </span>
          )}
          <div className="account">
            <Image src={userIcon} alt="Account" onClick={handleAccountModal} />
            <div className={`account-modal ${accountModal ? "active" : ""}`}>
              {user ? (
                <div className="account-info">
                  <div className="account-login">
                    {user.user_metadata.full_name}
                  </div>
                  <Link href="/account">
                    <div className="account-login">Account</div>
                  </Link>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              ) : (
                <div className="account-signup">
                  <Link href="/login">
                    <div className="account-login">Log in</div>
                  </Link>
                  <Link href="/signup">
                    <div className="account-login">Sign up</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav className="bottom-nav">
        <h2>
          <div>
            <Link href="/products">
              <span onClick={handleAllPageLinkClick}>All products</span>
            </Link>
          </div>
        </h2>
        <h2>
          <Link href="/products/category/chairs">Chairs</Link>
        </h2>
        <h2>
          <Link href="/products/category/tables">Tables</Link>
        </h2>
        <h2>
          <Link href="/products/category/sofas">Sofas</Link>
        </h2>
        <h2>
          <Link href="/products/category/lamps">Lamps</Link>
        </h2>
        <h2>
          <Link href="/products/category/crockery">Crockery</Link>
        </h2>
        <h2>
          <Link href="/products/category/ceramics">Ceramics</Link>
        </h2>
        <h2>
          <Link href="/products/category/plant-pots">Plant pots</Link>
        </h2>
        <h2>
          <Link href="/products/category/storage">Storage</Link>
        </h2>
        <h2>
          <Link href="/products/category/seating">Seatings</Link>
        </h2>
        <h2>
          <Link href="/products/category/beds">Beds</Link>
        </h2>
      </nav>
    </>
  );
}