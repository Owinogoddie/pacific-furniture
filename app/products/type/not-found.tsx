// app/products/[type]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Page Not Found</h1>
      <p>Could not find the requested product page.</p>
      <Link href="/products/new-arrivals">
        Return to New Arrivals
      </Link>
    </div>
  );
}