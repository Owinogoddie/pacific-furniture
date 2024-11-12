"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import RemoveIcon from "@/public/img/remove-icon.svg";

interface CartItem {
  productId: string;
  product_name: string;
  image: string;
  price: number;
  count: number;
}

// export const metadata: Metadata = {
//   title: "Cart | Modern Furniture Pacific",
// };

export default function Cart() {
  const { updateItemCount, undoRemove, cart, calculateSubtotal } = useCart();
  const { items } = cart;
  const user = useUser();

  const handleIncrease = (productId: string) => {
    const { updatedItems, currentCount } = updateItemCount(productId, 1);
    const itemName = updatedItems.find(
      (item) => item.productId === productId
    )?.product_name;
    if (currentCount >= 10) {
      toast.info(`You can't add more than 10 of ${itemName}s.`);
    }
  };

  const handleDecrease = (productId: string) => {
    const { currentCount } = updateItemCount(productId, -1);
    const originalItem = cart.items.find(
      (item) => item.productId === productId
    );
    const itemName = originalItem?.product_name;

    if (currentCount <= 1) {
      toast.warning(`You have removed ${itemName} from your cart.`, {
        action: {
          label: "Undo",
          onClick: () => undoRemove(productId),
        },
      });
    }
  };

  const handleRemove = (productId: string) => {
    const originalItem = cart.items.find(
      (item) => item.productId === productId
    );
    const itemName = originalItem?.product_name;
    updateItemCount(
      productId,
      -cart.items.find((item) => item.productId === productId)!.count
    );
    toast.warning(`You have removed ${itemName} from your cart.`, {
      action: {
        label: "Undo",
        onClick: () => undoRemove(productId),
      },
    });
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-headers">
          <a>Product</a>
          <div className="cart-headers-total">
            <a>Quantity</a>
            <a>Total</a>
          </div>
        </div>
        <div>
          {items.length === 0 ? (
            <p className="empty-cart">Your shopping cart is empty</p>
          ) : (
            items.map((item: CartItem) => (
              <div key={item.productId} className="cart-product">
                <div>
                  <div className="cart-product-container">
                    <Image
                      src={item.image}
                      alt={item.product_name}
                      width={100}
                      height={150}
                    />
                  </div>
                  <div className="cart-product-description">
                    <h1>{item.product_name}</h1>
                    <p>
                      Beautiful and simple, this one is for the classic
                      collections
                    </p>
                    <a>Ksh{item.price}</a>
                  </div>
                </div>
                <div className="price-quantity">
                  <div className="counter">
                    <button onClick={() => handleDecrease(item.productId)}>
                      -
                    </button>
                    <p>{item.count}</p>
                    <button onClick={() => handleIncrease(item.productId)}>
                      +
                    </button>
                  </div>
                  <button
                    className="removeBtn"
                    onClick={() => handleRemove(item.productId)}
                  >
                    <Image src={RemoveIcon} alt="Remove item" />
                  </button>
                  <a>Ksh{item.price * item.count}</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <div className="checkout-Btn">
          {items.length > 0 && (
            <>
              <h2 className="checkout-sub">
                Subtotal <a>Ksh{calculateSubtotal()}</a>
              </h2>
              <button
                onClick={() =>
                  user
                    ? undefined
                    : toast.info("You need to sign up or log in to checkout")
                }
                className="checkoutBtn"
              >
                <Link href={"/checkout"}>Go to checkout</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}