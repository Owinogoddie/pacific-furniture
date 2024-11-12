// src/app/api/orders/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('orders')
      .insert(body)
      .select()
      
    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error processing order' },
      { status: 500 }
    )
  }
}