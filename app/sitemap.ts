// app/sitemap.ts
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://Modern Furniture Pacific.shop/',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://Modern Furniture Pacific.shop/about',
      lastModified: new Date(),
      priority: 0.8,
    },
    // Add other URLs similarly
  ]
}