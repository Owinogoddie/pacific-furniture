import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// interface Product {
//   id: string;
//   product_name: string;
//   price: number;
//   image: string;
//   date_added: string;
// }

interface PopularProduct {
  product_id: string;
  views_count: number;
  products: {
    id: string;
    product_name: string;
    price: number;
    image: string;
    date_added: string;
  };
}

export async function GET() {
  const { data: popular_products, error } = await supabase
    .from("popular_products")
    .select(`
      product_id,
      views_count,
      products:product_id (
        id,
        product_name,
        price,
        image,
        date_added
      )
    `)
    .order('views_count', { ascending: false })
    .limit(4);

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // First cast to unknown, then to PopularProduct[]
  const typedPopularProducts = popular_products as unknown as PopularProduct[];

  const formattedData = typedPopularProducts.map(item => ({
    id: item.products.id,
    product_name: item.products.product_name,
    price: item.products.price,
    image: item.products.image,
    date_added: item.products.date_added
  }));

  return NextResponse.json({ data: formattedData });
}