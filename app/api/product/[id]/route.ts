import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);
console.log(error)
  return NextResponse.json({ data: products });
}