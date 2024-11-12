import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { CartProvider } from '@/context/CartContext'
import { SearchProvider } from '@/context/SearchContext'
import './globals.css'
import { register } from './service-worker';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  manifest: '/manifest.json',
  title: 'Modern Furniture Pacific',
  description: 'Modern Furniture Pacific',
  themeColor: '#22202e',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    images: ['https://i1.sndcdn.com/avatars-dtgHaUZPb1l7U5RX-ly3X3w-t500x500.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (typeof window !== 'undefined') {
    register();
  }
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <CartProvider>
            <Header />
            {children}
            <SpeedInsights />
            <Analytics />
            <Footer />
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  )
}