import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";

  const { data: products, error } = await supabase
    .from("products")
    .select("id, product_name, image, price, date_added")
    .ilike('product_name', `%${search}%`);

  return NextResponse.json({ data: products, error });
}