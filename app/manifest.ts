import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Modern Furniture Pacific',
    short_name: 'Modern Furniture Pacific',
    description: 'Modern Furniture Pacific',
    start_url: '/',
    display: 'standalone',
    theme_color: '#22202e',
    background_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}