import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: orders, error } = await supabase
      .from("orders")
      .insert(body);

    if (error) throw error;
    
    return NextResponse.json({ data: orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error inserting orders", details: error.message },
      { status: 500 }
    );
  }
}