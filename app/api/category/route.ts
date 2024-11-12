import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const category = (searchParams.get("category") || "").toLowerCase();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, product_name, price, image, category, date_added")
    .ilike("category", category) // Using ilike for case-insensitive comparison
    .ilike('product_name', `%${search}%`);

  return NextResponse.json({ data: products, error });
}