// app/api/category/route.ts
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { data: products, error } = await supabase
    .from("products")
    .select("id, product_name, price, image, category, date_added")
    .eq("category", category)
    .ilike("product_name", `%${search}%`);

    console.log(products)

  return NextResponse.json({ data: products, error });
}