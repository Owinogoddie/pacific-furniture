import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("best_sellers")
    .select("*");

  return NextResponse.json({ data, error });
}