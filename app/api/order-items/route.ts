import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: orders_items, error } = await supabase
      .from("orders_items")
      .insert(body);

    if (error) throw error;
    
    return NextResponse.json({ data: orders_items });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error inserting order items", details: error.message },
      { status: 500 }
    );
  }
}