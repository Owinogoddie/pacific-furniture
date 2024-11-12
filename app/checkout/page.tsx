'use client'
// app/checkout/page.tsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/context/CartContext";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect, useCallback, FC } from "react";
import Image from "next/image";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";



const Checkout: FC = () => {
  const { cart, calculateSubtotal, resetCart } = useCart();
  const user = useUser();
  const { items } = cart;
  const [transaction, setTransaction] = useState<string | undefined>();
  const [totalPrice] = useState<number>(calculateSubtotal());
  //   const router = useRouter();

  const insertOrder = useCallback(async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            transaction_id: transaction,
            user_id: user?.id,
            total_price: totalPrice,
          },
        ]),
      });

      if (!response.ok) {
        console.error("Failed to insert order:", response.statusText);
      }
    } catch (error) {
      console.error("Error inserting order:", error);
    }

    try {
      const response = await fetch("/api/order_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          items.map((item) => ({
            order_id: transaction,
            product_id: item.productId,
            quantity: item.count,
            unit_price: item.price,
          }))
        ),
      });

      if (response.ok) {
        resetCart();
      } else {
        console.error("Failed to insert order items:", response.statusText);
      }
    } catch (error) {
      console.error("Error inserting order items:", error);
    }
  }, [transaction, totalPrice, user?.id, items, resetCart]);

  useEffect(() => {
    if (transaction) {
      insertOrder();
    }
  }, [transaction, insertOrder]);

  if (items.length === 0) {
    return (
      <div className="checkout">
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-summary">
        <h1>Summary</h1>
        <div className="checkout-cart">
          <div className="checkout-cart-headers">
            <a>Product</a>
          </div>
          <div>
            {items.map((item) => (
              <div key={item.productId} className="checkout-cart-product">
                <div>
                  <div className="checkout-cart-product-container">
                    <Image
                      src={item.image}
                      alt={item.product_name}
                      width={100}
                      height={150}
                    />
                    <div className="checkout-cart-product-description">
                      <h1>{item.product_name}</h1>
                      <a>Ksh{item.price}</a>
                    </div>
                  </div>
                </div>
                <div className="checkout-price-quantity">
                  <p>
                    Quantity
                    <br />
                    {item.count}
                  </p>
                  <p>
                    Total
                    <br />Ksh{item.price * item.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="checkout-pay">
        <h2>Subtotal Ksh{calculateSubtotal()}</h2>
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            currency: "GBP",
            intent: "capture",
          }}
        >
          <PayPalButtons
            createOrder={async () => {
              try {
                const cart = items.map((item) => ({
                  product_name: item.product_name,
                  id: item.productId,
                  quantity: item.count.toString(),
                  price: item.price,
                  total_price: calculateSubtotal(),
                }));

                const response = await fetch("/api/paypal/createorder", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ cart }),
                });

                const orderData = await response.json();
                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);
                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.log(error);
                toast.error("Could not initiate PayPal Checkout...");
              }
            }}
            onApprove={async (data, actions) => {
              try {
                const response = await fetch(
                  `/api/paypal/captureorder?orderID=${data.orderID}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                const orderData = await response.json();
                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart();
                } else if (errorDetail) {
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                  );
                } else {
                  const transaction =
                    orderData.purchase_units[0].payments.captures[0];
                  toast.success(
                    `Transaction ${transaction.status}: ${transaction.id}.`
                  );
                  setTransaction(transaction.id);
                }
              } catch (error) {
                console.log(error);

                toast.error(
                  "Sorry, your transaction could not be processed..."
                );
              }
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Checkout;
