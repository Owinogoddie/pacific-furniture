import { NextRequest, NextResponse } from 'next/server';
import { base, generateAccessToken, handleResponse } from '@/lib/paypal';

interface CartItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

async function createOrder(cart: CartItem[]) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",
    purchase_units: cart.map((item) => ({
      amount: {
        currency_code: "GBP",
        value: `${item.quantity * item.price}`,
        breakdown: {
          item_total: {
            currency_code: "GBP",
            value: `${item.quantity * item.price}`,
          },
        },
      },
      payee: {
        email_address: "sales@pacific.shop",
        merchant_id: "7HWJGUYZ7CYC2",
      },
      items: [
        {
          name: `${item.product_name}`,
          quantity: `${item.quantity}`,
          unit_amount: {
            currency_code: "GBP",
            value: `${item.price}`,
          },
        },
      ],
      reference_id: `${item.id}`,
    })),
    payment_source: {
      paypal: {
        experience_context: {
          brand_name: "Modern Furniture Pacific",
          return_url: "http://localhost:3000/",
          cancel_url: "http://localhost:3000/",
        },
      },
    },
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cart } = body;

    if (!cart || !Array.isArray(cart)) {
      return NextResponse.json(
        { error: "Invalid cart data" },
        { status: 400 }
      );
    }

    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    return NextResponse.json(jsonResponse, { status: httpStatusCode });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Failed to create order." },
      { status: 500 }
    );
  }
}