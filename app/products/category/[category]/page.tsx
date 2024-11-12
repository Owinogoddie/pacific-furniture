// app/products/[category]/page.tsx

import Products from '@/components/Products'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Define valid categories to type check and validate
const validCategories = ['ceramics', 'chairs','tables','pots','lamps','crockery'] as const
type Category = typeof validCategories[number]

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  // Capitalize first letter for title
  const title = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  
  return {
    title: `${title} | Modern Furniture Pacific`,
  }
}

// Optional: Generate static params for static generation
export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }))
}

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  // Validate category
  if (!validCategories.includes(params.category as Category)) {
    notFound()
  }

  const apiEndpoint = `/api/category?category=${params.category}&search=*`

  return (
    <Products 
      pageHeader={params.category.charAt(0).toUpperCase() + params.category.slice(1)} 
      apiEndpoint={apiEndpoint} 
    />
  )
}