// types/product.ts
export interface Product {
    id: string;
    product_name: string;
    price: number;
    image: string;
    date_added: string;
  }
  
  export type PageType = 'new-arrivals' | 'popular-this-week' | 'best-sellers';
  
  export const PAGE_TYPES: Record<PageType, {
    title: string;
    apiEndpoint: string;
  }> = {
    'new-arrivals': {
      title: 'New arrivals',
      apiEndpoint: '/api/products?search='
    },
    'popular-this-week': {
      title: 'Popular this week',
      apiEndpoint: '/api/popular'
    },
    'best-sellers': {
      title: 'Best sellers',
      apiEndpoint: '/api/best_sellers'
    }
  };